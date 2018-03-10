import React, {Component} from 'react';
import {Button, Container, Form} from "semantic-ui-react";
import {connect} from "react-redux";
import {DateTime} from "luxon";

import {newGame} from "../store/actions";

class LoginView extends Component {
    state = {
        player: {
            name: '',
            surname: '',
        },
        date: DateTime.local(DateTime.local().toFormat("yyyy"), 6, 1)
    };

    updatePlayerField(field, value) {
        this.setState({
            player: {
                ...this.state.player,
                [field]: value
            }
        })
    }

    render() {
        const {name, surname} = this.state.player;
        return (
            <Container textAlign="center">
                <h1>Athletic Director Simulator</h1>
                <h3>Insert your details</h3>
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <input
                            placeholder='Mario'
                            value={name}
                            onChange={e => this.updatePlayerField('name', e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Surname</label>
                        <input
                            placeholder='Mario'
                            value={surname}
                            onChange={e => this.updatePlayerField('surname', e.target.value)}
                        />
                    </Form.Field>
                    <Button disabled={!name || !surname} onClick={() => this.props.newGame(this.state)}>Submit</Button>
                </Form>
            </Container>
        );
    }
}

const stateToProps = () => {
    return {};
};
const dispatchToProps = dispatch => {
    return {
        newGame() {
            dispatch(newGame());
        }
    };
};
const Login = connect(stateToProps, dispatchToProps)(LoginView);
export {Login};