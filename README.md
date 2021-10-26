### Overview
Automatic Trading System to trade financial assets with Interactive Brokers, using TDAmeritrade as a data provider.

### Project Structure
MarketData - Responsible for looking up market data necessary for strategy. Currently using
TDAmeritrade at **market/tda/tda-market-data** for market data using it's REST api. It's free and 
structured well, while IBKR has a subscription model for certain types of market data. 

Broker - Broker to place trades on. Using **brokers/ibkr/ibkr** for the IBKR portfolio which communicates
with their <a href="https://www.interactivebrokers.com/en/index.php?f=5041">Client Portal</a>.

Strategy - Strategy to be ran. Depends on the broker and market data for the strategy to process
place orders. Simple weekly IronCondor strategy implemented at **strategies/iron-condor/index**.

StrategyEngine - Accepts the Broker and MarketData module in the constructor to build the engine.
Can add various Strategies to be continuously ran. **bot/strategy-engine**

### Future Considerations
Constraints for IronCondor strategy are currently implemented as a part of the strategy. Should
abstract a constraints system that wraps around a strategy, or add it to Strategy and create
an abstract Strategy class. 

