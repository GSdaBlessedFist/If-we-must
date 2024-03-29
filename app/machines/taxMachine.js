import { createMachine, assign } from "xstate";
import { categoryObjects } from "../categoryObjects";
import p from "../util/consoleHelper";

const SOURCE = "taxMachine";
const srcColor = 155;
const taxMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcCGAPA+gW1QYwAsBLAOzADoB3VI5UqTAMwHsAnTNLVbZgVxOQBiAMoBRACqZxAQQAamaQFkA8gFUAcuIDaABgC6iUAAdmsWkWYlDIdIgBMANgCc5AIwBWB3YAsrgBwAzK6+3oEANCAAnvYA7Hbk7n4xTn46rnY6Dn52MQC+uRGcOPjEZOSwYAA2YHh0JAx4qMhgUGxEcCISUnIKKhra+tYmZnSW1rYIWfE6MzreMTruTk7BARHRCEEO5HYByYHeOnEBAZn5hRjFhKQUFdW19JiNza2s7bCdADKiAMKSP9JxKIAOLKABKAE1dAYkCBhuYxrCJg4Yn5yDEAt5vHYPIs9hj1ohXE53ORAq4Yp5lu5TgEHN5ziAirhrmU7jU6g0mi02h0ACKiMTfP6YAFA0GQ6FDUwIqxIxAOLLo7F2XaBE5+PyEhCU8jY9w0xbqmK+RnMko3cpVDmPZ48t4dH4ACWk6mBokwKgFUth8NGctAyKcAXIM1RMVcKMNEe1AFp-Akcokgv5TliYnkCkzLizSrdrQ96k9ua93oJVAAFPmAj1KNSaTCiTSiMGiPk+4wy-3jBXebYOHROQ5BeYOdyUuOudJ61IRrHedyLDx+M05i1sguc4svXkfAGfH6qT41qTKGSfTCtxTSACS6jvwN69YGMM7IwsAZs9mcbk8PlTwTBOEUSIHSaLuL4g5+H2diBA4rirlguaWo0lR4LwlRNI83B8AInSSOIZ7SBeV63vebpPv0HZwl2H49ggjguB4Xi+OSITARsvgxKGviuJiUyeP47j5FmJDMBAcDWOarJgNK76IoGiCxg4k7LOQKRHGkWR+PBBqIVceZUDQW4sOwRQ4fwyBybK9HYtqdgkmSwQQe4DlOI4-j6chG73FudqlpJvq0QpX6TDE2wRpqaSLNiCwxNqviksSU7BBiAQaZGXnrhQqHoZhW4WQI1ndvKYXok4WQOHsMx+J4Oh2Alg56uOqQnO4FIOT4Im5EAA */
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
              //✅p(SOURCE,context.event.amount,srcColor,"TaxAmount:");
              return context.event.amount;
            },
            TotalRemainingAmount: (context, event) => {
              //✅p(SOURCE, context.event.amount,srcColor - 10,"TotalRemainingAmount received:");
              return context.event.amount;
            },
          }),
        },
      },
    },
    selecting_categories: {
      on: {
        SET_TAX_AMOUNT: {
          target: "selecting_categories",
          actions: assign({
            TAX_AMOUNT: (context, event) => {
              //✅p(SOURCE,context.event.amount,srcColor,"TaxAmount:");
              return context.event.amount;
            },
            TotalRemainingAmount: (context, event) => {
              //✅p(SOURCE, context.event.amount,srcColor - 10,"TotalRemainingAmount received:");
              return context.event.amount;
            },
          }),
        },
        SELECT_CATEGORY: {
          actions: [
            assign({
              categories: (context, event) => {
                const categoryName = context.event.category;

                const updatedCategories = context.context.categories.map(category => {
                  const key = Object.keys(category)[0];
                  if (key === categoryName) {
                    return {
                      ...category,
                      [key]: {
                        ...category[key],
                        selected: !category[key].selected,
                      }
                    };
                  }
                  return category;
                });

                return updatedCategories;
              }
            })
            ,
            assign({
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


                p(SOURCE, totalEnteredPercentage, srcColor, "totalEnteredPercentage")
                p(SOURCE, selectedCategories, srcColor, "selectedCategories")
                p(SOURCE, updatedCategories, srcColor, "updatedCategories")
                return updatedCategories;
              },
            }),
          ],
        },
        DESELECT_CATEGORY: {
          actions: [
            assign({
              selectedCategories: (context, event) => {
                const categoryName = context.event.category;
                const updatedCategories = context.context.categories.map((category) => {
                  const key = Object.keys(category)[0];
                  if (key === categoryName) {
                    return {
                      ...category,
                      [key]: {
                        ...category[key],
                        selected: !category[key].selected,
                      }
                    };
                  }
                  return category;
                }); // Added closing parenthesis here
                p(SOURCE, updatedCategories.filter(category => category[Object.keys(category)[0]].selected),srcColor, "selectedCategory")
                return updatedCategories;
              }, // Added closing parenthesis here
            }),
            assign({
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