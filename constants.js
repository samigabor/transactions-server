const CURRENCY = "USD";

const FILTER = {
  NONE: `Given no parameters, returns the latest portfolio value per token in ${CURRENCY}`,
  BY_NAME: `Given a token, returns the latest portfolio value for that token in ${CURRENCY}`,
  BY_DATE: `Given a date, returns the portfolio value per token in ${CURRENCY} on that date`,
  BY_DATE_AND_NAME: `Given a date and a token, returns the portfolio value of that token in ${CURRENCY} on that date`,
};
const TRANSACTION_TYPE = {
  DEPOSIT: "DEPOSIT",
  WITHDRAWAL: "WITHDRAWAL",
};
const MILISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

module.exports = {
  CURRENCY,
  FILTER,
  MILISECONDS_IN_A_DAY,
  TRANSACTION_TYPE,
};
