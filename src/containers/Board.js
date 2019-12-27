import React, { Component } from 'react';
import styled from 'styled-components';
import withDataFetching from '../withDataFetching';
import Lane from '../components/Lane/Lane';

const BoardWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin: 5%;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

class Board extends Component {

    constructor() {
        super();
        this.state = {
            tickets: []
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({ tickets: this.props.data })
        }
    }

    onDragStart = (e, id) => {
        e.dataTransfer.setData('id', id);
    }

    onDragOver = e => {
        e.preventDefault();
    }

    onDrop = (e, laneId) => {
        const id = e.dataTransfer.getData('id');
        console.log(id, laneId);
        const tickets = [...this.state.tickets];
        const ticketToChangeIndex = tickets.findIndex(ticket => ticket.id == id);
        tickets[ticketToChangeIndex].lane = laneId;
        this.setState({ tickets: tickets });
        // const tickets = this.state.tickets.filter(ticket => {
        //     if (ticket.id === id) {
        //         console.log(id);
        //         ticket.lane = laneId;
        //     }
        //     console.log(ticket);
            
        //     return ticket;
        // });
        // console.log(tickets);
        
        // this.setState({
        //     tickets: tickets
        // });
    }

    render() {
        const { loading, error, lanes } = this.props;

        return (
            <BoardWrapper>
                {lanes.map(lane => <Lane
                    key={lane.id}
                    title={lane.title}
                    loading={loading}
                    error={error}
                    laneId={lane.id}
                    onDragStart={this.onDragStart}
                    onDragOver={this.onDragOver}
                    onDrop={this.onDrop}
                    tickets={this.state.tickets.filter(ticket => ticket.lane === lane.id)}
                />)}
            </BoardWrapper>
        );
    }
}

export default withDataFetching(Board);
