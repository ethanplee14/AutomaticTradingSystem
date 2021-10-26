
export default function() {
    return {
        quotes: {
            getQuote: jest.fn(),
            getQuotes: jest.fn()
        },
        optionChain: {
            getOptionChain: jest.fn()
        },
        accounts: {
            getAccount: jest.fn(),
            getAccounts: jest.fn()
        },
        hours: {
            singleMarket: jest.fn()
        }
    }
}