import React, {Component} from 'react';
import {Accordion, Card, Icon, List} from "semantic-ui-react";
import moment from "moment";
import {DATE_FORMAT} from "../../../const";

class Result extends Component {
    state = {activeIndex: -1};
    handleClick = (e, titleProps) => {
        const {index} = titleProps;
        const {activeIndex} = this.state;
        const newIndex = activeIndex === index ? -1 : index;
        this.setState({activeIndex: newIndex})
    };

    formatScorers(scorers) {
        const formattedScorers = {};
        scorers.forEach(s => {
            const playerKey = `${s.name} ${s.surname}`;
            formattedScorers[playerKey] = formattedScorers[playerKey]
                ? formattedScorers[playerKey] + 1 : 1
        });
        return Object.keys(formattedScorers).map(name => {
            return {
                name,
                goals: formattedScorers[name]
            }
        })
    }

    render() {
        const {activeIndex} = this.state;
        const {results = null, matches, date, index, played} = this.props.result;
        const matchRows = results || matches;
        return (
            <Card fluid>
                <h3>Round {index + 1} - {`${moment(date).format(DATE_FORMAT)}`}</h3>
                <Accordion styled fluid>
                    {matchRows.map((m, index) => (
                        <div key={index}>
                            <Accordion.Title active={activeIndex === index} onClick={this.handleClick} index={index}>
                                {played && <Icon name='dropdown'/>}
                                {`${m.home} - ${m.away}`} <strong>{`${m.homeGoal || 0} - ${m.awayGoal || 0}`}</strong>
                            </Accordion.Title>
                            {played && (
                                <Accordion.Content active={activeIndex === index}>
                                    <List bulleted>
                                        {
                                            this.formatScorers(m.scorers.home).map((s, index) => (
                                                <List.Item key={index}>
                                                    {`${s.name}${s.goals > 1 ? ` (x${s.goals})` : ''} - ${m.home}`}
                                                </List.Item>
                                            ))
                                        }
                                        {
                                            this.formatScorers(m.scorers.away).map((s, index) => (
                                                <List.Item key={index}>
                                                    {`${s.name}${s.goals > 1 ? ` (x${s.goals})` : ''} - ${m.away}`}
                                                </List.Item>
                                            ))
                                        }
                                    </List>
                                </Accordion.Content>
                            )}
                        </div>
                    ))}
                </Accordion>
            </Card>
        );
    }
}

export {Result};