import React, {Component} from 'react';
import {Result} from "./match";

class Fixture extends Component {
    render() {
        const {fixture} = this.props;
        return fixture.map(f => <Result key={f.index} result={f}/>);
    }
}

export {Fixture};