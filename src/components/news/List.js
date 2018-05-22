import React, {Component} from 'react';
import {Button, Card, Feed, Header, Icon} from "semantic-ui-react";
import {connect} from "react-redux";
import numeral from "numeral";
import {navigatePush} from "../../store/actions/navigation";
import {removeNews, setNewsAsRead} from "../../store/actions/game";
import {randomizer} from "../../libs/generators";
import {CURRENCY_MODIFIERS} from "../../const";

class ListView extends Component {
    render() {
        const {news, readNews, setAsRead, remove} = this.props;
        if (!news.length) {
            return (
                <Header>
                    <h2>No news</h2>
                </Header>
            );
        }
        return (
            <Feed>
                {news.map(n => (
                    <Card color={!n.read ? 'red' : null} fluid key={n.id}>
                        <Feed.Event>
                            <Feed.Extra style={{display: 'flex', justifyContent: 'flex-end'}}>
                                {!n.read && <Button icon="checkmark" onClick={() => setAsRead(n)}/>}
                                <Button icon="trash" onClick={() => remove(n)}/>
                            </Feed.Extra>
                            <Feed.Label>
                                <h2><a onClick={() => readNews(n)}>{n.newspaper}</a></h2>
                                <Icon name="newspaper" size="huge"/>
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Date>{n.date}</Feed.Date>
                                <Feed.Summary>
                                    <h2>{n.title}</h2>
                                </Feed.Summary>
                                <Feed.Meta>
                                    <Feed.Like>
                                        <Icon name='like'/>
                                        {numeral(randomizer.int(1, 500) * CURRENCY_MODIFIERS.THOUSANDS).format('0a')} Likes
                                    </Feed.Like>
                                </Feed.Meta>
                            </Feed.Content>
                        </Feed.Event>
                    </Card>
                ))}
            </Feed>
        );
    }
}


const stateToProps = () => {
    return {};
};
const dispatchToProps = dispatch => {
    return {
        readNews(news) {
            dispatch(setNewsAsRead(news));
            dispatch(navigatePush('readNews', news));
        },
        setAsRead(news) {
            dispatch(setNewsAsRead(news));
        },
        remove(news) {
            dispatch(removeNews(news));
        }
    };
};
const List = connect(stateToProps, dispatchToProps)(ListView);
export {List};