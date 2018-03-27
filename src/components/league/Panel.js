import React, {Component} from 'react';
import {Table} from "./Table";
import {Scorers} from "./Scorers";


class Panel extends Component {
    render() {
        const {table, scorers} = this.props;
        return (
            <div>
                <Table teams={table}/>
                <Scorers scorers={scorers}/>
            </div>
        );
    }
}

export {Panel}