const axios = require("axios");
const getPortfolioAssets = require("./index");

const baseUrl = "https://min-api.cryptocompare.com/data";
const currency = "USD";

(async () => {
  const portfolio = await getPortfolioAssets();
  const assetsList = Object.keys(portfolio);
  const assets = assetsList.length > 1 ? assetsList.join(",") : assetsList[0];
  try {
    const url = `${baseUrl}/pricemulti?fsyms=${assets}&tsyms=${currency}`;
    const response = await axios.get(url);
    console.table(parsedByPrice(response.data, portfolio));
  } catch (error) {
    console.error(error);
  }
})();

const parsedByPrice = (assetsByPrice, assetsByName) => {
  const assetsArray = Object.entries(assetsByPrice);
  return assetsArray.map((asset) => {
    const assetName = asset[0];
    const assetPrice = asset[1][currency];
    const assetAmount = assetsByName[assetName];
    const assetValue = Math.round(assetPrice * assetAmount * 100) / 100;
    return [assetName, assetValue];
  });
};
