import React, { useState } from "react";
import UpdateImmigration from "../Component/UpdateImmigration";

const ImmigrationForm = () => {
  const [formData, setFormData] = useState({
    imageURL: "",
    details: "",
    titles: "",
  });
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to submit form data
      const response = await fetch(
        "https://65dcb4ebe7edadead7ecbc41.mockapi.io/api/immigration/add-immigration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setSubmitMessage("Form submitted successfully");
        // Reset form data
        setFormData({
          imageURL: "",
          details: "",
          titles: "",
        });
        // Refresh page
        window.location.reload();
      } else {
        setSubmitMessage("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitMessage("An error occurred while submitting the form");
    }
  };

  return (
    <div className="flex">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg w-1/2">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Immigration Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.titles}
                onChange={handleChange}
                className="border-gray-800 border-b-2 focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="details" className="block text-gray-700">
                Details:
              </label>
              <input
                type="text"
                id="details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                className="border-gray-800 border-b-2 rounded-md shadow-sm mt-1 block w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="imageURL" className="block text-gray-700">
                Image URL:
              </label>
              <input
                type="text"
                id="imageURL"
                name="imageURL"
                value={formData.imageURL}
                onChange={handleChange}
                className="border-gray-800 border-b-2 focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
          {submitMessage && (
            <p className="text-green-600 mt-4">{submitMessage}</p>
          )}
        </div>
      </div>
      <div className="w-1/2">
        <UpdateImmigration />
      </div>
    </div>
  );
};

export default ImmigrationForm;
