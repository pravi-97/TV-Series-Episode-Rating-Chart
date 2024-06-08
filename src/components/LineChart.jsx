import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AgChartsReact } from "ag-charts-react";

function LineChart() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const value = params.get("value");
  const api = params.get("api");

  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  const [options, setOptions] = useState(null);

  useEffect(() => {

    function renderer(params) {
      return `<div class="ag-chart-tooltip-title" id="chart-tooltip" style="background-color: ${
        params.color
      }">
      <div id="tooltip-hover" class="tooltip-hover">
      ${params.datum[params.xKey]}
        </div>
      </div>
      <div class="ag-chart-tooltip-content" id="tooltip-hover-content">
          ${params.datum[params.yName]}
      </div>`;
    }

    const lambda = `https://evnybizsck.execute-api.ap-south-1.amazonaws.com/prod?param1=`;
    setIsPending(true);
    fetch(`${lambda}${api}&param2=` + value)
      .then((response) => response.json())
      .then((data) => {
        const ratingArray = data.ratingArray;
        const nameArray = data.nameArray;
        const overViewArray = data.overViewArray;
        const newArr = ratingArray.map((rating, index) => ({
          rating: rating,
          name: nameArray[index],
          overview: overViewArray[index],
        }));
        if (
          ratingArray === undefined ||
          nameArray === undefined ||
          overViewArray === undefined
        ) {
          setIsError(true);
        } else {
          setOptions({
            data: newArr,
            title: {
              text: "Rating",
            },
            series: [
              {
                type: "line",
                xKey: "name",
                yKey: "rating",
                yName: "overview",
                tooltip: {
                  renderer,
                  interaction: {
                    enabled: true,
                  },
                  position: {
                    type: "pointer",
                  }
                },
              },
            ],
            axes: [
              {
                type: 'number',
                position: 'left',
                min: 0,
              },
              {
                type: 'category',
                position: 'bottom',
              },
            ],
            background: {
              fill: "white",
            },
          })
          console.log("Line options: ", options);
          setIsPending(false);
        }
      })
      .catch((error) => {
        setIsPending(false);
        console.error(error);
      });

      window.location.href = '#my-chart';
  }, [api, value]);

  if (isError) {
    return <p>Error</p>;
  }
  return (
    <div>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <div className="container-fluid" id="my-chart" style={{ height: '100vh', width: '100%' }}>
          <AgChartsReact options={options} />
        </div>
      )}
    </div>
  );
}

export default LineChart;