## Transactions server

Let us assume you are a crypto investor. You have made transactions over a period of time which is logged in a CSV file. Write a command line program that does the following:

- Given no parameters, return the latest portfolio value per token in USD
- Given a token, return the latest portfolio value for that token in USD
- Given a date, return the portfolio value per token in USD on that date
- Given a date and a token, return the portfolio value of that token in USD on that date

The CSV file has the following columns:

- timestamp: Integer number of seconds since the Epoch
- transaction_type: Either a DEPOSIT or a WITHDRAWAL
- token: The token symbol
- amount: The amount transacted

Portfolio means the balance of the token where you need to add deposits and subtract withdrawals. You may obtain the exchange rates from cryptocompare where the API is free. You should write it in Node.js as our main stack is in Javascript/Typescript and we need to assess your proficiency.

## Run the app:

`npm run start`

## Folder structure:

- `api.js` - cryptocompare requests
- `constants.js`
- `filter-assets.js` - logic for assets filtering criteria
- `parseline.js` - parsing logic for each csv line
- `sample-data.js` - copied the first 1000 lines from the transactions.csv (~1GB)
- `server.js` - the overall app level logic
- `utils.js` - utilities functions

## Design decisions

- devided the app into dedicated module, each responsible for specific logic
- used built-in file parsing packages (fs/readline) which minimises package dependencies
