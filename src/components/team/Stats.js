import React, {Component} from 'react';
import {TEAM_NUMBER} from "../../const";
import {rangeArray} from "uvk";
import ApexCharts from 'apexcharts';


class Stats extends Component {
    componentDidMount() {
        const {stats} = this.props;
        if (!stats.positionTrend) {
            return;
        }
        const options = {
            chart: {
                height: 500,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            title: {
                text: ''
            },
            tooltip: {
                enabled: true,
                x: {
                    show: false
                }
            },
            stroke: {
                curve: 'straight'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            series: [
                {
                    name: 'Position',
                    data: stats.positionTrend.map(p => TEAM_NUMBER - p + 1),
                }
            ],
            xaxis: {
                categories: rangeArray(stats.positionTrend.length),
                title: {
                    text: 'Game Week'
                }
            },
            yaxis: {
                max: TEAM_NUMBER,
                min: 1,
                labels: {
                    formatter(value) {
                        return Math.round(TEAM_NUMBER - value + 1);
                    }
                },
                title: {
                    text: 'Table Position'
                }
            },
            dataLabels: {
                enabled: false
            },
        };

        const chart = new ApexCharts(
            document.querySelector("#chart"),
            options
        );

        chart.render();
    }

    render() {
        const {stats} = this.props;
        return (
            <div>
                <h1>Statistics</h1>
                {stats.positionTrend && (
                    <div>
                        <h2>Position Trend</h2>
                        <div id="chart"/>
                    </div>
                )
                }
            </div>
        );
    }
}

export {
    Stats
};
