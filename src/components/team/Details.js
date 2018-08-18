import React, {Component} from 'react';
import {connect} from "react-redux";
import {Tab} from "semantic-ui-react";
import {Members} from "./Members";
import {Stats} from "./Stats";

class DetailsView extends Component {

    getTabs({team, stats}) {
        return [
            {
                menuItem: "Team", render: () => (
                    <Tab.Pane style={{overflowY: 'auto', whiteSpace: 'nowrap'}}>
                        <Members team={team}/>
                    </Tab.Pane>
                )
            },
            {
                menuItem: "Stats", render: () => (
                    <Tab.Pane style={{overflowY: 'auto', whiteSpace: 'nowrap'}}>
                        <Stats team={team.name} stats={stats}/>
                    </Tab.Pane>
                )
            },
        ];
    }

    render() {
        const {team} = this.props;
        const {stats = {}} = team;
        const tabs = this.getTabs({team, stats});
        return <Tab menu={{pointing: true}} panes={tabs}/>;
    }
}

const stateToProps = ({navigation}) => {
    const {payload} = navigation;
    return {
        team: payload
    }
};
const dispatchToProps = () => {
    return {};
};
const Details = connect(stateToProps, dispatchToProps)(DetailsView);
export {Details};
