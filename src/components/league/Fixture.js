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
        return (
            <Tab
                renderActiveOnly
                panes={
                    [
                        {
                            menuItem: 'Played',
                            render: () => fixture.filter(f => f.played).reverse().map(f => <Result key={f.index}
                                                                                                   result={f}/>)
                        },
                        {
                            menuItem: 'Coming up',
                            render: () => fixture.filter(f => !f.played).map(f => <Result key={f.index}
                                                                                          result={f}/>)
                        }
                    ]
                }
            />
        );
    }
}

export {Fixture};
