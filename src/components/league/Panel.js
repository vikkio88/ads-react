import React, {Component} from 'react';
import {Table} from "./Table";
import {Scorers} from "./Scorers";
import {Divider} from "semantic-ui-react";


class Panel extends Component {
    render() {
        const {league, table, scorers} = this.props;
        return (
            <div>
                <Table league={league} teams={table}/>
                <Divider/>
                <Scorers scorers={scorers}/>
            </div>
        );
    }
}

export {Panel}