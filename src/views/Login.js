import React, {Component} from 'react';
import moment from "moment";
import {Button, Container, Dropdown, Form, Icon, Menu} from "semantic-ui-react";
import {connect} from "react-redux";
import {ucFirst} from 'uvk';

import {newGame} from "../store/actions";
import {nationalitiesArray} from "../const";
import {generator} from "../libs/generator";

const formattedNationalities = nationalitiesArray.map(n => {
    const {flag, name} = n;
    return {
        flag,
        key: flag,
        value: flag,
        text: name
    };
});

class LoginView extends Component {
    state = {
        player: {
            name: '',
            surname: '',
            nationality: null,
            fame: 0
        },
        job: null,
        messages: [],
        news: [],
        date: moment(),
        context: null,
    };

    updatePlayerField(field, value) {
        this.setState({
            player: {
                ...this.state.player,
                [field]: value
            }
        })
    }

    isFormInvalid() {
        const {player, context} = this.state;
        return (player.name.length < 3 || player.surname.length < 3)
            || (player.nationality === null) || !context
    }

    newGame() {
        this.props.newGame({...this.state});
    }


    render() {
        const {name, surname, nationality} = this.state.player;
        console.log(this.state.player);
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
                            onChange={e => this.updatePlayerField('name', ucFirst(e.target.value))}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Surname</label>
                        <input
                            placeholder='Mario'
                            value={surname}
                            onChange={e => this.updatePlayerField('surname', ucFirst(e.target.value))}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Nationality</label>
                        <Dropdown
                            selection
                            placeholder='Select your country'
                            options={formattedNationalities}
                            selectOnNavigation={false}
                            onChange={(e, {value}) => this.updatePlayerField('nationality', value)}
                        />
                    </Form.Field>
                    <Button disabled={!nationality} onClick={() => console.log(generator.teams())}>Generate teams</Button>
                </Form>
                <Menu>
                    <Menu.Menu position="right">
                        <Button
                            size="massive"
                            fluid
                            disabled={this.isFormInvalid()}
                            onClick={() => this.newGame()}
                        >
                            Start <Icon name="step forward"/>
                        </Button>
                    </Menu.Menu>
                </Menu>
            </Container>
        );
    }
}

const stateToProps = () => {
    return {};
};
const dispatchToProps = dispatch => {
    return {
        newGame(details) {
            dispatch(newGame(details));
        }
    };
};
const Login = connect(stateToProps, dispatchToProps)(LoginView);
export {Login};