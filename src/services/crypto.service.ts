
const RATE_KEY = 'rates'; 

const HISTORY_BTC = 'history-btc';
const HISTORY_ETH = 'history-eth';
const HISTORY_LTC = 'history-ltc';
const HISTORY_XRP = 'history-xrp';
const HISTORY_DASH = 'history-dash';

const FULL_HISTORY_BTC = 'full-history-btc';


const gRatesCache = storageService.loadFromStorage(RATE_KEY) || null;
const gHistoryBTCCache = storageService.loadFromStorage(HISTORY_BTC) || null;
const gHistoryETHCache = storageService.loadFromStorage(HISTORY_ETH) || null;
const gHistoryLTCCache = storageService.loadFromStorage(HISTORY_LTC) || null;
const gHistoryXRPCache = storageService.loadFromStorage(HISTORY_XRP) || null;
const gHistoryDASHCache = storageService.loadFromStorage(HISTORY_DASH) || null;
const gFullHistoryBTCCache =
  storageService.loadFromStorage(FULL_HISTORY_BTC) || null;


  public rates() {
    if (gRatesCache) return from([gRatesCache]);
    return this.http
      .get(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,XRP,DASH&tsyms=USD`
      )
      .pipe(
        map((res: any) => {
          for (const coin in res) {
            res[coin.toLowerCase()] = res[coin]['USD'];
          }
          storageService.saveToStorage(RATE_KEY, res);
          return res;
        })
      );
  }

  // public exchangeHistoryPERIOD() {
  //   if (gHistoryPERIODCache) return from([gHistoryPERIODCache]);
  //   return this.http
  //     .get(
  //       `https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,XRP,DASH&tsyms=USD`
  //     )
  //     .pipe(
  //       map((res: any) => {
  //         for (const coin in res) {
  //           res[coin.toLowerCase()] = res[coin]['USD'];
  //         }
  //         storageService.saveToStorage(RATE_KEY, res);
  //         return res;
  //       })
  //     );
  // }

  public exchangeHistoryBTC() {
    if (gHistoryBTCCache) return from([gHistoryBTCCache])
    return this.http
      .get(
        `https://min-api.cryptocompare.com/data/exchange/histoday?e=Coinbase&tsym=BTC&limit=1000`
      )
      .pipe(
        map((res: any) => {
          res = res.Data.map((d: { time: number; volume: number }) => {
            return {
              name: this.formatDate(d.time * 1000),
              value: Math.floor(d.volume),
            };
          });
          const data = {
            name: 'Bitcoin exchange history',
            series: res,
          };
          storageService.saveToStorage(HISTORY_BTC, data);
          return data;
        })
      );
  }

  public exchangeHistoryETH() {
    if (gHistoryETHCache) return from([gHistoryETHCache]);
    return this.http
      .get(
        `https://min-api.cryptocompare.com/data/exchange/histoday?e=Coinbase&tsym=ETH&limit=1000`
      )
      .pipe(
        map((res: any) => {
          res = res.Data.map((d: { time: number; volume: number }) => {
            return {
              name: this.formatDate(d.time * 1000),
              value: Math.floor(d.volume),
            };
          });
          const data = {
            name: 'Ethereum exchange history',
            series: res,
          };
          storageService.saveToStorage(HISTORY_ETH, data);
          return data;
        })
      );
  }

  public exchangeHistoryLTC() {
    if (gHistoryLTCCache) return from([gHistoryLTCCache]);
    return this.http
      .get(
        `https://min-api.cryptocompare.com/data/exchange/histoday?e=Coinbase&tsym=LTC&limit=1000`
      )
      .pipe(
        map((res: any) => {
          res = res.Data.map((d: { time: number; volume: number }) => {
            return {
              name: this.formatDate(d.time * 1000),
              value: Math.floor(d.volume),
            };
          });
          const data = {
            name: 'Litecoin exchange history',
            series: res,
          };
          storageService.saveToStorage(HISTORY_LTC, data);
          return data;
        })
      );
  }

  public exchangeHistoryXRP() {
    if (gHistoryXRPCache) return from([gHistoryXRPCache]);

    return this.http
      .get(
        `https://min-api.cryptocompare.com/data/exchange/histoday?e=Coinbase&tsym=XRP&limit=1000`
      )
      .pipe(
        map((res: any) => {
          res = res.Data.map((d: { time: number; volume: number }) => {
            return {
              name: this.formatDate(d.time * 1000),
              value: Math.floor(d.volume),
            };
          });
          const data = {
            name: 'Ripple exchange history',
            series: res,
          };
          storageService.saveToStorage(HISTORY_XRP, data);
          return data;
        })
      );
  }

  public exchangeHistoryDASH() {
    if (gHistoryDASHCache) return from([gHistoryDASHCache]);
    return this.http
      .get(
        `https://min-api.cryptocompare.com/data/exchange/histoday?e=Coinbase&tsym=DASH&limit=1000`
      )
      .pipe(
        map((res: any) => {
          res = res.Data.map((d: { time: number; volume: number }) => {
            return {
              name: this.formatDate(d.time * 1000),
              value: Math.floor(d.volume),
            };
          });
          const data = {
            name: 'Dash exchange history',
            series: res,
          };
          storageService.saveToStorage(HISTORY_DASH, data);
          return data;
        })
      );
  }

  private formatDate(date: number): string {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
  }

  public fullHistoryBTC() {
    if (gFullHistoryBTCCache) return from([gFullHistoryBTCCache]);
    return this.http
      .get(
        `https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100`
      )
      .pipe(
        map((res: any) => {
          res = res.Data.Data.map((d: any) => {
            return {
              x: d.time * 1000,
              h: d.high,
              c: d.close,
              l: d.low,
              o: d.open,
            };
          });
          storageService.saveToStorage(FULL_HISTORY_BTC, res);
          return res;
        })
      );
  }

  // public getMarketPrice(period: string) {
  //   if (gMarketPriceCache) return from([gMarketPriceCache]);
  //   return this.http
  //     .get(
  //       `https://api.blockchain.info/charts/market-price?timespan=1${period}&format=json&cors=true`
  //     )
  //     .pipe(
  //       map((res) => {
  //         storageService.saveToStorage(MARKET_PRICE_KEY, res);
  //         return res;
  //       })
  //     );
  // }
}
