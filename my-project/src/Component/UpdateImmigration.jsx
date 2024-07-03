import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateImmigrationData = () => {
  const [data, setData] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedTitles, setUpdatedTitles] = useState("");
  const [updatedDetails, setUpdatedDetails] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://65dcb4ebe7edadead7ecbc41.mockapi.io/api/immigration/add-immigration"
        );
        setData(response.data);
        setSelectedTitle(response.data[0]?.titles); // Select the title of the first item by default
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePointClick = (title) => {
    setSelectedTitle(title);
    setEditing(true); // Open the form for editing
  };

  const handleSaveClick = async () => {
    try {
      // Perform the update logic using an API call
      const response = await axios.put(
        `https://65dcb4ebe7edadead7ecbc41.mockapi.io/api/immigration/add-immigration/${selectedTitle.id}`,
        {
          titles: updatedTitles,
          details: updatedDetails,
        }
      );

      console.log("Data updated successfully:", response.data);
      setEditing(false);
      setSuccessMessage("Data updated successfully!");
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Select Title:
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => handlePointClick(e.target.value)}
        >
          <option value="" disabled selected>
            Select a title...
          </option>
          {data.map((point) => (
            <option key={point.id} value={point.titles}>
              {point.titles}
            </option>
          ))}
        </select>
      </div>
      {editing && (
        <form onSubmit={handleSaveClick} className="mt-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="updatedTitles"
            >
              Title:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="updatedTitles"
              type="text"
              value={updatedTitles}
              onChange={(e) => setUpdatedTitles(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="updatedDetails"
            >
              Details:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="updatedDetails"
              type="text"
              value={updatedDetails}
              onChange={(e) => setUpdatedDetails(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Details
          </button>
        </form>
      )}
      {successMessage && (
        <div className="text-green-600 font-bold mt-2">{successMessage}</div>
      )}
    </div>
  );
};

export default UpdateImmigrationData;
