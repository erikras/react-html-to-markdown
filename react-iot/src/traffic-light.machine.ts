import { setup } from 'xstate'

export const trafficLightMachine = setup({}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBUBOBDAZpglgYwAIAZHKACwBcA6AJUgGIAPWC9CsKrd1ACgGYADEICU9NFlyES5anQgBtAQF1EoAA4B7WDgo4NAO1UhGiAIwAWAOxUAnHbsA2SwIAcAVgcAmS24A0IAE9EOyofISFzNxs3cztLAF94-3FsfGJSSioAcVQwMH0mFjYOLjBec3DRFMl0mWzc-MUVJBBNbV0DIxMEQXMqUwcHAUs+d0sbTyG-QLNnKiEbdwFR0z5LFwFPROSMVKkM6gBNMAAbE40Ad0LWdk5Mbh5TNxExXZrpTOOzy6ajNp09IYWt1zA5bJ5TO4XJCRl4bP4gggIWDPM8hKt1g5YjY+IkkiB9BoIHAjNU0h8KH8tADOsDEABaUzzdYWSGmSZrAR2cwIsxM+z2Vxc8Ko7YgMn7OpyKntQFdRBDXkIRZUNxiiW1TI5PJA9TUjq64yIbwuKh8QZYzaeGwCLGWJUq7EC512dVvckHKhfc4XGU0w3dSFuKguBx8cxWNymSymVzuJWeRNUbw4mzjGyDEYuLZ4oA */
  id: 'Traffic Light',

  states: {
    Red: {
      after: {
        '3000': 'Green',
      },
    },

    Green: {
      after: {
        '4000': 'Yellow',
      },
    },

    Yellow: {
      after: {
        '1500': 'Red',
      },
    },
  },

  initial: 'Red',
})
