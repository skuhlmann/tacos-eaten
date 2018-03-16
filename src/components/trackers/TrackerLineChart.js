import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class TrackerLineChart extends Component {
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
      labels: this.sorted(entries).map(entry => entry.date),
      datasets: [
        {
          label: this.props.title,
          fill: false,
          lineTension: 0.1,
          data: this.sorted(entries).map(entry => entry.count)
        }
      ]
    }
  }

  sorted(entries) {
    return entries.sort((a,b) => {
      let aNum = parseInt(a.date.replace(/-/g, ''), 10)
      let bNum = parseInt(b.date.replace(/-/g, ''), 10)
      return aNum - bNum
    })
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

export default TrackerLineChart