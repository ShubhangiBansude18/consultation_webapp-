import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryLabel } from "victory";

export const AgeGroupChart = () => {
  const [ageData, setAgeData] = useState([]);
  const [colorScale, setColorScale] = useState([
    "gold",
    "red",
    "navy",
    "tomato",
    "orange",
  ]);

  useEffect(() => {
    const fetchDataAndProcess = async () => {
      try {
        const response = await fetch(
          "https://65e40f7388c4088649f63c58.mockapi.io/kayaadmin/users"
        );
        const data = await response.json();

        // Count occurrences of each age group
        const ageGroups = {
          "18-30": 0,
          "31-45": 0,
          "46-60": 0,
          "61-100": 0,
        };

        data.forEach((item) => {
          const age = parseInt(item.age);
          if (age >= 18 && age <= 30) {
            ageGroups["18-30"]++;
          } else if (age >= 31 && age <= 45) {
            ageGroups["31-45"]++;
          } else if (age >= 46 && age <= 60) {
            ageGroups["46-60"]++;
          } else {
            ageGroups["61-100"]++;
          }
        });

        // Calculate the total count
        const totalCount = Object.values(ageGroups).reduce(
          (acc, count) => acc + count,
          0
        );

        // Convert ageGroups object to an array of objects with x and y properties and include the label
        const extractedData = Object.entries(ageGroups).map(
          ([group, count]) => ({
            x: group,
            y: count,
            label: `${((count / totalCount) * 100).toFixed(0)}%`, // Calculate the percentage and round it
          })
        );

        setAgeData(extractedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAndProcess();
  }, []);

  return (
    <div className="chart-container w-60 border-[1px] border-black rounded-xl">
      <div className="p-2">Age Group</div>
      <div className="chart">
        <VictoryPie
          colorScale={colorScale}
          data={ageData}
          labelComponent={<VictoryLabel dy={-10} />} // Adjust label position inside the slices
          labelRadius={({ innerRadius }) => innerRadius + 70} // Distance label from the center of the pie
          style={{
            labels: { fontSize: 15, fill: "white" }, // Style for labels
            parent: { width: "250px", height: "250px" }, // Use maxWidth for responsive design
          }}
        />
        <div className="legend">
          {ageData.map((item, index) => (
            <div key={index} className="flex gap-2 ml-2 items-center">
              <div
                className="w-4 h-4 rounded-full"
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
