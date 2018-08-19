import React from 'react';
import {Header, Icon} from 'semantic-ui-react';
import './Empty.css';

export const Empty = ({icon, text = 'No Data', as = 'h2'}) => (
    <Header as={as} className="emptyWrapper">
        <Icon name={icon} circular/>
        <Header.Content>{text}</Header.Content>
    </Header>
);
