import React, {Component} from 'react';
import {AdsFlag, ValueLine} from "../common";
import {valueToRating, formatCurrency} from "../../libs/utils";
import {Rating} from "semantic-ui-react";
import {CURRENCY_MODIFIERS} from "../../const";

class Details extends Component {
    render() {
        const {player, job, team/*,history*/} = this.props;
        console.log(this.props);
        return (
            <div>
                <h1>Your Profile</h1>
                <ValueLine.Group>
                    <ValueLine label="Name" value={`${player.name} ${player.surname}`}/>
                    <ValueLine label="Nationality" value={(<AdsFlag name={player.nationality}/>)}/>
                    <ValueLine
                        label="Fame"
                        value={(
                            <Rating
                                icon="star"
                                disabled
                                defaultRating={valueToRating(player.fame, 100, 10)}
                                maxRating={10}
                            />
                        )}/>
                </ValueLine.Group>
                <ValueLine.Group>
                    <ValueLine label="Current Team" value={team || '-'}/>
                    {job && <ValueLine label="Contract ends" value={job.wage}/>}
                    {job && <ValueLine label="Wage" value={formatCurrency(job.wage * CURRENCY_MODIFIERS.THOUSANDS)}/>}
                    {/*Remember that you have history to put in here*/}
                </ValueLine.Group>

            </div>
        );
    }
}

export {Details};
