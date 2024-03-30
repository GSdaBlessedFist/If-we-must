import { createMachine, assign } from "xstate";
import { categoryObjects } from "../categoryObjects";
import p from "../util/consoleHelper";

const SOURCE = "taxMachine";
const srcColor = 155;
const taxMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcCGAPA+gW1QYwAsBLAOzADoB3VI5UqTAMwHsAnTNLVbZgVxOQBiAMoBRACqZxAQQAamaQFkA8gFUAcuIDaABgC6iUAAdmsWkWYlDIdIgBMANgCc5AIwBWB3feuALK6cAZgAOOx1fABoQAE9EXwB2X3JPYODXVwdfMId3OwBfPKjOHHxiMnJYMAAbMDw6EgY8VGQwKDYiOBEJKTkFFQ1tfWsTMzpLa1sEB2CknTmdO0DXJa9EqNiEH2DyO1dg+LtgnXdPHUCCoowSwlIKSpq6+kwmlrbWDtgugBlRAGFJX7ScSiADiygASgBNXQGJAgEbmcZwybTHTkeKBXyBIKhQLxJxOVzrRDY9zkNJ2XxpdyBOwHByYi4gYq4G7le61eqNZqtdqdAAiojEP3+mEBwLBUJhw1MiKsyMQDniaMSdjCc2WwUCx2JCDpgXIvh0XkC7jmThmTkyTJZpVuFWqnKeL15706vwAEtJ1CDRJgVILpXCEWN5aAUU4yXN4viaXYnP54g5da4Y4aaeknAdcTMbVdWWU7o7Hg1njy3h9BKoAAr8oF+pRqTSYUSaUTg0T8oPGWWhiaKqnkBw6HE5QLapx03VpZLzcK+XwOVb5QrM-N29nFrll158z6Ar6-VRfetSZQyL6YDuKaQASXU95BfSbg1hPdGFjDNnszjcnm8fgBCEYSRDEiDuMqyS7JOziLEqOR5lgBb2k0VR4LwVTNE83B8AIXSSOI57SJe153g+PrPgM3bwr2n79nqv4eF4Pj+DiIG6l4rjkAseyJPEwQJkc7gFKuJDMBAcDWLabJgDKH5IuGiAALTJmBCAqYh1yFlQNDbiw7DFDh-DIHJcr0Vkuq+Fm6KRuOWRGlZlKachm4PNuLoVpJwa0Qp35TPi6K8e4WKOGarh2BxARuPEexYuOBx+Ocq7SdpqHoZh25GQIpl9gq-k2dMsE6MEDjhQykUGliwRmgmxy5E4Il5EAA */
  id: "tax_machine",
  initial: "waiting_for_tax_amount",
  context: {
    TAX_AMOUNT: 0,
    TotalRemainingAmount: 0,
    categories: categoryObjects,
    selectedCategories: [],
  },
  states: {
    waiting_for_tax_amount: {
      on: {
        SET_TAX_AMOUNT: {
          target: "selecting_categories",
          actions: ['SET_TAX_AMOUNT.updateTAXandTotalRemainingAmount:']
        },
      },
    },
    selecting_categories: {
      on: {
        SET_TAX_AMOUNT: {
          target: "selecting_categories",
          actions: ['SET_TAX_AMOUNT.updateTAXandTotalRemainingAmount']
        },
        SELECT_CATEGORY: {
          actions: ['SELECT_CATEGORY.updateSelectedCategories','SELECT_CATEGORY.updateCategories'],
        },
        DESELECT_CATEGORY: {
          actions: ['DESELECT_CATEGORY.updateSelectedCategories','DESELECT_CATEGORY.updateCategories']
        },
        CHANGE_MODE: {
          actions: ['CHANGE_MODE.updateCategories']
        },
        UPDATE_AMOUNT_ENTERED: {
          actions: ['UPDATE_AMOUNT_ENTERED.updateCategories']
        },
        CALCULATE_TOTAL_REMAINING_AMOUNT: "calculating_amount",
      },
    },
    calculating_amount: {
      on: {
        SET_TOTAL_REMAINING_AMOUNT: "selecting_categories",
      },
    },
  },{
  actions: {
    'SET_TAX_AMOUNT.updateTAXandTotalRemainingAmount':assign({
      TAX_AMOUNT: (context, event) => {
        //✅p(SOURCE,context.event.amount,srcColor,"TaxAmount:");
        return context.event.amount;
      },
      TotalRemainingAmount: (context, event) => {
        //✅p(SOURCE, context.event.amount,srcColor - 10,"TotalRemainingAmount received:");
        return context.event.amount;
      },
    }),
    'SELECT_CATEGORY.updateSelectedCategories': assign({
      selectedCategories: (context, event) => {
        const categoryName = context.event.category; 
        if (!context.context.selectedCategories.includes(categoryName)) {
          return [...context.context.selectedCategories, categoryName];
        }
        return context.selectedCategories;
      },
    }),
    'SELECT_CATEGORY.updateCategories': assign({
      categories: (context) => {
        const selectedCategories = context.context.categories.filter(category => {
          const catObj = Object.values(category)[0];
          return catObj.selected;
        });

        // Calculate the total entered percentage and ensure it does not exceed 100%
        const totalEnteredPercentage = selectedCategories.reduce((total, category) => {
          const catObj = Object.values(category)[0];
          if (catObj.mode === "percentage") {
            // Using amountEntered as the percentage value
            const enteredPercentage = catObj.amountEntered.amount || 0;
            return total + enteredPercentage;
          }
          return total;
        }, 0);

        if (totalEnteredPercentage > 100) {
          // Handle error: Total percentage exceeds 100%
          console.error("Total percentage exceeds 100%");
          return; // Skip updating categories or handle as needed
        }

        const updatedCategories = context.context.categories.map(category => {
          const key = Object.keys(category)[0];
          const catObj = category[key];

          // Skip unselected categories
          if (!catObj.selected) return category;

          let categoryAmount = catObj.amountDisplayed; // Default to existing amountDisplayed

          if (catObj.mode === "percentage") {
            // Calculate the amount based on the percentage of TotalRemainingAmount
            const percentage = catObj.amountEntered.amount || 0;
            categoryAmount = (percentage / 100) * context.TotalRemainingAmount;
          } else if (catObj.mode === "dollar") {
            categoryAmount = catObj.amountEntered.amount
          }

          // Update the category with the calculated amountDisplayed
          return {
            ...category,
            [key]: {
              ...catObj,
              amountDisplayed: categoryAmount,
            },
          };
        });


        //p(SOURCE, totalEnteredPercentage, srcColor, "totalEnteredPercentage")
        p(SOURCE, updatedCategories, srcColor, "updatedCategories: SELECT")
        p(SOURCE, selectedCategories, srcColor, "selectedCategories: SELECT")
        return updatedCategories;
      },
    }),
    'DESELECT_CATEGORY.updateSelectedCategories': assign({
      selectedCategories: (context, event) => {
        const categoryName = context.event.category; // Use event.category
        return context.context.selectedCategories.filter(cat => cat !== categoryName);
      },
    }),
    'DESELECT_CATEGORY.updateCategories':assign({
      categories: (context) => {
        const enabledCategories = context.context.selectedCategories.filter(
          (category) => category.selected
        );
        const enabledCategoriesCount = enabledCategories.length;
        const totalPercentageCategories = enabledCategories.reduce(
          (acc, category) => {
            const categoryObject = category[Object.keys(category)[0]];
            return categoryObject.mode === "percentage"
              ? acc + 1
              : acc;
          },
          0
        );

        const updatedCategories = context.context.categories.map((category) => {
          if (category[Object.keys(category)[0]].selected) {
            const categoryObject =
              category[Object.keys(category)[0]];
            let categoryAmount = 0;
            if (categoryObject.mode === "percentage") {
              const remainingPercentage = 100 - totalPercentageCategories * (100 / enabledCategoriesCount);
              categoryAmount = (remainingPercentage / 100) * context.TotalRemainingAmount;
            } else {
              categoryAmount = context.TotalRemainingAmount / enabledCategoriesCount;
            }
            return {
              ...category,
              [Object.keys(category)[0]]: {
                ...categoryObject,
                amountDisplayed: categoryAmount,
              },
            };
          }
          return category;
        });
        return updatedCategories;
      },
    }),
    'CHANGE_MODE.updateCategories': assign({
      categories: (context, event) => {
        return context.categories.map(category => {
          if (Object.keys(category)[0] === event.categoryName) {
            let updatedCategory = { ...category };
            updatedCategory[event.categoryName].mode = event.newMode;

            if (event.newMode === "dollar") {
              // Assuming switching to dollar should use the last known dollar amount or split equally if not available
              updatedCategory[event.categoryName].amountDisplayed = updatedCategory[event.categoryName].amountEntered.amount || context.TAX_AMOUNT / context.selectedCategories.length;
            } else if (event.newMode === "percentage") {
              // When switching to percentage, calculate based on the proportion of TAX_AMOUNT
              const amount = updatedCategory[event.categoryName].amountEntered.amount || context.TAX_AMOUNT / context.selectedCategories.length;
              updatedCategory[event.categoryName].amountDisplayed = (amount / context.TAX_AMOUNT) * 100;
            }

            return updatedCategory;
          }
          return category;
        });
      }
    }),
    'UPDATE_AMOUNT_ENTERED.updateCategories': assign({
      categories: (context, event) => {
        return context.categories.map(category => {
          if (Object.keys(category)[0] === event.categoryName) {
            let updatedCategory = { ...category };
            updatedCategory[event.categoryName].amountEntered.amount = parseFloat(event.amount);

            if (updatedCategory[event.categoryName].mode === 'dollar') {
              updatedCategory[event.categoryName].amountDisplayed = parseFloat(event.amount);
            } else {
              // Convert the entered dollar amount to a percentage of the total tax amount
              updatedCategory[event.categoryName].amountDisplayed = (parseFloat(event.amount) / context.TAX_AMOUNT) * 100;
            }

            return updatedCategory;
          }
          return category;
        });
      }
    })
  }
}
);

export default taxMachine;