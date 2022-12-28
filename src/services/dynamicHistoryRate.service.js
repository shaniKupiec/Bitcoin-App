import axios from "axios";
import storageService from "./storage.service";

export default {
  dynamicRate,
};

async function dynamicRate(coin = "BTC", days = "365") {
  const RATE_KEY = coin + '-' + days;
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
      return Math.floor(d.volume);
    });
    storageService.save(RATE_KEY, gCache);
    return gCache;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
