import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../history';
import Header from './Header';
import HomePage from './HomePage';

const App = () => {
    return(
        <div>
            <Router history={history}>
                <div>
                    <Header />
                    <Route path='/' exact component={HomePage}/>
                </div>
            </Router>
        </div>
    );
}

export default App;