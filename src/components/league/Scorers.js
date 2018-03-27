import React, {Component} from 'react';


class Scorers extends Component {
    render() {
        return <pre>{JSON.stringify(this.props.scorers)}</pre>;
    }
}

export {Scorers}