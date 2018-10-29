import React from 'react';
import Header from './components/Header/Header';
import List from './components/Table/List';

// App is a functional component, no need for state
const App = () => {
    return(
        <div className="App">
            <Header/>
            <List/>
        </div>
    );
}

export default App;