import React, {Component} from 'react';
import {Button, Card, Feed, Icon} from "semantic-ui-react";
import {connect} from "react-redux";
import {navigatePush} from "../../store/actions/navigation";
import {removeNews, setNewsAsRead} from "../../store/actions/game";
import {Empty} from "../common";

class ListView extends Component {
    render() {
        const {news, readNews, setAsRead, remove} = this.props;
        if (!news.length) {
            return <Empty icon="newspaper" text="No News"/>;
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
                                <Icon name="newspaper" size="big"/>
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Date>{n.date}</Feed.Date>
                                <Feed.Summary>
                                    <h2>{n.title}</h2>
                                </Feed.Summary>
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
