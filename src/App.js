import React, {Component} from 'react';
import './App.css';
import {MainScreen} from './views/MainScreen';
import {Login} from './views/Login';
import {Card, Container, Header} from "semantic-ui-react";
import {Provider} from 'react-redux';
import {store} from "./store";

class App extends Component {
    state = {
        loggedIn: false
    };

    componentWillMount() {
        const game = localStorage.getItem('game');
        const loggedIn = !(game === null);
        this.setState({loggedIn});
    }

    render() {
        const {loggedIn} = this.state;
        return (
            <Provider store={store}>
                <div className="App">
                    <Header/>
                    <Container>
                        <Card fluid>
                            {!loggedIn && (<Login/>)}
                            {loggedIn && (<MainScreen/>)}
                        </Card>
                    </Container>
                </div>
            </Provider>
        );
    }
}

export default App;
