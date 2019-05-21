import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import List from './components/Table/List';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NotFound from './components/NotFound';
import CoinDisplay from './components/CoinDisplay/CoinDisplay';

// App is a functional component, no need for state
const App = () => {
    return(
        <BrowserRouter>
            <div>            
                <Header/>
                <Switch>
                    <Route path = "/" component = {List} exact/>
                    <Route path = "/coin/:id" component = {CoinDisplay} exact/>
                    <Route component = {NotFound}/>
                </Switch>
                <Footer/>
            </div>
        </BrowserRouter>
    );  
}

export default App;