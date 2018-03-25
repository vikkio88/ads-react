import React, {Component} from 'react';
import {Button, Table} from "semantic-ui-react";
import {connect} from "react-redux";
import {navigatePush} from "../../store/actions/navigation";
import {setNewsAsRead} from "../../store/actions/game";

class ListView extends Component {
    render() {
        const {news, readNews} = this.props;
        return (
            <Table celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>NewsPaper</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {news.map(n => (
                        <Table.Row key={n.id} positive={!n.read}>
                            <Table.Cell collapsing>
                                {n.date}
                            </Table.Cell>
                            <Table.Cell>{n.title}</Table.Cell>
                            <Table.Cell>
                                {n.newspaper}
                            </Table.Cell>
                            <Table.Cell>
                                <Button
                                    icon="newspaper"
                                    onClick={() => readNews(n)}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        );
    }
}


const stateToProps = () => {
    return {};
};
const dispatchToProps = dispatch => {
    return {
        readNews(news) {
            dispatch(setNewsAsRead(news));
            //dispatch(navigatePush('readNews', news));
        }
    };
};
const List = connect(stateToProps, dispatchToProps)(ListView);
export {List};