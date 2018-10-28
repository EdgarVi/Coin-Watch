import React, {Component} from 'react';
import Table from './Table';
import {handleResponse} from '../../Helpers';

class List extends Component {
    constructor(){
        super();

        this.state = {
            error: null,
            base: null, // object
            coins: [], // list of objects
            total: 0 // integer
        };
        this.fetchCurrencies = this.fetchCurrencies.bind(this);
    }

    // Called once component is mounted to ReactDOM
    // Typlically this is a good place to make API calls
    componentDidMount(){
        this.fetchCurrencies();
    }

    fetchCurrencies(){
        console.log("Fetching currencies");
    
        const apiURL = 'https://api.coinranking.com/v1/public/coins?base=USD&limit=50';

        // Here we call Coinranking's API
        fetch(apiURL)
            .then(handleResponse)
            .then((dataObj) => {
                console.log(dataObj);
                
                // Set state based off JSON response
                this.setState({
                    base: dataObj.data.base,
                    coins: dataObj.data.coins,
                    total: dataObj.data.stats.total
                });
                console.log(this.state);
            })
            .catch((error) => {
                this.setState({
                    error: error.errorMessage,
                });
            });            
    }
 
    render(){
        return(
            <div>
                <Table coins = {this.state.coins}/>
            </div>
        );
    }
}

export default List;