import React, {Component} from 'react';
import {connect} from "react-redux";
import {Card} from "semantic-ui-react";
import {randomizer} from "../../libs/generators";

class NewsView extends Component {
    render() {
        const {news} = this.props;
        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header
                        style={{fontWeight: 'bold', color: randomizer.pickOne(['orange', 'red', 'blue'])}}
                    >
                        {news.newspaper}
                    </Card.Header>
                    <Card.Header><h1>{news.title}</h1></Card.Header>
                </Card.Content>
                <Card.Content>
                    <Card.Meta>{news.date}</Card.Meta>
                    <Card.Description>{news.message}</Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

const stateToProps = ({navigation}) => {
    const {payload} = navigation;
    return {
        news: payload
    }
};
const dispatchToProps = () => {
    return {};
};
const News = connect(stateToProps, dispatchToProps)(NewsView);
export {News};