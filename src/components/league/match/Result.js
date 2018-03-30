import React, {Component} from 'react';
import {Accordion, Card} from "semantic-ui-react";
import moment from "moment";
import {DATE_FORMAT} from "../../../const";
import {ResultLine} from "./ResultLine";

class Result extends Component {
    render() {
        const {results = null, matches, date, index, played} = this.props.result;
        const matchRows = results || matches;
        return (
            <Card fluid>
                <h3>Round {index + 1} - {`${moment(date).format(DATE_FORMAT)}`}</h3>
                <Accordion styled fluid>
                    {matchRows.map((m, index) => <ResultLine key={index} match={m} played={played}/>)}
                </Accordion>
            </Card>
        );
    }
}

export {Result};