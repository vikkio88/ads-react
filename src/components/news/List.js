import React from 'react';
import {Table} from "semantic-ui-react";

const List = ({news}) => (
    <Table celled padded>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>NewsPaper</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {news.map(n => (
                <Table.Row key={n.id}>
                    <Table.Cell>{n.date}</Table.Cell>
                    <Table.Cell>{n.title}</Table.Cell>
                    <Table.Cell>{n.newspaper}</Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table>
);

export {List};