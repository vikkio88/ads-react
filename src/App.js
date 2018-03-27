import React, {Component} from 'react';
import './App.css';
import {MainScreen} from './views/MainScreen';
import {Provider} from 'react-redux';
import {store} from "./store";
import {loadGame} from "./store/actions";

class App extends Component {
    componentWillMount() {
        store.dispatch(loadGame())
    }

    render() {
        return (
            <Provider store={store}>
                <MainScreen/>
            </Provider>
        );
    }
}

export default App;
