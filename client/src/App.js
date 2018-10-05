import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import store from './store';
import PrivateRoute from './components/common/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import NotFound from './components/common/NotFound';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Tvseries from './components/tvseries/Tvseries';

if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login';
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <div className="container">
                            <Navbar />
                            <div className="container-content">
                                <Switch>
                                    <Route
                                        exact
                                        path="/"
                                        component={Tvseries}
                                    />
                                    <Route
                                        exact
                                        path="/register"
                                        component={Register}
                                    />
                                    <Route
                                        exact
                                        path="/login"
                                        component={Login}
                                    />
                                    <Route component={NotFound} />
                                </Switch>

                                <Switch>
                                    <PrivateRoute
                                        exact
                                        path="/tvseries"
                                        component={Tvseries}
                                    />
                                </Switch>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
