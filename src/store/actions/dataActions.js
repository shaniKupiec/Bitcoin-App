import dynamicService from "../../services/dynamicAPICalls.service";

export function loadDynamicRate(coin, days) {
  return async (dispatch) => {
    try {
      const data = await dynamicService.dynamicRate(coin, days);
      const key = coin + "-" + days;
      dispatch({ type: "SET_DYNAMIC_DATA", data, key });
    } catch (err) {
      console.log("err:", err);
    }
  };
}










// import cryptoService from "../../services/crypto.service"
// export function loadBitcoinRate() {
//   return async (dispatch) => {
//     try {
//       const data = await cryptoService.getRate()
//       dispatch({ type: 'SET_BITCOIN_RATE', data })
//     } catch (err) {
//       console.log('err:', err)
//     }
//   }
// }

// export function loadMarketPrice() {
//   return async (dispatch) => {
//     try {
//       const data = await cryptoService.getMarketPrice()
//       dispatch({ type: 'SET_MARKET_PRICE', data })
//     } catch (err) {
//       console.log('err:', err)
//     }
//   }
// }

// export function loadConfirmedTransactions() {
//   return async (dispatch) => {
//     try {
//       const data = await cryptoService.getConfirmedTransactions()
//       dispatch({ type: 'SET_CONFIRMED', data })
//     } catch (err) {
//       console.log('err:', err)
//     }
//   }
// }
