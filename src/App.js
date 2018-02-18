import React, {Component} from 'react';
import './App.css';
import {MainScreen} from './views/MainScreen';
import {Header, Container} from "semantic-ui-react";
import {Provider} from 'react-redux';
import {store} from "./store";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Header/>
                    <Container>
                        <MainScreen/>
                    </Container>
                </div>
            </Provider>
        );
    }
}

export default App;
