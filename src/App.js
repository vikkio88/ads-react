import React, {Component} from 'react';
import './App.css';
import {MainScreen} from './views/MainScreen';
import {Card, Container, Header} from "semantic-ui-react";
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
                <div className="App">
                    <Header/>
                    <Container>
                        <Card fluid>
                            <MainScreen/>
                        </Card>
                    </Container>
                </div>
            </Provider>
        );
    }
}

export default App;
