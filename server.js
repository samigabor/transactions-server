const { CURRENCY } = require("./constants");
const { getAssetsByPrice } = require("./api");
const filterPortfolioAssets = require("./filter-assets");
const parseByPrice = require("./utils");

(async () => {
  const assetsByName = await filterPortfolioAssets();
  const assetsList = Object.keys(assetsByName);
  const assets = assetsList.length > 1 ? assetsList.join(",") : assetsList[0];
  const assetsByPrice = await getAssetsByPrice(assets, CURRENCY);
  console.table(parseByPrice(assetsByPrice, assetsByName, CURRENCY));
})();
