import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import './App.css';

import store from './store';
import { setAuthToken } from './utils/helperActions';
import { setCurrentUser, logoutUser } from './actions/authActions';

import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Tvseries from './components/tvseries/Tvseries';
import Recipes from './components/recipes/Recipes';
import RecipeEdit from './components/recipes/RecipeEdit';
import NotFound from './components/common/NotFound';

if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/';
    }
}

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/tvseries" exact component={Tvseries} />
                    <Route path="/recipes/:id" exact component={RecipeEdit} />
                    <Route path="/recipes" exact component={Recipes} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/" exact component={Login} />
                    <Route component={NotFound} />
                </Switch>
            </Layout>
        </BrowserRouter>
    </Provider>
);

export default App;
