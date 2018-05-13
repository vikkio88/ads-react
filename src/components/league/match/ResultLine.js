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
            <div style={active ? {backgroundColor: '#f9f9f9'} : null}>
                <Accordion.Title active={active} onClick={played ? () => this.setState({active: !active}) : null}>
                    {played && <Icon name='dropdown'/>}
                    {`${match.home} - ${match.away}`}
                    <strong style={{marginLeft: '5px'}}>{`${match.homeGoal || 0} - ${match.awayGoal || 0}`}</strong>
                </Accordion.Title>
                {played && (
                    <Accordion.Content active={active}>
                        <List>
                            {
                                ['home', 'away'].map(k => {
                                    return this.formatScorers(match.scorers[k]).map((s, index) => (
                                        <List.Item key={index} as='li' value='-'>
                                            {`${s.name}${s.goals > 1 ? ` (x${s.goals})` : ''}`} - <strong>{`${match[k]}`}</strong>
                                        </List.Item>
                                    ))
                                })
                            }
                        </List>
                    </Accordion.Content>
                )}
            </div>
        );
    }
}

export {ResultLine};