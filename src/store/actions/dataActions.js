import bitcoinService from "../../services/bitcoin.service"

export function loadBitcoinRate() {
  return async (dispatch) => {
    try {
      const data = await bitcoinService.getRate()
      dispatch({ type: 'SET_BITCOIN_RATE', data })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function loadMarketPrice() {
  return async (dispatch) => {
    try {
      const data = await bitcoinService.getMarketPrice()
      dispatch({ type: 'SET_MARKET_PRICE', data })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function loadConfirmedTransactions() {
  return async (dispatch) => {
    try {
      const data = await bitcoinService.getConfirmedTransactions()
      dispatch({ type: 'SET_CONFIRMED', data })
    } catch (err) {
      console.log('err:', err)
    }
  }
}
