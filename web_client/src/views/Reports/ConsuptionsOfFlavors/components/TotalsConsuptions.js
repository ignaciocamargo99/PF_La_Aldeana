import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const TotalsConsuptions = (props) => {

  let [labels, setLabels] = useState([]);
  let [dat, setDat] = useState([]);
  let [consum, setConsum] = useState([]);


  useEffect(() => {
    let l = []
    let d = []
    let c = []

    props.totals?.forEach((e, i) => {
      l = [...l, e.month.slice(0,-3)]
      d = [...d, e.prod]
      c = [...c, e.consum]
    })

    setLabels(l)
    setDat(d)
    setConsum(c)
  }, [props.totals])

  const options = {
    indexAxis: 'y',
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'baldes producidos',
        data: dat,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
      {
        label: 'baldes consumidos',
        data: consum,
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <h2>Análisis de Consumo de Sabores de Helado (mes por baldes)</h2>
      <br/>
      <Bar data={data} options={options}/>
    </>
  );
}

export default TotalsConsuptions;