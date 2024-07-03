import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryLabel } from "victory";
import CardContainer from "./CardContainer";
import AppointmentData from "./AppointmentData";
import { AgeGroupChart } from "./Charts/AgeChart";
import { GenderChart } from "./Charts/GenderChart";
import { ImmigrationTypeChart } from "./Charts/ImmigrationTypeChart";

const Chart = () => {
  const [serviceData, setServiceData] = useState([]);
  const [colorScale, setColorScale] = useState([
    "tomato",
    "orange",
    "gold",
    "cyan",
    "navy",
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://65e40f7388c4088649f63c58.mockapi.io/kayaadmin/users"
        );
        const data = await response.json();

        // Count occurrences of each immigration service type
        const serviceCounts = {};
        data.forEach((item) => {
          const service = item.immigration_type;
          serviceCounts[service] = (serviceCounts[service] || 0) + 1;
        });

        // Convert serviceCounts object to an array of objects with x and y properties
        const extractedData = Object.entries(serviceCounts).map(
          ([service, count]) => ({
            x: service,
            y: count,
          })
        );

        setServiceData(extractedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getTotalCount = () => {
    return serviceData.reduce((acc, item) => acc + item.y, 0);
  };

  const getPercentage = (count) => {
    const totalCount = getTotalCount() / 100;
    return (count / totalCount).toFixed(2);
  };

  return (
    <div className="flex justify-start w-80 gap-2">
      <div className="bg-white rounded-lg shadow-2xl p-6 border-[1px] border-black mb-2 h-[90vh]">
        <div className="text-xl font-bold mb-4">Service</div>
        <div className="flex flex-col">
          <div className="w-72">
            <VictoryPie
              colorScale={colorScale}
              data={serviceData}
              labelRadius={({ innerRadius }) => innerRadius + 70}
              labelComponent={
                <VictoryLabel
                  text={({ datum }) => `${getPercentage(datum.y)}%`}
                />
              }
              style={{
                labels: { fill: "white", fontSize: 15, fontWeight: "bold" },
                parent: { width: "300px", height: "300px" },
              }}
            />
          </div>
          <div className="ml-8 items-start">
            {serviceData.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: colorScale[index] }}
                ></div>
                <span>{item.x}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[52vw] gap-4 ">
        {/* <CardContainer /> */}
        <div className="flex gap-2 ml-4 mb-4">
          <ImmigrationTypeChart />
          <AgeGroupChart />
          <GenderChart />
        </div>
        <div className="mb-6">
          <AppointmentData />
        </div>
      </div>
    </div>
  );
};

export default Chart;
