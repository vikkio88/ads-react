import React, {Component} from 'react';
import {Button, Card, Feed, Icon} from "semantic-ui-react";
import {connect} from "react-redux";
import {navigatePush} from "../../store/actions/navigation";
import {removeNews, setNewsAsRead} from "../../store/actions/game";
import {Empty} from "../common";

import './List.css';

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
                            <Feed.Extra className="actionsWrapper">
                                <div className="actions">
                                    {!n.read && <Button icon="eye slash outline" onClick={() => setAsRead(n)}/>}
                                    <Button icon="trash" onClick={() => remove(n)}/>
                                </div>
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
