import React, {Component} from 'react';
import {VictoryChart, VictoryLine, VictoryLabel, VictoryAxis} from 'victory'
import {TEAM_NUMBER} from "../../const";

class Stats extends Component {
    render() {
        const {stats} = this.props;
        const ROUND_NUMBER = (TEAM_NUMBER * 2) - 2;
        return (
            <div>
                <h1>Statistics</h1>
                {stats.positionTrend && (
                    <div>
                        <h2>Position Trend</h2>
                        <VictoryChart>
                            <VictoryLine
                                domain={{x: [1, ROUND_NUMBER], y: [1, 18]}}
                                style={{
                                    data: {stroke: 'orange'}
                                }}
                                labels={d => d[1]}
                                labelComponent={<VictoryLabel renderInPortal style={{fontSize: '6px'}} dy={-2}/>}
                                data={stats.positionTrend.map((p, i) => [i + 1, p])}
                                x={0}
                                y={d => TEAM_NUMBER - d[1] + 1}
                            />
                            <VictoryAxis
                                crossAxis
                                label="Rounds"
                                tickValues={[1, ROUND_NUMBER / 2, ROUND_NUMBER]}
                                style={{
                                    tickLabels: {fontSize: 5, padding: 5},
                                    axisLabel: {fontSize: 8, padding: 10},
                                }}
                            />
                        </VictoryChart>
                    </div>
                )}
            </div>
        );
    }
}

export {Stats};