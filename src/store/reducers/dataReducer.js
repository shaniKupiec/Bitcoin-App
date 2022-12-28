const INITIAL_STATE = {
  dynamicRates: {},
  // bitcoinRate: [],
  // marketPrice: [],
  // confirmed: [],
};

export function dataReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_DYNAMIC_DATA":
      console.log("action", action);
      const key = action.key;
      const data = action.data;
      return {
        ...state,
        dynamicRates: { ...state.dynamicRates, [key]: data },
      };

    default:
      return state;
  }
}



// case "SET_BITCOIN_RATE":
//     return {
//       ...state,
//       bitcoinRate: action.data,
//     };
// case "SET_MARKET_PRICE":
//   return {
//     ...state,
//     marketPrice: action.data,
//   };
// case "SET_CONFIRMED":
// return {
//   ...state,
//   confirmed: action.data,
// };
