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
              p(SOURCE, context.event.amount, srcColor, "TaxAmount:");
              return context.event.amount;
            },
            TotalRemainingAmount: (context, event) => {
              p(SOURCE, context.event.amount, srcColor - 10, "TotalRemainingAmount received:");
              return context.event.amount;
            },
          })
        },
        SELECT_CATEGORY: {
          actions: assign({
            selectedCategories: (context, event) => {
              const categoryName = context.event.category;
              if (!context.context.selectedCategories.includes(categoryName)) {
                return [...context.context.selectedCategories, categoryName];
              }
              p(SOURCE, context.context.selectedCategories, srcColor, "SELECT_CATEGORY: selectedCategories")
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
                    const calculatedAmount = (enteredPercentage / 100) * context.context.TAX_AMOUNT;
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
              p(SOURCE, context.event, srcColor, "event")
              const categoryName = context.event.category;
              // Filter out the deselected category from selectedCategories array
              return context.context.selectedCategories.filter(cat => cat !== categoryName);
            },
            categories: (context, event) => {
              const categoryName = context.event.category;
              // Map through categories to update the selected property and other attributes
              const updatedCategories = context.context.categories.map(category => {
                const [key, value] = Object.entries(category)[0];
                if (key === categoryName) {
                  // Deselect the category and reset the amountDisplayed
                  return {
                    ...category,
                    [key]: {
                      ...value,
                      selected: false,
                      amountDisplayed: 0, // Reset amountDisplayed to zero or another appropriate value
                    }
                  };
                }
                return category;
              });

              // Calculate the total number of remaining selected categories
              const remainingSelectedCategories = updatedCategories.filter(
                category => Object.values(category)[0].selected
              );

              const enabledCategoriesCount = remainingSelectedCategories.length;
              const totalPercentageCategories = remainingSelectedCategories.reduce(
                (acc, category) => {
                  const categoryObject = Object.values(category)[0];
                  return categoryObject.mode === "percentage"
                    ? acc + categoryObject.amountEntered.amount
                    : acc;
                },
                0
              );

              // Calculate and update amounts for the remaining selected categories
              const recalculatedCategories = updatedCategories.map(category => {
                const categoryObject = Object.values(category)[0];
                if (categoryObject.selected) {
                  let newAmountDisplayed = 0;
                  if (categoryObject.mode === "percentage") {
                    // Calculate amount based on remaining percentage and total remaining amount
                    const remainingPercentage = 100 - totalPercentageCategories;
                    newAmountDisplayed = (categoryObject.amountEntered.amount / remainingPercentage) * context.TotalRemainingAmount;
                  } else {
                    // Calculate amount based on remaining total remaining amount and enabled categories count
                    newAmountDisplayed = context.TotalRemainingAmount / enabledCategoriesCount;
                  }
                  return {
                    ...category,
                    [Object.keys(category)[0]]: {
                      ...categoryObject,
                      amountDisplayed: newAmountDisplayed,
                    },
                  };
                }
                return category;
              });

              return recalculatedCategories;
            },
          }),
        },
        CHANGE_MODE: {
          actions: assign({
            categories: (context, event) => {
              // Ensure that categories and selectedCategories are accessed correctly.
              const categories = context.context.categories;
              const selectedCategories = context.context.selectedCategories;  // This should be an array of strings.

              return categories.map(category => {
                const categoryName = Object.keys(category)[0];
                if (categoryName === context.event.categoryName) {
                  let updatedCategory = { ...category[categoryName] };
                  updatedCategory.mode = context.event.newMode;

                  // Use selectedCategories.length to divide TAX_AMOUNT.
                  if (context.event.newMode === "dollar") {
                    p(SOURCE, selectedCategories, srcColor, "selectedCategories.length");
                    updatedCategory.amountDisplayed = updatedCategory.amountEntered.amount || context.context.TAX_AMOUNT / selectedCategories.length;
                  } else if (context.event.newMode === "percentage") {
                    const amount = updatedCategory.amountEntered.amount || context.context.TAX_AMOUNT / selectedCategories.length;
                    updatedCategory.amountDisplayed = (amount / context.context.TAX_AMOUNT) * 100;
                  }

                  return { [categoryName]: updatedCategory };
                }
                return category;
              })
            },
          }),
        },
        UPDATE_AMOUNT_ENTERED: {
          actions: assign({
            categories: (context, event) => {
              const { categoryName, amount } = context.event;
              
              return context.context.categories.map(category => {
                  const currentCategoryName = Object.keys(category)[0];
                  
                  if (currentCategoryName === categoryName) {
                      // Create a copy of the current category
                      let updatedCategory = { ...category };
                      // Access the category details object
                      let categoryDetails = updatedCategory[currentCategoryName];
                      
                      // Update `amountEntered`
                      categoryDetails.amountEntered.specified = true;
                      categoryDetails.amountEntered.amount = parseFloat(amount);
                      
                      // Calculate `amountDisplayed` based on the mode
                      if (categoryDetails.mode === 'dollar') {
                          // Update `amountDisplayed` directly
                          categoryDetails.amountDisplayed = parseFloat(amount);
                      } else if (categoryDetails.mode === 'percent') {
                          // Calculate the dollar value based on percentage and `TotalRemainingAmount`
                          if (context.context.TotalRemainingAmount > 0) {
                              categoryDetails.amountDisplayed = (parseFloat(amount) / 100) * context.context.TotalRemainingAmount;
                              // Optional: Control the precision of the calculated `amountDisplayed`
                              categoryDetails.amountDisplayed = parseFloat(categoryDetails.amountDisplayed.toFixed(2));
                          } else {
                              // Handle edge case where `TotalRemainingAmount` is zero or invalid
                              p(SOURCE, "TotalRemainingAmount is zero or invalid", srcColor, "Error");
                          }
                      }
                      
                      // Debug logging
                      p(SOURCE, updatedCategory, srcColor, `updated ${categoryName}'s amountEntered`);
                      
                      // Return the updated category
                      return updatedCategory;
                  }
                  
                  // Return the unmodified category
                  return category;
              });
          }
          
            ,
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