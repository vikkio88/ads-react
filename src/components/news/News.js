import React, {Component} from 'react';
import {connect} from "react-redux";
import {Card} from "semantic-ui-react";

class NewsView extends Component {
    render() {
        const {news} = this.props;
        console.log(news);
        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header>{news.title}</Card.Header>
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