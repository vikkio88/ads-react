import React, {Component} from 'react';
import {Icon, Segment, Accordion} from "semantic-ui-react";

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
                <Accordion.Title as="h4" active={active}
                                 onClick={played ? () => this.setState({active: !active}) : null}>
                    {played && <Icon name='dropdown'/>}
                    {`${match.home} - ${match.away}`}
                    <strong style={{marginLeft: '5px'}}>{`${match.homeGoal || 0} - ${match.awayGoal || 0}`}</strong>
                </Accordion.Title>
                {played && (
                    <Accordion.Content active={active}>
                        <Segment.Group horizontal>
                            {
                                ['home', 'away'].map(k => {
                                    return (
                                        <Segment key={k} style={{padding: 0, margin: 0}} basic>
                                            {
                                                this.formatScorers(match.scorers[k]).map((s, index) => (
                                                    <Segment key={index} style={{padding: 0, margin: 0}} basic>
                                                        {`${s.name}`}
                                                        {s.goals > 1 ? <strong>{` (x${s.goals})`}</strong> : null}
                                                    </Segment>
                                                ))
                                            }
                                        </Segment>
                                    );
                                })
                            }
                        </Segment.Group>
                    </Accordion.Content>
                )}
            </div>
        );
    }
}

export {ResultLine};