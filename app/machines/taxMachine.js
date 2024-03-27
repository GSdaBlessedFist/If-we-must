import { createMachine, assign } from "xstate";
//import categoryObjects from ""  explicity entereed for testing line 13



const taxMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcCGAPA+gW1QYwAsBLAOzADoB3VI5UqTAMwHsAnTNLVbZgVxOQBiAMoBRACqZxAQQAamaQFkA8gFUAcuIDaABgC6iUAAdmsWkWYlDIdIgBMAFgDs5ABw6ndjwFYAnL4BmTx1XABoQAE9EAFpXAPIANicHAEZvFIdUnR001wBfPPDOHHxiMnJYMAAbMDw6EgY8VGQwKDYiOBFRABlRAGFJPulxUQBxZQAlAE1dAyQQEzM6S2tbBCd432CEgLs7BJTfEIdwqIQ7XbdXbwSdbwCdX1uAgISCoowSwlIKSpq6+iYJotNqsDqwQQAEVEYl6A0wQxG42ms2si3MK3maxeOnIdlcKRSFwcAVcrgcZO8p3s+zxKVeOwONwpric7xAxVw33Kf1q9UazVa7U6fQAEtJ1KNRJgVNDUfN0csrFjEE4Ui4KXd8b47E47k9qQgiQ5Eg4LgkLr5vE5PIT2ZzSj8KtU+YDgUKwZ1VAAFSHDaVKNSaTCiTSiCaiSHy4ymDHK0BrW64uyBQk6pwWlIJE6RGJxRLJNJW5KuXy5e2fLllX4ugENIGC0HgwRDbp9VTdf1SZQybqYCOKaQASXUI9GChUGm0+jRsaVq0QDnS5BS5N8JK2atZOgShp23jxFMy6p3AXX3grWCrTqaVTwvCqzUB3D4Ai6knEPekfYHw9HkonINpzmGMlgseMbEQdxXHIbxsm8Ow4KzBJ90NXYUkSMsdACbxXAtK11QKQoQBIZgIDgawHW5MBZzAzEExiZxYOSJcNwzEtyUNaJDlxLNAnXK1rhTNJLy+asqBofkmDYDhPhffhkFouMFwQXEzW8bwl1uC5EMJG4uJSHQ7ESBJAjiAkbicI58mIqjxN5OsBRBYV4AVOdwJUxCTQzPZfHce5MiCJxDQpcgKTLM9HAePDklE69ylve9Hyk+SBCU+cVQQI48VMjSgieF4ApC7MCwcbMjk1ZxriIvIgA */
  id: "tax_machine",
  initial: "waiting_for_tax_amount",
  context: {
    TAX_AMOUNT: 0,
    TotalRemainingAmount: 0,
    categories: "categoryObjects",
    selectedCategories: [],
  },
  states: {
    waiting_for_tax_amount: {
      on: {
        SET_TAX_AMOUNT: {
          target: "selecting_categories",
          actions: assign({
            TAX_AMOUNT: (_, event) =>
              parseFloat(event.amount.trim().replace(/^0+/, "")),
            TotalRemainingAmount: (_, event) =>
              parseFloat(event.amount.trim().replace(/^0+/, "")),
          }),
        },
      },
    },
    selecting_categories: {
      on: {
        SELECT_CATEGORY: {
          actions: [
            assign({
              selectedCategories: (context, event) => {
                const categoryName = event.category;
                const updatedCategories = context.categories.map((category) => {
                  if (Object.keys(category)[0] === categoryName) {
                    return { ...category, selected: true };
                  }
                  return category;
                });
                return updatedCategories;
              },
            }),
            assign({
              categories: (context) => {
                const enabledCategories = context.selectedCategories.filter(
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

                const updatedCategories = context.categories.map((category) => {
                  if (category[Object.keys(category)[0]].selected) {
                    const categoryObject =
                      category[Object.keys(category)[0]];
                    let categoryAmount = 0;
                    if (categoryObject.mode === "percentage") {
                      const remainingPercentage =
                        100 -
                        totalPercentageCategories * (100 / enabledCategoriesCount);
                      categoryAmount =
                        (remainingPercentage / 100) *
                        context.TotalRemainingAmount;
                    } else {
                      categoryAmount =
                        context.TotalRemainingAmount / enabledCategoriesCount;
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
          ],
        },
        DESELECT_CATEGORY: {
          actions: [
            assign({
              selectedCategories: (context, event) => {
                const categoryName = event.category;
                const updatedCategories = context.categories.map((category) => {
                  if (Object.keys(category)[0] === categoryName) {
                    return { ...category, selected: false };
                  }
                  return category;
                });
                return updatedCategories;
              },
            }),
            assign({
              categories: (context) => {
                const enabledCategories = context.selectedCategories.filter(
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

                const updatedCategories = context.categories.map((category) => {
                  if (category[Object.keys(category)[0]].selected) {
                    const categoryObject =
                      category[Object.keys(category)[0]];
                    let categoryAmount = 0;
                    if (categoryObject.mode === "percentage") {
                      const remainingPercentage = 100 - totalPercentageCategories * (100 / enabledCategoriesCount);
                      categoryAmount = (remainingPercentage / 100) * context.TotalRemainingAmount;
                    } else {
                      categoryAmount =context.TotalRemainingAmount / enabledCategoriesCount;
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
          ],
        },
        CHANGE_MODE: {
          actions: assign({
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
                    // Convert the entered dollar amount to a percentage of the total tax amount
                    updatedCategory[event.categoryName].amountDisplayed = (parseFloat(event.amount) / context.TAX_AMOUNT) * 100;
                  }
        
                  return updatedCategory;
                }
                return category;
              });
            }
          }),
        },
        CALCULATE_TOTAL_REMAINING_AMOUNT: "calculating_amount",
      },
    },
    calculating_amount: {
      on: {
        SET_TOTAL_REMAINING_AMOUNT: "selecting_categories",
      },
    },
  },
});

export default taxMachine;