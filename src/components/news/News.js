import React, {Component} from 'react';
import {connect} from "react-redux";
import MarkdownIt from 'markdown-it';
import Interweave from 'interweave';
import {Card} from "semantic-ui-react";
import {randomizer} from "../../libs/generators";
import {NEWS_PAYLOAD_TYPES} from "../../libs/helpers/newshelper";
import {MatchResult} from "./payloads";

const payloadMapping = {
    [NEWS_PAYLOAD_TYPES.RESULT]: payload => <MatchResult payload={payload}/>,
    default: () => <span/>
};


class NewsView extends Component {

    renderPayload(payload) {
        const component = payloadMapping[payload.type] || payloadMapping.default;
        return component(payload);
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
                    <Card.Description style={{fontSize: '20px', padding: '30px', textAlign: 'justified'}}>
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
