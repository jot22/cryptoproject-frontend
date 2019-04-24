import TradingViewWidget from 'react-tradingview-widget';
import React from 'react';

const TradingViewGraph = ({ticker}) => (

    <TradingViewWidget symbol={ticker}
                       autosize={"true"}
                       theme={"dark"}
                       hide_top_toolbar={"true"}
                       toolbar_bg={"rgba(23, 32, 40, 1)"}
                       news={["headlines"]}/>
);

export default TradingViewGraph;

