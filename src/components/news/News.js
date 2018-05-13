import React, {Component} from 'react';
import {connect} from "react-redux";
import MarkdownIt from 'markdown-it';
import Interweave from 'interweave';
import {Accordion, Card} from "semantic-ui-react";
import {randomizer} from "../../libs/generators";
import {PAYLOAD_TYPES} from "../../libs/helpers/newshelper";
import {ResultLine} from "../league/match";


class NewsView extends Component {

    renderPayload(payload) {
        switch (payload.type) {
            case PAYLOAD_TYPES.RESULT: {
                return (
                    <Accordion styled fluid>
                        {payload.data.map((r, index) => <ResultLine key={index} match={r} played/>)}
                    </Accordion>
                );
            }
            default:
                return <span/>;
        }
    }

    render() {
        const {news} = this.props;
        return (
            <Card fluid centered>
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
                    <Card.Description>
                        <Interweave
                            tagName="div"
                            content={(new MarkdownIt()).render(news.message)}
                        />
                        {news.payload && this.renderPayload(news.payload)}
                    </Card.Description>
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