import React, {Component} from 'react';
import {Segment, Grid, Icon, Button, Label} from "semantic-ui-react";
import {connect} from "react-redux";
import {navigate} from "../store/actions/navigation";

class AppIconView extends Component {
    render() {
        const {icon, label, name, notifications} = this.props;
        return (
            <Grid.Column>
                <Segment>
                    <Button
                        fluid
                        size="massive"
                        onClick={() => this.props.dispatch(navigate(name))}
                    >
                        <Icon name={icon}/>
                        {`${label}`}
                        {notifications && <Label color='red' floating>{notifications}</Label>}
                    </Button>
                </Segment>
            </Grid.Column>
        );
    }
}

const AppIcon = connect()(AppIconView);
export {AppIcon};