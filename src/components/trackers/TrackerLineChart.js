import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

export default class TrackerLineChart extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    this.setState({
      data: this.buildData(this.props.entries)
    })
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: this.buildData(nextProps.entries)
    })
  }

  buildData(entries) {
    return {
      labels: entries.map(entry => entry.date),
      datasets: [
        {
          label: 'label-prop',
          fill: false,
          lineTension: 0.1,
          data: entries.map(entry => entry.count)
        }
      ]
    }
  }

  renderLoading() {
    return <div>Loading...</div>
  }

  renderError() {
    return <div>There's an error</div>
  }

  renderChart() {
    return <Line data={this.state.data} />
  }

  render() {
    if (this.props.loading) {
      return this.renderLoading()
    } else if (this.state.data) {
      return this.renderChart()
    } else {
      return this.renderError()
    }
  }
}