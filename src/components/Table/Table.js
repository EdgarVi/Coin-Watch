import React from 'react';
import {history} from 'react-router';
import './Table.css';

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
                        onClick={() => {console.log(coin.name)}}
                    >
                        <th>{coin.rank}</th>  
                        <th><img src = {coin.iconUrl} alt = "" width = "23" height = "23"></img> {coin.name}</th>
                        <th>{props.base.sign}{Number(coin.price).toFixed(2)}</th>
                        <th>{props.base.sign}{(coin.marketCap).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</th> 
                        <th>{coin.change}%</th>
                </tr> 
                ))}
                </tbody> 
            </table>
        </div>
    );
}

export default Table;