import { setup } from 'xstate'

export const trafficLightMachine = setup({
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBUBOBDAZpglgYwAIAZHKACwBcA6AJUgGIAPWC9CsKrd1ACgCYADEICU9NFlyES5anQgBtAQF1EoAA4B7WDgo4NAO1UhGiAIwAWABwAaEAE9EATkdUA7AFYAvp9vjs+YlJKKgBxVDAwfSYWNg4uMF5BETEMfykg6jCI-UUVJBBNbV0DIxMEPgA2CrdLRwEKvndbBwRTCtNvX1TJQJkqAE0wABshjQB3aNZ2TkxuHndkvx7pYMGR8dyjQp09Q3yygGZq9wPTRuazR2Oq83rG7x8QfQ0IOCMlgJWKLa0dkv3EABaUymKjmCqWDwXVodR4fdJ9OQ-Iq7UqIdzmKjOCoCRwHKH2JyWKheOHdT4ZULhSLIv57UBlPgeKiWdx4gktRzE0ldCQUvprUZjWnFenGMyuVxUASmdwNJqE1qOdzSm53UneIA */
  id: "Traffic Light",
  states: {
    Red: {
      after: {
        "2000": { target: "Green" }
      }
    },

    "Green": {
      after: {
        "2000": { target: "Yellow" }
      }
    },

    "Yellow": {
      after: {
        "500": { target: "Red" }
      }
    }
  },
  initial: "Red"
})