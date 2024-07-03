import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryLabel } from "victory";
import fetchDataAndProcess from "../FetchData/FetchData";

export const ImmigrationTypeChart = () => {
  const [immigrationData, setImmigrationData] = useState([]);
  const [colorScale, setColorScale] = useState([
    "navy",
    "skyblue",
    "gold",
    "cyan",
    "navy",
  ]);

  useEffect(() => {
    const fetchImmigrationData = async () => {
      const data = await fetchDataAndProcess(
        "https://65e40f7388c4088649f63c58.mockapi.io/kayaadmin/users",
        "immigration_service"
      );
      setImmigrationData(data);
    };

    fetchImmigrationData();
  }, []);

  // Calculate the total count
  const getTotalCount = () => {
    return immigrationData.reduce((acc, item) => acc + item.y, 0);
  };

  // Calculate the percentage
  const getPercentage = (count) => {
    const totalCount = getTotalCount();
    return ((count / totalCount) * 100).toFixed(2);
  };

  return (
    <div className="chart-container w-60 border-[1px] border-black rounded-xl">
      <div className="chart-title p-2">Immigration Type</div>
      <div className="chart">
        <VictoryPie
          colorScale={colorScale}
          data={immigrationData}
          labelRadius={({ innerRadius }) => innerRadius + 80} // Tune this to position labels inside slices
          style={{
            labels: { fill: "white", fontSize: 15, fontWeight: "bold" }, // Adjust label styles as needed
            parent: { width: "250px", height: "250px" },
          }}
          labelComponent={
            <VictoryLabel text={({ datum }) => `${getPercentage(datum.y)}%`} />
          }
        />
        <div className="legend">
          {immigrationData.map((item, index) => (
            <div key={index} className="legend-item flex gap-2 ml-2">
              <div
                className="legend-color w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: colorScale[index] }}
              ></div>
              <span className="ml-2 text-sm">{item.x}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
