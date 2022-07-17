import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

const TotalsStock = (props) => {

  let [labels, setLabels] = useState([]);
  let [dat, setDat] = useState([]);


  useEffect(() => {
    let l = []
    let d = []
    props.totals?.forEach((e, i) => {
      if (i < 3 || i === 4){
        l = [...l, e.id]
        d = [...d, e.quantity]
      }
    })

    setLabels(l)
    setDat(d)
  }, [props.totals])

  const data = {
    labels: labels,
    datasets: [
      {
        label: '$',
        data: dat,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <h2>Análisis de stock de sabores de helados</h2>
      <br/>
      <Pie data={data} />
    </>
  );
}

export default TotalsStock;