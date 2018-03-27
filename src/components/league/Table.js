import React, {Component} from 'react';


class Table extends Component {
    render() {
        return <pre>{JSON.stringify(this.props.teams)}</pre>;
    }
}

export {Table};