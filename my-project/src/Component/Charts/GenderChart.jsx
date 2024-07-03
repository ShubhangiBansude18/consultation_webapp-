import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryLabel } from "victory";
import fetchDataAndProcess from "../FetchData/FetchData";

export const GenderChart = () => {
  const [genderData, setGenderData] = useState([]);
  const [colorScale, setColorScale] = useState([
    "purple",
    "pink",
    "gold",
    "cyan",
    "navy",
  ]);

  useEffect(() => {
    const fetchGenderData = async () => {
      // Assumed fetchDataAndProcess provides { x: "Category", y: count } structure
      const data = await fetchDataAndProcess(
        "https://65e40f7388c4088649f63c58.mockapi.io/kayaadmin/users",
        "gender"
      );
      setGenderData(data);
    };

    fetchGenderData();
  }, []);

  // Calculate the total count
  const getTotalCount = () => {
    return genderData.reduce((acc, item) => acc + item.y, 0);
  };

  // Calculate the percentage
  const getPercentage = (count) => {
    const totalCount = getTotalCount();
    return totalCount > 0 ? `${((count / totalCount) * 100).toFixed(1)}%` : "";
  };

  return (
    <div className="chart-container w-60 border-[1px] border-black rounded-xl mx-auto">
      <div className="chart-title p-2 text-center">Gender Distribution</div>
      <div className="chart">
        <VictoryPie
          colorScale={colorScale}
          data={genderData.map((item) => ({
            x: item.x,
            y: item.y,
            label: getPercentage(item.y),
          }))}
          labelComponent={
            <VictoryLabel style={{ fill: "white", fontSize: "15px" }} />
          }
          labelRadius={({ innerRadius }) => innerRadius + 70}
          style={{
            parent: { hidth: "250px", height: "250px" },
          }}
        />
        <div className="legend ml-2">
          {genderData.map((item, index) => (
            <div key={index} className="legend-item flex items-center mb-1">
              <div
                className="legend-color w-4 h-4 rounded-full mr-2"
                style={{
                  backgroundColor: colorScale[index % colorScale.length],
                }}
              ></div>
              <span className="text-sm">{item.x}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
