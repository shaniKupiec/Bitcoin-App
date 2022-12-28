import axios from "axios";
import storageService from "./storage.service";

export default {
  dynamicRate,
  dynamicExchangeHistory,
};

async function dynamicRate(coin = "BTC", days = "365") {

  const RATE_KEY = coin + "-" + days;
  var gCache = storageService.load(RATE_KEY) || null;

  if (gCache) {
    console.log("getting from cache");
    return new Promise((resolve) => resolve(gCache));
  }
  const getUrl = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coin}&tsym=USD&limit=${days}`;
  try {
    var res = await axios.get(getUrl);
    res = res.data.Data.Data;
    gCache = res.map((d) => {
      return {
        name: formatDate(d.time * 1000),
        value: d.open,
      };
    });
    storageService.save(RATE_KEY, gCache);
    return gCache;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function dynamicExchangeHistory(coin = "BTC", days = "365") {
  const RATE_KEY = coin + "-" + days;
  var gCache = storageService.load(RATE_KEY) || null;

  if (gCache) {
    console.log("getting from cache");
    return new Promise((resolve) => resolve(gCache));
  }
  const getUrl = `https://min-api.cryptocompare.com/data/exchange/histoday?e=Coinbase&tsym=${coin}&limit=${days}`;
  try {
    var res = await axios.get(getUrl);
    res = res.data;
    gCache = res.Data.map((d) => {
      return {
        name: formatDate(d.time * 1000),
        value: Math.floor(d.volume),
      };
    });
    storageService.save(RATE_KEY, gCache);
    return gCache;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("-");
}
