import React, {Component} from 'react';
import './Table.css';

const Table = (props) => {
    const {currencies} = props;
    return (
        <div className="Table-container"> 
            <table className="Table">
                <thead className="Table-head">
                <tr>
                    <th>Cryptocurrency</th>
                    <th>Price</th>
                    <th>Market Cap</th>
                    <th>24H Change</th>  
                </tr>    
                </thead>
                <tbody className="Table-body">
                </tbody> 
            </table>
        </div>
    );
}

export default Table;