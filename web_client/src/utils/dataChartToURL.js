export default function dataChartToURL(dataChart) {

    const QuickChart = require('quickchart-js/build/quickchart.cjs');
    const qc = new QuickChart();

    //qc.setWidth(800);
    //qc.setHeight(900);

    qc.setConfig({
        type: dataChart.type,
        data: {
            labels: dataChart.labels,
            datasets: [
                {
                    label: dataChart.datasets[0].label,
                    backgroundColor: ['rgba(255, 99, 132, 1)','rgba(255, 206, 86, 1)','rgba(54, 162, 235, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)','rgba(255, 99, 132, 0.7)','rgba(54, 162, 235, 0.7)','rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)','rgba(153, 102, 255, 0.7)','rgba(255, 159, 64, 0.7)'],
                    data: dataChart.datasets[0].data,
                }
            ]
        },
        options: {
            plugins: {
                legend: dataChart.legend?dataChart.legend:false,
                outlabels: {
                    text: "%l %p",
                    color: "white",
                    stretch: 35,
                    font: {
                        resizable: true,
                        minSize: 8,
                        maxSize: 12
                    }
                }
            }
        }
    });

    return qc.getUrl();
}