import React, {Component} from 'react';
import {connect} from "react-redux";
import {Dashboard, Mail, News, Calendar, Database} from './';
import {Button, Grid, Icon} from "semantic-ui-react";
import {Login} from "./Login";
import {Details as TeamDetails} from "../components/teams";
import {navigatePop} from "../store/actions";

const componentMap = {
    'mail': <Mail/>,
    'news': <News/>,
    'calendar': <Calendar/>,
    'database': <Database/>,
    'teamDetails': <TeamDetails/>
};


class MainScreenView extends Component {
    render() {
        const viewComponent = componentMap[this.props.view];
        const {loggedIn} = this.props;
        if (viewComponent) {
            return (
                <Grid centered stretched columns={1} doubling>
                    <Grid.Row>
                        <Button fluid onClick={() => this.props.back()} size="massive">
                            <Icon name="step backward"/> Back
                        </Button>
                    </Grid.Row>
                    <Grid.Row>
                        <div className="appView">
                            {viewComponent}
                        </div>
                    </Grid.Row>
                </Grid>
            );
        }


        return loggedIn ? <Dashboard/> : <Login/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        back() {
            dispatch(navigatePop())
        }
    };
};
const mapStateToProps = ({navigation, game}) => {
    const loggedIn = Object.keys(game).length > 0;
    return {
        view: navigation.view,
        loggedIn
    }
};
const MainScreen = connect(mapStateToProps, mapDispatchToProps)(MainScreenView);
export {MainScreen};

