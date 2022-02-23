const fs = require("fs");
const readline = require("readline");
const {
  parseAll,
  parseByName,
  parseByDate,
  parseByDateAndName,
} = require("./parseline");

const {
  FILTER,
  MILISECONDS_IN_A_DAY,
  TRANSACTION_TYPE,
} = require("./constants");

const rs = fs.createReadStream("sample-data.csv");
const rl = readline.createInterface({ input: rs });

const filterType = FILTER.NONE; // NONE | BY_NAME | BY_DATE | BY_DATE_AND_NAME
const filterDate = "1970/01/19";
const filterToken = "BTC";

const updateTokenAmount = (portfolio, token, amount, transactionType) => {
  switch (transactionType) {
    case TRANSACTION_TYPE.DEPOSIT:
      portfolio[token] = portfolio[token] + amount;
      break;
    case TRANSACTION_TYPE.WITHDRAWAL:
      portfolio[token] = portfolio[token] - amount;
      break;
    default:
      // TODO: handle edge cases
      break;
  }
};

const filterPortfolioAssets = async () => {
  console.time(filterType);

  const start = new Date(filterDate).getTime();
  const end = start + MILISECONDS_IN_A_DAY;
  const portfolio = {};

  switch (filterType) {
    case FILTER.NONE:
      for await (const line of rl) {
        const [transactionType, token, amount] = parseAll(line);
        if (amount && !portfolio[token]) {
          portfolio[token] = 0;
        }
        updateTokenAmount(portfolio, token, amount, transactionType);
      }
      break;

    case FILTER.BY_NAME:
      portfolio[filterToken] = 0;
      for await (const line of rl) {
        const [transactionType, amount] = parseByName(line, filterToken);
        updateTokenAmount(portfolio, filterToken, amount, transactionType);
      }
      break;

    case FILTER.BY_DATE:
      portfolio[filterToken] = 0;
      for await (const line of rl) {
        const [transactionType, amount] = parseByDate(line, start, end);
        updateTokenAmount(portfolio, filterToken, amount, transactionType);
      }
      break;

    case FILTER.BY_DATE_AND_NAME:
      portfolio[filterToken] = 0;
      for await (const line of rl) {
        const [transactionType, amount] = parseByDateAndName(
          line,
          start,
          end,
          filterToken
        );
        updateTokenAmount(portfolio, filterToken, amount, transactionType);
      }
      break;

    default:
      break;
  }

  console.timeEnd(filterType);
  return portfolio;
};

module.exports = filterPortfolioAssets;
