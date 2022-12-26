const INITIAL_STATE = {
  bitcoinRate: [],
  marketPrice: [],
  confirmed: [],
};

export function dataReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_BITCOIN_RATE":
      return {
        ...state,
        bitcoinRate: action.data,
      };
    case "SET_MARKET_PRICE":
      return {
        ...state,
        marketPrice: action.data,
      };
    case "SET_CONFIRMED":
      return {
        ...state,
        confirmed: action.data,
      };


    default:
      return state;
  }
}
