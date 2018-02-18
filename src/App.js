import React, {Component} from 'react';
import './App.css';
import {MainScreen} from './views/MainScreen';
import {Container} from "semantic-ui-react";
import {Provider} from 'react-redux';
import {store} from "./store";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Container>
                        <MainScreen/>
                    </Container>
                </div>
            </Provider>
        );
    }
}

export default App;
