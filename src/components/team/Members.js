import React, {Component} from 'react';
import {Segment, Tab} from "semantic-ui-react";
import {Badge} from "./misc/Badge";
import {SimpleList, StatsList} from "../player";
import {Details as CoachDetails} from "../coach";
import {AdsFlag} from "../common";


class Members extends Component {
    render() {
        const {team} = this.props;
        const {coach = {}} = team;
        return (
            <div>
                <Badge colours={team.colours}/>
                <h1><AdsFlag name={team.nationality}/> {team.name}</h1>
                <Segment>
                    <h2>Coach</h2>
                    {coach && <CoachDetails coach={coach}/>}
                    {!coach && <h1>-</h1>}
                </Segment>
                <Segment>
                    <h2>Roster</h2>
                    <Tab
                        renderActiveOnly
                        panes={[
                            {
                                menuItem: 'Info',
                                render: () => <SimpleList roster={team.roster}/>
                            },
                            {
                                menuItem: 'Stats',
                                render: () => <StatsList roster={team.roster}/>
                            }
                        ]}
                    />

                </Segment>
            </div>
        );
    }
}

export {Members};
