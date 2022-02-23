const parseByPrice = (assetsByPrice, assetsByName, currency) => {
  const assetsArray = Object.entries(assetsByPrice);
  return assetsArray.map((asset) => {
    const assetName = asset[0];
    const assetPrice = asset[1][currency];
    const assetAmount = assetsByName[assetName];
    const assetValue = Math.round(assetPrice * assetAmount * 100) / 100;
    return [assetName, assetValue];
  });
};

module.exports = parseByPrice;
