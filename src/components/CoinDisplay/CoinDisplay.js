import React, {Component} from 'react';
import {handleResponse} from '../../Helpers';
import './CoinDisplay.css';

class CoinDisplay extends Component {
    constructor(){
        super();

        this.state = {
            coin: null,
            error: null,
            loading: true,
            base: null
        }

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
            <div className="coinDisplay">
                <h1>{this.state.coin.name}</h1>
            </div>
        );
    }
}

export default CoinDisplay;