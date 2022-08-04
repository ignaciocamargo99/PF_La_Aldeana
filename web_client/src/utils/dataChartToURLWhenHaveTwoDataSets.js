export default function dataChartToURLWhenHaveTwoDataSets(dataChart) {

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
                    backgroundColor: ['rgba(255, 99, 132, 1)'],
                    data: dataChart.datasets[0].data,
                },
                {
                    label: dataChart.datasets[1].label,
                    backgroundColor: ['rgba(255, 206, 86, 1)'],
                    data: dataChart.datasets[1].data,
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
                        minSize: 8,
                        maxSize: 12
                    }
                }
            }
        }
    });

    return qc.getUrl();
}