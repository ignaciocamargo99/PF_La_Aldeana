import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';

const TypeProductsSales = (props) => {

    let [labels, setLabels] = useState([]);
    let [dat, setDat] = useState([]);


    useEffect(()=>{
      let l = []
      let d = []
      props.typeProductSales.types?.forEach((e)=>{
        l = [...l, e.id]
        d = [...d, e.quantity]
      })

      setLabels(l)
      setDat(d)
    }, [props.typeProductSales.types])

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'número de ventas',
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
    
    return (
        <>
            <h2>Ventas por tipo de producto</h2>
            <Pie data={data} />
        </>
    );
}


const mapStateToProps = state => {
  return {
      typeProductSales: state.typeProductSales
  }
}

export default connect(mapStateToProps)(TypeProductsSales);