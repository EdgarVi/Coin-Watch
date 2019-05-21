import React from 'react';
import {withRouter} from 'react-router-dom';
import './Table.css';
import PropTypes from 'prop-types';

const Table = (props) => {
    
    return (
        <div className="Table-container"> 
            <table className="Table">
                <thead className="Table-head">
                <tr>
                    <th>Rank</th>
                    <th>Coin</th>
                    <th>Price</th>
                    <th>Market Cap</th>
                    <th>24 Hour Change</th>
                </tr>   
                </thead>
                <tbody className="Table-body">
                {props.coins.map((coin) => (
                    <tr
                        key = {coin.id}
                        onClick={() => props.history.push(`/coin/${coin.id}`)}
                    >
                        <th>{coin.rank}</th>  
                        <th className="coin"><img src = {coin.iconUrl} alt = "" width = "23" height = "23"></img>&nbsp;&nbsp;&nbsp;&nbsp;{coin.name}</th>
                        <th>{props.base.sign}{Number(coin.price).toFixed(2)}</th>
                        <th>{props.base.sign}{(coin.marketCap).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</th>
                        {(coin.change > 0) ? 
                            <th className="positive">{coin.change}% &uarr;</th> :
                            <th className="negative">{coin.change}% &darr;</th>
                        }                        
                </tr> 
                ))}
                </tbody> 
            </table>
        </div>
    );

}

Table.PropTypes = {
    coins: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(Table);