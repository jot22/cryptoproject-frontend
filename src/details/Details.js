import React from 'react';

export default class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [
                {
                    name: "Bitcoin",
                    symbol: "BTC",
                    quote: {
                        USD: {
                            price: 1000,
                            volume_24h: 715568000,
                            percent_change_24h: .987,
                            market_cap: 158055024432
                        }
                    }
                }
            ]
        }
    }

    render() {
        return (
            <ul className={'list-group'}>
                {
                    this.state.results.map((crypto) => {
                            return (
                                <li className={'list-group-item'}>
                                    <div className={'form-group row'}>
                                        <h1>
                                            {crypto.name}
                                        </h1>
                                        <h2>
                                            ({crypto.symbol})
                                        </h2>
                                    </div>
                                    <div className={'form-group row'}>
                                        <h2>
                                            Price:
                                        </h2>
                                        <h3>
                                            {crypto.quote.USD.price}
                                        </h3>
                                    </div>
                                    <div className={'form-group row'}>
                                        <h2>
                                            Volume:
                                        </h2>
                                        <h3>
                                            {crypto.quote.USD.volume_24h}
                                        </h3>
                                    </div>
                                    <div className={'form-group row'}>
                                        <h2>
                                            % Change:
                                        </h2>
                                        <h3>
                                            {crypto.quote.USD.percent_change_24h}
                                        </h3>
                                    </div>
                                    <div className={'form-group row'}>
                                        <h2>
                                            Market Cap:
                                        </h2>
                                        <h3>
                                            {crypto.quote.USD.market_cap}
                                        </h3>
                                    </div>
                                </li>
                            );
                        }
                    )
                }
            </ul>
        )
    }
}