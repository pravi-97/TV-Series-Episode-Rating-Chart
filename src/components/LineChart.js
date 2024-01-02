import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function LineChart() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const value = params.get("value");
    const api = params.get("api");

    const [chartData, setChartData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [chartInstance, setChartInstance] = useState(null);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        const lambda = `https://yiebcdl91b.execute-api.ap-south-1.amazonaws.com/prod/?param1=`;

        if (chartInstance) {
            chartInstance.destroy();
        }

        fetch(`${lambda}${api}&param2=` + value)
            .then((response) => response.json())
            .then((data) => {
                const ratingArray = data.ratingArray;
                const nameArray = data.nameArray;
                const overViewArray = data.overViewArray;
                if (ratingArray === undefined || nameArray === undefined || overViewArray === undefined){
                    setIsError(true);
                }
                let ttValue = '';
                const transformedData = {
                    labels: nameArray,
                    datasets: [
                        {
                            label: "Rating",
                            data: ratingArray,
                            backgroundColor: "rgba(75, 192, 192, 0.6)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        },
                    ],
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function (tooltipItem) {
                                        const dataIndex = tooltipItem.dataIndex;
                                        const label = overViewArray[dataIndex];
                                        ttValue = tooltipItem.parsed.y;
                                        return label;
                                    },
                                    afterBody: function (tooltipItems) {
                                        const rText = "Rating: " + ttValue;
                                        return rText;
                                    },
                                },
                                display: true,
                                cornerRadius: 20,
                                boxHeight: 0,
                                boxWidth: 0,
                            },
                        },
                    },
                };

                setChartInstance(null); // Clear previous chart instance reference
                setChartData(transformedData);
                setIsPending(false);
                window.location.href = '#my-chart';
            })
            .catch((error) => {
                setIsPending(false);
                console.error(error);
            });

        // Cleanup: Destroy chart instance when component unmounts
        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [api, value]);

    if (isPending) {
        return <p>Loading...</p>;
    }
    else if (isError){
        return <p>Error</p>;
    }
    return chartData ? <Line id="my-chart" data={chartData} options={chartData.options} /> : null;
}

export default LineChart;
