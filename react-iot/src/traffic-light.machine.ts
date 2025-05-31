import { setup } from 'xstate'

export const trafficLightMachine = setup({}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBUBOBDAZpglgYwAIAZHKACwBcA6AJUgGIAPWC9CsKrd1ACgFYADEICU9NFlyES5anQgBtAQF1EoAA4B7WDgo4NAO1UhGiALQBGKuYCcAFgBsADgDM5oQCY+1gbfN8ANCAAnmbmzrZU4V4A7Oa2zvaefNEAvimB4tj4xKSUVADiqGBg+kwsbBxcYLzOQgKimZI5MgVFJYoqSCCa2roGRiYI5ubuVNb2ftG2Lu6x7i6BIQim0dFUjrYx8wkCybZpGRhZUrnUAJpgADaXGgDuZazsnJjcPG4iYkdN0nkX13cdIw9HR6QxdQYWaxUATODaecz2aLzWKOaKLUL2KheLz2Ww+azRayOHxpdIgfQaCBwIyNbI-ChArQg-rg0LONY2ByOQTc9wCex2dHLdzuTEbGJCBKbZzjA4gWknFpyRm9UEDMyOKGcpw8vh8gW2IUWZx8LHWCXRBIm6b7MkK5p5QrFMHqJl9F3GRDDRzrXauJzWAl48ZGuICSKbAlxBJJVJ2r5005UP43W4q5kewbvMYTPYzOaOcyhtbignbey7KaklJAA */
  id: 'Traffic Light',

  states: {
    Red: {
      after: {
        '5000': 'Green',
      },
    },

    Green: {
      after: {
        '3000': 'Yellow',
      },
    },

    Yellow: {
      after: {
        '1000': 'Red',
      },
    },
  },

  initial: 'Red',
})
