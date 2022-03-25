import { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';

const TopTenProductsSales = (props) => {
    let [labels, setLabels] = useState([]);
    let [dat, setDat] = useState([]);
    const chartRef = useRef();

    useEffect(()=>{
      let l = []
      let d = []
      props.topTenProductSales?.forEach((e)=>{
        l = [...l, e.name]
        d = [...d, e.quantity]
      })

      setLabels(l);
      setDat(d);
    }, [props.topTenProductSales])

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'número de unidades vendidas',
          data: dat,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    
    const options = {
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

    return (
        <>
            <h2>Top 10 productos más vendidos</h2>
            <Bar data={data} options={options} ref={chartRef}/>
        </>
    );
}

const mapStateToProps = state => {
  return {
      topTenProductSales: state.topTenProductSales
  }
}

export default connect(mapStateToProps)(TopTenProductsSales);