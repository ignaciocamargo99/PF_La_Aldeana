export default function dataChartToURLv2(dataChart) {

    const QuickChart = require('quickchart-js/build/quickchart.cjs');
    const qc = new QuickChart();

    qc.setConfig({
        type: dataChart.type,
        data: {
            labels: dataChart.labels,
            datasets: dataChart.datasets
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
}