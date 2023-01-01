import axios from "axios";
import storageService from "./storage.service";

export default {
  getRate,
  getRates,
  getMarketPrice,
  getConfirmedTransactions,
};

const RATE_KEY = "bitcion-rate";
const RATES_KEY = "rate-key";

const MARKET_PRICE_KEY = "bitcion-market-price";
const CONF_TRANS_KEY = "confirmed-transactions";

var gRateCache = storageService.load(RATE_KEY) || null;
var gRatesCache = storageService.load(RATES_KEY) || null;

var gMarketPriceCache = storageService.load(MARKET_PRICE_KEY) || [];
var gConfirmedTransactionsCache = storageService.load(CONF_TRANS_KEY) || [];

const currency = "USD";

async function getRate(coins = 1) {
  if (gRateCache) {
    // console.log('getting from cache')
    return new Promise((resolve) => resolve(gRateCache * coins));
  }
  const getRateUrl = `https://blockchain.info/tobtc?currency=${currency}&value=1`;
  try {
    var res = await axios.get(getRateUrl);
    res = res.data;
    res = Number.parseFloat(1 / +res).toFixed(0);
    gRateCache = res;
    storageService.save(RATE_KEY, gRateCache);
    return res * coins;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getRates() {
  if (gRatesCache) {
    // console.log("getting from cache");
    return new Promise((resolve) => resolve(gRatesCache));
  }
  const getUrl = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,BNB,XRP,ADA,UNI,DOT&tsyms=USD`;
  try {
    var res = await axios.get(getUrl);
    res = res.data;
    gRatesCache = {};
    for (const coin in res) {
      gRatesCache[coin] = res[coin]["USD"];
    }
    storageService.save(RATES_KEY, gRatesCache);
    return gRatesCache;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getMarketPrice() {
  if (gMarketPriceCache.length) {
    // console.log('getting from cache')
    return new Promise((resolve) => resolve(gMarketPriceCache));
  }
  const getRateUrl = `https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`;
  try {
    var res = await axios.get(getRateUrl);
    res = res.data.values;
    gMarketPriceCache = res;
    storageService.save(MARKET_PRICE_KEY, gMarketPriceCache);
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getConfirmedTransactions() {
  if (gConfirmedTransactionsCache.length) {
    return new Promise((resolve) => resolve(gConfirmedTransactionsCache));
  }
  const getgConfirmedTransactionsUrl = `https://api.blockchain.info/charts/trade-volume?timespan=1months&format=json&cors=true`;
  try {
    var res = await axios.get(getgConfirmedTransactionsUrl);
    res = res.data.values;
    gConfirmedTransactionsCache = res;
    storageService.save(CONF_TRANS_KEY, gConfirmedTransactionsCache);
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
