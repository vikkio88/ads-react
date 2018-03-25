import React, {Component} from 'react';
import {connect} from "react-redux";
import {List} from "../components/news";

class NewsView extends Component {
    render() {
        return (
            <div>
                <h1>News</h1>
                <List news={this.props.news}/>
            </div>
        );
    }
}

const stateToProps = ({game}) => {
    const {news} = game.status;
    return {
        news
    };
};
const dispatchToProps = () => {
    return {};
};
const News = connect(stateToProps, dispatchToProps)(NewsView);
export {News};