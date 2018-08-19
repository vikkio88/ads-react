import React from 'react';
import {List, Icon, Rating} from 'semantic-ui-react';
import {Badge} from "..";
import {valueToRating} from "../../../libs/utils";
import {teamHelper} from "../../../libs/helpers";


export const ShallowList = ({teams}) => (
    <List divided relaxed>
        {teams.map(t => (
            <List.Item key={t.id}>
                <List.Content floated="left">
                    <Badge colours={t.colours}/>
                </List.Content>
                <List.Content verticalAlign='top'>
                    <List.Header as='strong'>{t.name}</List.Header>
                    <List.Description as='a'>
                        <Rating
                            icon="star"
                            disabled
                            defaultRating={valueToRating(teamHelper.averageSkill(t))}
                            maxRating={5}
                        />
                    </List.Description>
                </List.Content>
            </List.Item>
        ))}
    </List>
);
