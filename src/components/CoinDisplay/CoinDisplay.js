import React, {Component} from 'react';
import {handleResponse} from '../../Helpers';
import './CoinDisplay.css';
import { Chart } from 'frappe-charts';

class CoinDisplay extends Component {
    constructor(){
        super();

        this.state = {
            coin: null,
            error: null,
            loading: true,
            base: null
        }
        this.fetchCoin = this.fetchCoin.bind(this);
    }


    componentDidMount() {
        const currencyId = this.props.match.params.id;
        console.log(currencyId);
        this.fetchCoin(currencyId);
    }

    fetchCoin(currencyId){
        console.log("Fetching currencies");

        this.setState({loading: true});

        const apiURL = 'https://api.coinranking.com/v1/public/coin/' + currencyId;

        // Here we call Coinranking's API
        fetch(apiURL)
            .then(handleResponse)
            .then((dataObj) => {
                
                // Render 25 coins per page, so totalPages = total coins / number of coins per page 
                
                console.log('API call made');

                // Set state based off JSON response
                this.setState(() => {
                    return {
                        loading: false,
                        coin: dataObj.data.coin,
                        base: dataObj.data.base
                    }
                });
                console.log(dataObj);
                console.log(this.state);
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    loading: false,
                    error: error.errorMessage,
                });
            });   
    }

    render(){
        const {loading, error} = this.state;
        
        if(loading){
            return <h1>loading new coin</h1>
        }

        if(error){
            return<h1>{error}</h1>
        }
        return (
            <div>
                <div className="coinDisplay">
                    <h1 className="Display-heading"><img src = {this.state.coin.iconUrl} 
                    alt = "" width = "23" height = "23"></img> {this.state.coin.name} ({this.state.coin.symbol})</h1>
                    <div className="Display-container">
                        <div className="Display-item">
                            Price <span className="Display-value">{this.state.base.sign} {this.state.coin.price}</span>
                        </div>
                        <div className="Display-item">
                            Rank <span className="Display-value">{this.state.coin.rank}</span>
                        </div>
                        <div className="Display-item">
                            24H Change
                            <span className="Display-value">{this.state.coin.change}</span>
                        </div>
                        <div className="Display-item">
                            <span className="Display-title">Market cap</span>
                            <span className="Display-dollar">$</span>
                            {this.state.coin.marketCap}
                        </div>
                        <div className="Display-item">
                            <span className="Display-title">24H Volume</span>
                            <span className="Display-dollar">{this.state.base.sign}</span>
                            {this.state.coin.volume}
                        </div>
                        <div className="Display-item">
                            <span className="Display-title">Total supply</span>
                            {this.state.coin.totalSupply} {this.state.coin.symbol}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CoinDisplay;


/*
What would I need to display?
Coin's:
    header
        name (link to website)
        price
        market cap
        rank
        change
    graph
        coin.history (need to make another api call)
*/