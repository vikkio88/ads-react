import React, {Component} from 'react';
import {connect} from "react-redux";
import {Dashboard, Mail, News, Calendar} from './';
import {navigate} from "../store/actions";

const componentMap = {
    'mail': <Mail/>,
    'news': <News/>,
    'calendar': <Calendar/>,
};


class MainScreenView extends Component {
    render() {
        const viewComponent = componentMap[this.props.view];

        if (viewComponent) {
            return (
                <div>
                    {viewComponent}
                    <a onClick={() => this.props.back()}>BACK</a>
                </div>
            );
        }


        return <Dashboard/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        back() {
            dispatch(navigate('dashboard'))
        }
    };
};
const mapStateToProps = ({navigation}) => {
    return {
        view: navigation.view
    }
};
const MainScreen = connect(mapStateToProps, mapDispatchToProps)(MainScreenView);
export {MainScreen};

