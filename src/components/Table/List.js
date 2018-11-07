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
            stats: null, // object
            coins: [], // list of objects
            total: 0, // integer
            page: 1, // current page
            totalPages: 0,
            offset: 0
        };
        this.fetchCurrencies = this.fetchCurrencies.bind(this);
        this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
        this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
    }

    // Called once component is mounted to ReactDOM
    // Typlically this is a good place to make API calls
    componentDidMount(){
        this.fetchCurrencies();
    }

    fetchCurrencies(){
        console.log("Fetching currencies");

        this.setState({loading: true});

        const apiURL = 'https://api.coinranking.com/v1/public/coins?base=USD&offset=' + this.state.offset.toString() + '&limit=25';

        // Here we call Coinranking's API
        fetch(apiURL)
            .then(handleResponse)
            .then((dataObj) => {
                
                // Render 25 coins per page, so totalPages = total coins / number of coins per page 
                const totalPages = Math.ceil(dataObj.data.stats.total / 25);
                
                console.log('API call made');

                // Set state based off JSON response
                this.setState(() => {
                    return {
                        totalPages: totalPages,
                        stats: dataObj.data.stats,
                        base: dataObj.data.base,
                        coins: dataObj.data.coins,
                        total: dataObj.data.stats.total,
                        loading: false
                    }
                });
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
    
    handleLeftArrowClick(){
        var page = this.state.page;
        var offset = this.state.offset;
        if(page > 1){
            page--;
            offset -= 25;
            // by passing in a callback function, we mimic synchronous behavior to update state
            this.setState({
                page: page,
                offset: offset
            }, () => {
                this.fetchCurrencies();
            });     
        } 
    }

    handleRightArrowClick(){
        var page = this.state.page;
        var offset = this.state.offset;

        if(page < this.state.totalPages){
            page++;
            offset += 25;
            
            // by passing in a callback function, we mimic synchronous behavior to update state
            this.setState({
                    page: page,
                    offset: offset
                }, () => {
                    this.fetchCurrencies();
                }
            );     
        }
    }

    render(){
        const {loading} = this.state;
        if(loading){
            return <h1>loading coins</h1>
        }
        
        return(
            <div>
                <Table 
                    base = {this.state.base} 
                    coins = {this.state.coins}
                />
                <button
                    id='leftArrowButton'
                    onClick={()=> this.handleLeftArrowClick()}
                >&larr;</button>
                <button
                    id='rightArrowButton'
                    onClick={()=> this.handleRightArrowClick()}
                >&rarr;</button>
            </div>
        );
    }
}

export default List;