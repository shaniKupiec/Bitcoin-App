import { React, useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

import { loadDynamicRate } from "../store/actions/dataActions";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function RatePreview(props) {
  const [data, setData] = useState(null);
  const [madeProfit, setMadeProfit] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [currentVal, setCurrentVal] = useState(0);

  const { name, shortName, imgSrc, days } = props;
  const dispatch = useDispatch();
  const { dynamicRates } = useSelector((state) => state.dataModule);

  useEffect(() => {
    dispatch(loadDynamicRate(shortName, days));
  }, []);

  useEffect(() => {
    dispatch(loadDynamicRate(shortName, days));
  }, [days]);

  useEffect(() => {
    loadRates();
  }, [dynamicRates]);

  const loadRates = async () => {
    let x = dynamicRates[shortName + "-" + days];
    if(!x) return
    const previewsValue = x[0].value;
    const todaysValue = x[x.length - 1].value;
    const madeProfitToChange = todaysValue > previewsValue;
    setMadeProfit(madeProfitToChange);
    setCurrentVal(formatNum(todaysValue));

    let percentageToChange = (Math.abs(previewsValue - todaysValue) / (previewsValue ? previewsValue : 1)) * 100;
    percentageToChange = percentageToChange.toFixed(2);
    setPercentage(percentageToChange);

    let divedBy;
    switch (days) {
      case 30:
        divedBy = 2;
        break;
      case 150:
        divedBy = 10;
        break;
      case 365:
        divedBy = 25;
        break;
      case 1825:
        divedBy = 100;
        break;
      default:
        divedBy = 1;
        break;
    }
    x = x.filter((_, idx) => idx % divedBy === 0);

    const dataToChange = {
      labels: x.map((x) => x.name),
      datasets: [
        {
          label: "",
          data: x.map((x) => x.value),
          borderColor: madeProfitToChange ? "rgb(0, 197, 102)" : "rgb(255, 64, 59)",
          backgroundColor: madeProfitToChange ? "rgb(0, 197, 102, 0.5)" : "rgb(255, 64, 59, 0.5)",
        },
      ],
    };

    setData(dataToChange);
  };

  const formatNum = (rate) => {
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return formatter.format(rate.toFixed(2));
  };

  const options = {
    responsive: true,
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
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  if (!data) return <div>Loading...</div>;
  return (
    <section className="rate__preview">
      <img src={imgSrc} alt="" className="rate__preview__icon" />
      <div className="rate__preview__name">
        <span className="full-name">{name}</span>
        <span className="short-name">{shortName}</span>
      </div>
      <div className="rate__preview__chart">
        <Line options={options} data={data} />
      </div>
      <div className="rate__preview__value">
        <span className="value">{currentVal}</span>
        <span className={`percentage ${madeProfit ? "madeProfit" : ""}`} >{percentage + "%"}</span>
      </div>
    </section>
  );
}

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
