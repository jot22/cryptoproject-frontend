import React from 'react';
import '../home/HomePage.css';

export default class HomePage extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return(
            <div id={"footer"}>

                <label>
                    Copyright Piggybank Investment Inc. 2019 - All Rights Reserved, Established 2019.
                </label>
                <p>About:
                    Welcome to Piggybank Investment Inc, where we take care of all your most delicate financial needs.
                </p>
            </div>
        )
    }
}
