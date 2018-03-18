import React from 'react';
import {Table} from "semantic-ui-react";

const ValueLine = ({label, value}) => (
    <Table.Row>
        <Table.Cell>
            {label}
        </Table.Cell>
        <Table.Cell>
            {typeof value === 'object' ? value : <h2>{`${value}`}</h2>}
        </Table.Cell>
    </Table.Row>
);

ValueLine.Group = ({children}) => (
    <Table definition>
        <Table.Body>
            {children}
        </Table.Body>
    </Table>
);


export {ValueLine};