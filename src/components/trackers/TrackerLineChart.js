import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

export default class TrackerLineChart extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    let entryData = this.buildData(this.props.entries)
    let labels = this.buildLabels(this.props.entries)

    let data = {
      labels: labels,
      datasets: [
        {
          label: 'label-prop',
          fill: false,
          lineTension: 0.1,
          data: entryData
        }
      ]
    }

    this.setState({data: data})
  }
  
  componentWillReceiveProps(nextProps) {
    let entryData = this.buildData(nextProps.entries)
    let labels = this.buildLabels(nextProps.entries)

    let data = {
      labels: labels,
      datasets: [
        {
          label: 'label-prop',
          fill: false,
          lineTension: 0.1,
          data: entryData
        }
      ]
    }
    this.setState({data: data})
  }

  buildLabels(entries) {
    return entries.map(entry => entry.date)
  }

  buildData(entries) {
    return entries.map(entry => entry.count)
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