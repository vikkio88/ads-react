import React, {Component} from 'react';
import {Result} from "./match";

class Fixture extends Component {
    render() {
        const {fixture} = this.props;
        if (!fixture.length) {
            return <h3>No Fixture available yet</h3>;
        }
        return fixture.map(f => <Result key={f.index} result={f}/>);
    }
}

export {Fixture};