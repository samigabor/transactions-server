const DELIMITER = ",";

/**
 * @param line - has the form `1571967208,DEPOSIT,BTC,0.298660`
 */
function parseAll(line) {
  const [_, transactionType, token, amount] = line.split(DELIMITER);
  if (!isNaN(amount)) {
    return [transactionType, token, +amount];
  }
  return ["", "", 0];
}

function parseByName(line, filterToken) {
  const [_, transactionType, token, amount] = line.split(DELIMITER);
  if (isMatch(token, filterToken)) {
    return [transactionType, +amount];
  }
  return ["", 0];
}

function parseByDate(line, start, end) {
  const [timestamp, transactionType, _, amount] = line.split(DELIMITER);
  if (amount && timestamp > start && timestamp < end) {
    return [transactionType, +amount];
  }
  return ["", 0];
}

function parseByDateAndName(line, start, end, filterToken) {
  const [timestamp, transactionType, token, amount] = line.split(DELIMITER);
  if (
    amount &&
    timestamp > start &&
    timestamp < end &&
    isMatch(token, filterToken)
  ) {
    return [transactionType, +amount];
  }
  return ["", 0];
}

function isMatch(token, filterToken) {
  const tokenRegex = new RegExp(`^${filterToken}$`, "g"); // /^BTC$/g
  return token && token.match(tokenRegex);
}

module.exports = {
  parseAll,
  parseByName,
  parseByDate,
  parseByDateAndName,
};
