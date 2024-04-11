import { createMachine, assign } from "xstate";
import { categoryObjects } from "../categoryObjects";
import p from "../util/consoleHelper";

const SOURCE = "taxMachine";
const srcColor = 155;
const taxMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcCGAPA+gW1QYwAsBLAOzADoB3VI5UqTAMwHsAnTNLVbZgVxOQBiAMoBRACqZxAQQAamaQFkA8gFUAcuIDaABgC6iUAAdmsWkWYlDIdIgDMARjvkHAVgBsAJjsAWAOw+Dp4OOgCcPgA0IACeiK5+fuQ+7gAcfq4AvhlRnDj4xGTksGAANmB4dCQMeKjIYFBsRHAiElJyCioa2vrWJmZ0lta2CH5hLh7e-oHBYVGxCD6hoeTBaZnZILm4hKQUxWUV9Jg1dQ2sTbAtADKiAMKSt9LiogDiygBKAJq6BkggfeZBn9hn47M47KEdO4wgEgiFQnN7H53OQUkF1jkMHkdoV9uVKtVavVGs0ACKiMQ3e6YR7PN5fH69UyAqzAxB+TyuJI+VyeUIc6bwxEITk+JJQzlZTFYbYFPalfFHE7E87NW4ACWk6heokwKnJjL+AIGrNAIPcy1cjkmsJmCJiiDcKSSVvRUs2WNluyKCsOVWORLOF0EqgACqSnrqlGpNJhRJpRO9RKTDcZmSahuy7J5yKFUqCpnDZg6EF5yBiPTL8t68X7CacSZdHldbqorpGpMoZFdMEnFNIAJLqIcvDox7q-NP9CymmyITyJNxeXy2+F2FLClJczyedwTCtbauFGolPC8Eq1I7cPgCFqScRd6Q9vuD4fasddVP-dMzzMIOx7uQ0KhHYrj8oKYSRCWPieDoST5usGwkMwEBwNYh44mATLTkCZqIAAtLBqI+HYyK8q4aQpJCXjCoRB6ekeFDUOY-osOwuTXvwyDYSyf4pO4wrQs6yRrO6GFyj6BwEgGDaqvARo-rhc4ICkOhihCUIwhB9rzO4bjkH4DiiRs4neieZ4XtJnECDxGZsv+izkGCYF8mkmmuP4wo7mKebGVkQA */
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
          actions: assign({
            TAX_AMOUNT: (context, event) => {
              p(SOURCE, context.event.amount, srcColor, "TaxAmount:");
              return context.event.amount;
            },
            TotalRemainingAmount: (context, event) => {
              p(SOURCE, context.event.amount, srcColor - 10, "TotalRemainingAmount received:");
              return context.event.amount;
            },
          })
        }
      },
    },
    selecting_categories: {
      on: {
        SET_TAX_AMOUNT: {
          target: "selecting_categories",
          actions: assign({
            TAX_AMOUNT: (context, event) => {
              p(SOURCE, event.amount, srcColor, "TaxAmount:");
              return event.amount;
            },
            TotalRemainingAmount: (context, event) => {
              p(SOURCE, event.amount, srcColor - 10, "TotalRemainingAmount received:");
              return event.amount;
            },
          })
        },
        SELECT_CATEGORY: {
          actions: assign({
            selectedCategories: (context, event) => {
              const categoryName = context.event.category;
              if (!context.context.selectedCategories.includes(categoryName)) {
                return [...context.context.selectedCategories,context.context.selectedCategories, categoryName];
              }
              console.log("HERE")
              p(SOURCE,context.context.selectedCategories,srcColor,"SELECT_CATEGORY: selectedCategories")
              return context.context.selectedCategories;
            },
            categories: (context, event) => {
              // Map through categories to update the selected category and its amount based on the mode (percentage or dollar)
              const updatedCategories = context.context.categories.map(category => {
                const [key, value] = Object.entries(category)[0];
        
                if (key === context.event.category) {
                  // Update the selected property and calculate the amount based on the mode
                  let updatedCategory = {
                    ...category,
                    [key]: {
                      ...value,
                      selected: true,
                    }
                  };
        
                  if (value.mode === "percentage") {
                    // Calculate the amount based on the entered percentage
                    const enteredPercentage = value.amountEntered.amount || 0;
                    const calculatedAmount = (enteredPercentage / 100) * context.TAX_AMOUNT;
                    updatedCategory[key] = {
                      ...value,
                      amountDisplayed: calculatedAmount,
                      selected: true,
                    };
                  } else if (value.mode === "dollar") {
                    // Use the entered dollar amount
                    updatedCategory[key] = {
                      ...value,
                      amountDisplayed: value.amountEntered.amount,
                      selected: true,
                    };
                  }
        
                  return updatedCategory;
                }
        
                return category;
              });
        
              // Validate the total percentage if necessary
              const totalEnteredPercentage = updatedCategories.reduce((total, category) => {
                const [key, value] = Object.entries(category)[0];
                if (value.mode === "percentage") {
                  return total + (value.amountEntered.amount || 0);
                }
                return total;
              }, 0);
        
              if (totalEnteredPercentage > 100) {
                console.error("Total percentage exceeds 100%");
                // Handle the error case where total percentage exceeds 100%
                return context.categories; // Return the original categories context
              }
        
              return updatedCategories;
            },
          }),
        },
        DESELECT_CATEGORY: {
          actions: assign({
            selectedCategories: (context, event) => {
              const categoryName = context.event.category;
              p(SOURCE,categoryName,srcColor,"DESELECT_CATEGORY: category removed")
              p(SOURCE,context.selecting_categories,srcColor+5,"DESELECT_CATEGORY: selectedCategories")
              return context.context.selectedCategories.filter(cat => cat !== categoryName);
            },
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
                  const categoryObject = category[Object.keys(category)[0]];
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
            }
          }),
        },
        CHANGE_MODE: {
          actions: assign({
            categories: (context, event) => {
              return context.categories.map(category => {
                if (Object.keys(category)[0] === event.categoryName) {
                  let updatedCategory = { ...category };
                  updatedCategory[event.categoryName].mode = event.newMode;

                  if (event.newMode === "dollar") {
                    updatedCategory[event.categoryName].amountDisplayed = updatedCategory[event.categoryName].amountEntered.amount || context.TAX_AMOUNT / context.selectedCategories.length;
                  } else if (event.newMode === "percentage") {
                    const amount = updatedCategory[event.categoryName].amountEntered.amount || context.TAX_AMOUNT / context.selectedCategories.length;
                    updatedCategory[event.categoryName].amountDisplayed = (amount / context.TAX_AMOUNT) * 100;
                  }

                  return updatedCategory;
                }
                return category;
              })
            },
          }),
        },
        UPDATE_AMOUNT_ENTERED: {
          actions: assign({
            categories: (context, event) => {
              return context.categories.map(category => {
                if (Object.keys(category)[0] === event.categoryName) {
                  let updatedCategory = { ...category };
                  updatedCategory[event.categoryName].amountEntered.amount = parseFloat(event.amount);

                  if (updatedCategory[event.categoryName].mode === 'dollar') {
                    updatedCategory[event.categoryName].amountDisplayed = parseFloat(event.amount);
                  } else {
                    updatedCategory[event.categoryName].amountDisplayed = (parseFloat(event.amount) / context.TAX_AMOUNT) * 100;
                  }

                  return updatedCategory;
                }
                return category;
              });
            },
          }),
        },
        CALCULATE_TOTAL_REMAINING_AMOUNT: {
          target: "calculating_amount"
        },
      },
    },
    calculating_amount: {
      on: {
        SET_TOTAL_REMAINING_AMOUNT: {}
      }
    }
  }
});

export default taxMachine;