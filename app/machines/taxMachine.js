import { createMachine, assign } from 'xstate';
const taxMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QBcCGAPAsqgxgCwEsA7MAOgIgBswBiAUQDkAVOgJQAImBBADXa8wB5AKrMA2gAYAuolAAHAPawCyAgqKyQ6RAE4A7KQAsAJj0TzEgBwA2HQEY9AZkcAaEAE9EAWkOlLhiWtLHR0AVgk7Y2dAgF8YtzQsXEISUlgwHGQFACcAZTBqTLUiGly6AGEmQQ4ygBkKpgBJQQZJGSQQRWVVdU1tBDs7a1IJUKHrIb1LM2dDN08ERwijcOtTa3CAx2M4hIxsfGIydMyc-MKekoAROjqG9jLK6rbNLpVivsRBnSNgoaHjAENnodPNEIY7L4dICImZppDIrsQIkDikyABXOQQVDIMAABUouDAeAUlAgYGyXAAtgp0URkDRhHirlwWA88RVGgAxRp0K78ISiJgvDpvS6fBCGPTDJaAnTbHQSPTK0EeL56XyWUL+Nb+IZakxxeIgIgKcnwDoo5JHV5Kd69Dr9HykOz2YyKxyWQHGSyWCRzNUILyOKWkKLSnSWRyQzaOJFWw6pCjUW3dD6O8GOPxWMw6CZ6UJ6b7WMFBuwSH6hayGGxWWwTaGWeP7a2pE5ZPIFDLi0V2nugfrGCTGPyhExRBxRQwBhaTkaWV3WPQ+sJmOzNpKJjFYnH4wk4Ymk8mUml05Cp+0aDOSoakKt2ZyhEI+walxwF0jvtaF0bOSGGDdUSOUgSAAd3YWA0Fxdg7AvftkQUORvGMJ9SHsKV7CVBdDELNxqAAM3PAZjGGZVpT1d1-BCPQ3AAIwUZAsipZDBjQyEQXLKYYxokBsgIKA8CIwFSOVIIIUowxqLcUCKGQPAviHNw8DAfjBPBSw3H6SIRPI8TI0k-RSy8FCfnQjisO4o0YiAA */
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
        },

        "new state 1": {}
    },
});
export default taxMachine;
