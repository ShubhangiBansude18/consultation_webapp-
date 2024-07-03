import React, { useState, useEffect } from "react";

const Card = ({ title, number }) => {
  // Function to generate random gradient class
  const generateRandomGradient = () => {
    const gradients = [
      "bg-gradient-to-r from-purple-400 to-pink-500",
      "bg-gradient-to-r from-blue-400 to-cyan-800",
      "bg-gradient-to-r from-green-400 to-teal-500",
      "bg-gradient-to-r from-yellow-400 to-orange-500",
      "bg-gradient-to-r from-red-400 to-pink-500",
      "bg-gradient-to-r from-indigo-400 to-purple-500",
      "bg-gradient-to-r from-green-500 to-blue-600",
      "bg-gradient-to-r from-yellow-300 to-green-400",
      "bg-gradient-to-r from-red-500 to-purple-600",
      "bg-gradient-to-r from-blue-300 to-indigo-400",
    ];

    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  const gradientClass = generateRandomGradient();

  return (
    <div className={`rounded-lg shadow-md p-6 m-4 w-48 h-48 ${gradientClass}`}>
      <div className="text-xl font-bold mb-4">{title}</div>
      <div className="text-4xl font-bold self-center">{number}</div>
    </div>
  );
};

const CardContainer = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://65e40f7388c4088649f63c58.mockapi.io/kayaadmin/users"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        userData.map((user, index) => (
          <Card
            key={index}
            title={user.immigration_type}
            number={
              userData.filter(
                (u) => u.immigration_type === user.immigration_type
              ).length
            }
          />
        ))
      )}
    </div>
  );
};

export default CardContainer;
