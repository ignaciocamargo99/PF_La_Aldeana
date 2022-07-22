import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

const Consuptions = (props) => {

  let [labels, setLabels] = useState([]);
  let [dat, setDat] = useState([]);


  useEffect(() => {
    let l = []
    let d = []

    props.totals?.forEach((e, i) => {
      if (i < 3 || i === 4){
        l = [...l, e.name]
        d = [...d, e.consum]
      }
    })

    setLabels(l)
    setDat(d)
  }, [props.totals])

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'baldes consumidos',
        data: dat,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(25, 99, 132, 0.2)',
          'rgba(5, 162, 235, 0.2)',
          'rgba(25, 206, 86, 0.2)',
          'rgba(7, 192, 192, 0.2)',
          'rgba(13, 102, 255, 0.2)',
          'rgba(25, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(25, 99, 132, 1)',
          'rgba(5, 162, 235, 1)',
          'rgba(25, 206, 86, 1)',
          'rgba(7, 192, 192, 1)',
          'rgba(13, 102, 255, 1)',
          'rgba(25, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <h2>Análisis de Consumo (por baldes)</h2>
      <br/>
      <Pie data={data} />
    </>
  );
}

export default Consuptions;