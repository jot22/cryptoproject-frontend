import React from 'react';
import './Details.css'

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
            this.state.results.map((crypto) => {
                    return (
                        <div id={"mainDetailContainer"}>
                            <h1 id={"detailHeader"}>Details</h1>
                            <div className="card" id={"cardContain"}>
                                <div className="card-header" id={"cardHeader"}>
                                    <h1>{crypto.name}</h1>
                                </div>
                                <div className="card-body">
                                    <h5>Symbol: {crypto.symbol}</h5>
                                    <h5>Price: {crypto.quote.USD.price}</h5>
                                    <h5>Market Cap: {crypto.quote.USD.market_cap}</h5>
                                    <h5>Volume: {crypto.quote.USD.volume_24h}</h5>
                                    <h5>24 Hour Change: {crypto.quote.USD.percent_change_24h}%</h5>
                                </div>
                            </div>
                        </div>
                    );
                }
            ))
    }
}


{/*<li className={'list-group-item'}>*/
}
{/*<div className={'form-group row'}>*/
}
{/*<h1>*/
}
{/*{crypto.name}*/
}
{/*</h1>*/
}
{/*<h2>*/
}
{/*({crypto.symbol})*/
}
{/*</h2>*/
}
{/*</div>*/
}
{/*<div className={'form-group row'}>*/
}
{/*<h2>*/
}
{/*Price:*/
}
{/*</h2>*/
}
{/*<h3>*/
}
{/*{crypto.quote.USD.price}*/
}
{/*</h3>*/
}
{/*</div>*/
}
{/*<div className={'form-group row'}>*/
}
{/*<h2>*/
}
{/*Volume:*/
}
{/*</h2>*/
}
{/*<h3>*/
}
{/*{crypto.quote.USD.volume_24h}*/
}
{/*</h3>*/
}
{/*</div>*/
}
{/*<div className={'form-group row'}>*/
}
{/*<h2>*/
}
{/*% Change:*/
}
{/*</h2>*/
}
{/*<h3>*/
}
{/*{crypto.quote.USD.percent_change_24h}*/
}
{/*</h3>*/
}
{/*</div>*/
}
{/*<div className={'form-group row'}>*/
}
{/*<h2>*/
}
{/*Market Cap:*/
}
{/*</h2>*/
}
{/*<h3>*/
}
{/*{crypto.quote.USD.market_cap}*/
}
{/*</h3>*/
}
{/*</div>*/
}
{/*</li>*/
}
