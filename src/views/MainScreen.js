import React, {Component} from 'react';
import {connect} from "react-redux";
import {Dashboard, Mail, News, Calendar, Database} from './';
import {Button, Container, Dimmer, Loader, Menu} from "semantic-ui-react";
import {Login} from "./Login";
import {navigatePop, navigate} from "../store/actions";

import {News as ReadNews} from "../components/news";

import {Details as TeamDetails} from "../components/team";
import {Details as PlayerDetails} from "../components/player";
import {Details as CoachDetails} from "../components/coach";
import {DATE_FORMAT, DATE_FORMAT_DOW} from "../const";

const componentMap = {
    'mail': <Mail/>,
    'news': <News/>,
    'calendar': <Calendar/>,
    'database': <Database/>,

    // AppsSubView
    'readNews': <ReadNews/>,

    // Teams Views
    'teamDetails': <TeamDetails/>,
    'playerDetails': <PlayerDetails/>,
    'coachDetails': <CoachDetails/>,
};


class MainScreenView extends Component {
    getMainScreen() {
        const {loggedIn, view, date, back, toDashboard} = this.props;
        const viewComponent = componentMap[view];
        if (viewComponent) {
            return (
                <div>
                    <Menu className="top fixed">
                        <Menu.Menu position="left">
                            <Button onClick={() => back()} size="big" icon="step backward"/>
                            <Button icon="home" onClick={() => toDashboard()} size="big"/>
                        </Menu.Menu>
                        <Menu.Menu position="right">
                            <h4 style={{marginRight: '15px'}}>
                                {date.format(DATE_FORMAT_DOW)}
                            </h4>
                        </Menu.Menu>
                    </Menu>
                    <Container style={{marginTop: '80px'}} textAlign="center">
                        {viewComponent}
                    </Container>
                </div>
            );
        }


        return loggedIn ? <Dashboard/> : <Login/>;
    }

    render() {
        const {loading, date} = this.props;
        return (
            <Dimmer.Dimmable as="div" dimmed={loading} className="mainLoader">
                <Dimmer active={loading} inverted>
                    <Loader>
                        Simulating until...
                        <h1>{date && date.format(DATE_FORMAT)}</h1>
                    </Loader>
                </Dimmer>
                {this.getMainScreen()}
            </Dimmer.Dimmable>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        back() {
            dispatch(navigatePop());
        },
        toDashboard() {
            dispatch(navigate(null))
        }
    };
};
const mapStateToProps = ({navigation, game}) => {
        const loggedIn = Object.keys(game).length > 0;
        const {loading} = game;
        const {date} = (game.status || {});
        return {
            view: navigation.view,
            loggedIn,
            loading,
            date
        }
    }
;
const MainScreen = connect(mapStateToProps, mapDispatchToProps)(MainScreenView);
export {MainScreen};

