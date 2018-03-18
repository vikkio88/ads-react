import React, {Component} from 'react';
import {AdsFlag, ValueLine} from "../common";

class Details extends Component {
    render() {
        const {coach} = this.props;
        return (
            <ValueLine.Group>
                <ValueLine label="Name" value={`${coach.name} ${coach.surname}`}/>
                <ValueLine label="Nationality" value={(<AdsFlag name={coach.nationality}/>)}/>
                <ValueLine label="Age" value={coach.age}/>
                <ValueLine label="Skill" value={coach.skill}/>
                <ValueLine label="Module" value={coach.module}/>
            </ValueLine.Group>
        );
    }
}

export {Details};