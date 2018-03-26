import React, {Component} from 'react';
import {Card, Feed, Icon} from "semantic-ui-react";
import {connect} from "react-redux";
import {navigatePush} from "../../store/actions/navigation";
import {setNewsAsRead} from "../../store/actions/game";
import {randomizer} from "../../libs/generators";

class ListView extends Component {
    render() {
        const {news, readNews} = this.props;
        return (
            <Feed>
                {news.map(n => (
                    <Card color={!n.read ? 'red' : null} fluid key={n.id}>
                        <Feed.Event>
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
                                        {randomizer.int(10, 40)} Likes
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
        }
    };
};
const List = connect(stateToProps, dispatchToProps)(ListView);
export {List};