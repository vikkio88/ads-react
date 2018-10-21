import React, {Component} from 'react';
import {Segment, Grid, Button, Label} from "semantic-ui-react";
import {connect} from "react-redux";
import {navigate} from "../../store/actions/navigation/index";

import './AppIcon.css';

class AppIconView extends Component {
    render() {
        const {icon, label, name, notifications} = this.props;
        const notificationLabel = notifications > 99 ? '99+' : notifications;
        return (
            <Grid.Column>
                <Segment className="appIconWrapper">
                    <Button
                        fluid
                        size="massive"
                        onClick={() => this.props.dispatch(navigate(name))}
                        icon={icon}
                    />
                    <strong>{`${label}`}</strong>
                    {notifications > 0 && <Label color='red' floating>{notificationLabel}</Label>}
                </Segment>
            </Grid.Column>
        );
    }
}

const AppIcon = connect()(AppIconView);
export {AppIcon};
