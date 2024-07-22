import { createMachine, assign } from 'xstate';
const taxMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QBcCGAPAsqgxgCwEsA7MAOgIgBswBiAUQDkAVOgJQAImBBADXa8wB5AKrMA2gAYAuolAAHAPawCyAgqKyQ6RAEYAbACZSAFh0B2YwGZDliWYCcBswBoQAT0QBaJxNI7jABwSOvaWAKwBAcZ6OgC+sa5oWLiEJKSwYDjICgBOAMpg1FlqRDR5dADCTIIc5QAylUwAkoIMkjJIIIrKquqa2ghGUfZh9g4B-nr2xsGuHgieOr5hS7YO0+NWAfGJGNj4xGQZWbkFRb2lACJ09Y3s5VU17ZrdKiX9iJbWpF+BAY4SYxmAzGYxhOZeJakFYSSwGMJhSwBMwIgJ6MI7EBJfapMgAVzkEFQyDAAAVKLgwHgFJQIGAclwALYKPFEZA0YSky5cFj3UmVJoAMSadEu-CEoiYz06rwuHwQliBfgsoLCEhsWz0EIQYICpAkEgR4UsZnRoW2mKICjp8E62JShxeSjefU6A08YL8apmBmCAUR6u1nnCZhMZgkI3s9kNET0ZjMmPtBzSFGoTp67zduiMIL0-vMEnhw0MQZBodNK2RBsBZoTCSxewdaWO2XyhUycplzs7oAG+lDegjphB3qWJfckIMetGBmshr01hRKMTjeT+MJxLJFJwVJpdIZzNZyHTLo0WYQOkipAs0bs4QMYwMU+1RZM6rz6qjehi1ni8SAA */
    id: 'taxMachine',
    initial: 'idle',
    context: {
        TAX_AMOUNT: 0,
        TotalRemainingAmount: 0,
        sectors: [],
        specifiedAmount: 0,
    },
    states: {
        idle: {
            on: {
                'ENTER TAX AMOUNT': {
                    actions: assign({
                        TAX_AMOUNT: (context, event) => parseFloat(context.event.value),
                        TotalRemainingAmount: (context, event) => parseFloat(context.event.value)
                    }),
                    target: "sectorSelection"
                },
            },
        },
        sectorSelection: {
            on: {
                'SECTOR SELECTION': {
                    actions: assign({
                        sectors: (context, event) => [...context.context.sectors, context.event.value]
                    }),
                    target: "updatePlaceholderAmount"
                },
                'DESELECT SECTOR': {
                    actions: assign({
                        sectors: (context, event) => context.context.sectors.filter((sector) => sector !== context.event.value)
                    }),
                    target: "updatePlaceholderAmount"
                },
            },
        },
        updatePlaceholderAmount: {
            on: {
                'UPDATE SPECIFIED AMOUNT': {
                    actions: assign({
                        specifiedAmount: (context, event) => context.event.value
                    })
                }
            }
        }
    },
});
export default taxMachine;
