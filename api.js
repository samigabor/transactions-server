const axios = require("axios");

const baseUrl = "https://min-api.cryptocompare.com/data";

const getAssetsByPrice = async (assets, currency) => {
  const url = `${baseUrl}/pricemulti?fsyms=${assets}&tsyms=${currency}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAssetsByPrice };
