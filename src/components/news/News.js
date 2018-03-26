import React, {Component} from 'react';
import {connect} from "react-redux";

class NewsView extends Component {
    render() {
        const {news} = this.props;
        return (<h1>{news.title}</h1>);
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