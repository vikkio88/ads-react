import React, {Component} from 'react';
import {Icon, List, Accordion} from "semantic-ui-react";

class ResultLine extends Component {
    state = {
        active: false
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
        const {active} = this.state;
        const {played, match} = this.props;
        return (
            <div>
                <Accordion.Title active={active} onClick={() => this.setState({active: !active})}>
                    {played && <Icon name='dropdown'/>}
                    {`${match.home} - ${match.away}`}
                    <strong>{`${match.homeGoal || 0} - ${match.awayGoal || 0}`}</strong>
                </Accordion.Title>
                {played && (
                    <Accordion.Content active={active}>
                        <List bulleted>
                            {
                                this.formatScorers(match.scorers.home).map((s, index) => (
                                    <List.Item key={index}>
                                        {`${s.name}${s.goals > 1 ? ` (x${s.goals})` : ''} - ${match.home}`}
                                    </List.Item>
                                ))
                            }
                            {
                                this.formatScorers(match.scorers.away).map((s, index) => (
                                    <List.Item key={index}>
                                        {`${s.name}${s.goals > 1 ? ` (x${s.goals})` : ''} - ${match.away}`}
                                    </List.Item>
                                ))
                            }
                        </List>
                    </Accordion.Content>
                )}
            </div>
        );
    }
}

export {ResultLine};