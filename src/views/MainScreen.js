import React, {Component} from 'react';
import {connect} from "react-redux";
import {Dashboard, Mail, News, Calendar, Database} from './';
import {navigate} from "../store/actions";
import {Button, Grid, Icon} from "semantic-ui-react";

const componentMap = {
    'mail': <Mail/>,
    'news': <News/>,
    'calendar': <Calendar/>,
    'database': <Database />,
};


class MainScreenView extends Component {
    render() {
        const viewComponent = componentMap[this.props.view];

        if (viewComponent) {
            return (
                <div className="appView">
                    <Grid centered stretched columns={1} doubling>
                        <Grid.Row>
                            <Button fluid onClick={() => this.props.back()} size="massive">
                                <Icon name="step backward" /> Back
                            </Button>
                        </Grid.Row>
                        <Grid.Row>
                            {viewComponent}
                        </Grid.Row>
                    </Grid>
                </div>
            );
        }


        return <Dashboard/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        back() {
            dispatch(navigate('dashboard'))
        }
    };
};
const mapStateToProps = ({navigation}) => {
    return {
        view: navigation.view
    }
};
const MainScreen = connect(mapStateToProps, mapDispatchToProps)(MainScreenView);
export {MainScreen};

