import React, {Component} from 'react';
import Table from './Table';
import {handleResponse} from '../../Helpers';

class List extends Component {
    constructor(){
        super();

        this.state = {
            loading: true,  
            error: null,
            base: null, // object
            stats: null,
            coins: [], // list of objects
            total: 0, // integer
            page: 1,
            totalPages: 0
        };
        this.fetchCurrencies = this.fetchCurrencies.bind(this);
    }

    // Called once component is mounted to ReactDOM
    // Typlically this is a good place to make API calls
    componentDidMount(){
        this.fetchCurrencies();
    }

    fetchCurrencies(){
        //console.log("Fetching currencies");
    
        this.setState({loading: true});
        var offset = 25 * (this.state.page - 1);
        const apiURL = 'https://api.coinranking.com/v1/public/coins?base=USD&offset=' + offset.toString() + '&limit=25';

        // Here we call Coinranking's API
        fetch(apiURL)
            .then(handleResponse)
            .then((dataObj) => {
                //console.log(dataObj);
                //const {totalPages} = Math.ceil(dataObj.data.stats.total / 25); // Will show 25 coins per page
                const totalPages = Math.ceil(dataObj.data.stats.total / 25);
                
                console.log(totalPages);
                console.log('API call made');
                // Set state based off JSON response
                this.setState({
                    totalPages: totalPages,
                    stats: dataObj.data.stats,
                    base: dataObj.data.base,
                    coins: dataObj.data.coins,
                    total: dataObj.data.stats.total,
                    loading: false
                });
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
        const {loading} = this.state;
        if(loading){
            return <h1>loading shit yuhh</h1>
        }
        
        return(
            <div>
                <Table 
                base = {this.state.base} 
                coins = {this.state.coins}
                />
            </div>
        );
    }
}

export default List;