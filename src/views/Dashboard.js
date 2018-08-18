import React, {Component} from 'react';
import {Button, Container, Grid, Icon, Menu} from "semantic-ui-react";
import {AppIcon} from "../components/common";
import {connect} from "react-redux";
import {nextDay, fastForward} from "../store/actions";
import {DATE_FORMAT} from "../const";
import {getApps} from "../libs/helpers";
import {deleteGame, saveGame} from "../libs/helpers/gameHelper";

class DashboardView extends Component {

    renderApps(apps) {
        return apps.map(a => <AppIcon key={a.label} {...a}/>);
    }

    render() {
        const {nextDay, fastForward, game} = this.props;
        const {player, date, messages, news, team} = game.status;
        const applications = getApps({messages, news});
        return (
            <div>
                <Menu className="top fixed">
                    <Menu.Menu position="left">
                        <h3 style={{marginLeft: '25px'}}>
                            {player && `${player.name} ${player.surname}`}
                        </h3>
                    </Menu.Menu>
                    <Menu.Menu>
                        <strong>{team ? `${team}` : ''}</strong>
                    </Menu.Menu>
                    <Menu.Menu position="right">
                        <h3 style={{marginRight: '25px'}}>
                            {date && date.format(DATE_FORMAT)}
                        </h3>
                    </Menu.Menu>
                </Menu>
                <Container style={{marginTop: '60px'}}>
                    <Grid columns={3} doubling>
                        {this.renderApps(applications)}
                    </Grid>
                </Container>
                <Menu secondary className="bottom fixed">
                    <Menu.Menu position="left">
                        <Button onClick={() => saveGame(game)}>
                            <Icon name="save"/> Save
                        </Button>
                        <Button onClick={() => deleteGame()}>
                            <Icon name="remove"/> Remove
                        </Button>
                    </Menu.Menu>
                    <Menu.Menu position="right">
                        <Button
                            fluid
                            size="big"
                            onClick={() => nextDay()}
                        >
                            Next Day <Icon name="step forward"/>
                        </Button>
                        <Button
                            fluid
                            size="huge"
                            onClick={() => fastForward()}
                        >
                            Next Week <Icon name="fast forward"/>
                        </Button>

                    </Menu.Menu>
                </Menu>
            </div>
        );
    }
}

const stateToProps = ({game}) => {
    return {
        game
    };
};
const dispatchToProps = dispatch => {
    return {
        nextDay() {
            dispatch(nextDay());
        },
        fastForward() {
            dispatch(fastForward())
        }
    };
};
const Dashboard = connect(stateToProps, dispatchToProps)(DashboardView);
export {Dashboard};
