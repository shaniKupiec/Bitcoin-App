import { React, Component } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

import cryptoService from "../services/crypto.service";
import dynamicService from "../services/dynamicHistoryRate.service";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export class Chart extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    this.loadRates();
  }

  loadRates = async () => {
    // const x = await cryptoService.exchangeHistoryBTC();
    const x = await dynamicService.dynamicRate();
    // console.log("x", x);

    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Dataset 1",
          data: x,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };

    this.setState({ data });
  };

  options = {
    responsive: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
      },
    },
  };

  // loadDataMarketPrice = async () => {
  //   const data = await cryptoService.getMarketPrice()
  //   var newData = []
  //   data.forEach((element) => {
  //     // newData.push(element.x)
  //     newData.push(element.y)
  //   })
  //   this.setState({ MPdata: newData })
  // }

  // loadDataConfirmedTransactions = async () => {
  //   const data = await cryptoService.getConfirmedTransactions()
  //   var newData = []
  //   data.forEach((element) => {
  //     // newData.push(element.x)
  //     newData.push(element.y)
  //   })
  //   this.setState({ CTdata: newData })
  // }

  render() {
    const { data } = this.state;
    // const { title, data, description, color } = this.props
    if (!data) return <div>Loading...</div>;
    return (
      <section>
        <div>hi</div>
        <Line options={this.options} data={data} />
        {/* <div className="chart">
          <h1>{title}</h1>
          <h4>{description}</h4>
        {data === 'marketPrice' && (
            <Sparklines data={MPdata} margin={6}>
              <SparklinesLine style={{ strokeWidth: 3, stroke: '#336aff', fill: { color } }} />
              <SparklinesSpots size={4} style={{ stroke: '#336aff', strokeWidth: 3, fill: { color } }} />
            </Sparklines>
        )}
        {data === 'confirmedTransactions' && (
            <Sparklines data={CTdata}>
              <SparklinesBars color={color} />
            </Sparklines>
            )}
        </div> */}
      </section>
    );
  }
}
