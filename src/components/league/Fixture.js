import React, {Component} from 'react';
import {Tab} from 'semantic-ui-react';
import {Result} from "./match";
import {Empty} from "../common";

class Fixture extends Component {
    render() {
        const {fixture} = this.props;
        if (!fixture.length) {
            return <Empty icon="calendar" text="No Fixtures available yet"/>;
        }
        const played = fixture.filter(f => f.played).reverse();
        const toPlay = fixture.filter(f => !f.played);
        const panes = [];
        if (played.length) {
            panes.push(
                {
                    menuItem: 'Played',
                    render: () => played.map(f => <Result key={f.index} result={f}/>)
                }
            );
        }
        panes.push(
            {
                menuItem: 'Coming up',
                render: () => toPlay.map(f => <Result key={f.index} result={f}/>)
            }
        );

        return <Tab renderActiveOnly panes={panes}/>;
    }
}

export {Fixture};
