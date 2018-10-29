import React from 'react';
import Header from './components/Header/Header';
import List from './components/Table/List';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// App is a functional component, no need for state
const App = () => {
    return(
        <BrowserRouter>
            <div>            
                <Header/>
                <Switch>
                    <Route path = "/" component = {List} exact/>

                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;