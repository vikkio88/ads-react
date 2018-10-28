import React from 'react';
import {ResultLine} from "../../league/match";
import {Accordion} from "semantic-ui-react";

const MatchResult = ({payload}) => (
    <Accordion styled fluid style={{fontSize: '16px'}}>
        {payload.data.map((r, index) => <ResultLine key={index} match={r} played/>)}
    </Accordion>
);

export {MatchResult};
