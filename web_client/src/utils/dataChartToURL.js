export default function dataChartToURL(dataChart) {

    const QuickChart = require('quickchart-js/build/quickchart.cjs');
    const qc = new QuickChart();
    console.log(dataChart.datasets[0].data)

    qc.setConfig({
        type: dataChart.type,
        data: {
            labels: dataChart.labels,
            datasets: [
                {
                    label: dataChart.datasets[0].label,
                    backgroundColor: ['rgba(255, 99, 132, 1)','rgba(255, 206, 86, 1)','rgba(54, 162, 235, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)','rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)'],
                    data: dataChart.datasets[0].data,
                }
            ]
        },
        options: {
            plugins: {
                legend: false,
                outlabels: {
                    text: "%l %p",
                    color: "white",
                    stretch: 35,
                    font: {
                        resizable: true,
                        minSize: 12,
                        maxSize: 18
                    }
                }
            }
        }
    });

    return qc.getUrl();

    /*
        let url = `https://quickchart.io/chart?c={type:"${dataChart.type}",data:{labels:[`;
    
        dataChart.labels?.map((label, i) => {
            if (i + 1 < dataChart.labels.length) url += '"' + label + '",';
            else url += '"' + label + '"';
        });
    
        url += '], datasets:[{label:"' + dataChart.datasets[0].label + '"' + ",backgroundColor: ['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)','rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)'," +
            "'rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)']";
    
        url += ',data:[';
    
        dataChart.datasets[0].data?.map((data, i) => {
            if (i + 1 < dataChart.datasets[0].data.length) url += data + ",";
            else url += data;
        });
    
        url += ']}]}}';
        return url;
    */
}