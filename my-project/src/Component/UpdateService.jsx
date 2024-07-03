import React, { useState, useEffect } from "react";

const ServiceSelector = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [details, setDetails] = useState("");
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch services from the API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "https://65dcb4ebe7edadead7ecbc41.mockapi.io/api/immigration/services"
        );
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        } else {
          console.error("Failed to fetch services:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchServices();
  }, []);

  // Function to handle service selection
  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setShowForm(true);
    setDetails(service.details); // Pre-fill the form with current details
    setTitle(service.title); // Pre-fill the form with current title
    setIcon(service.icon); // Pre-fill the form with current icon
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://65dcb4ebe7edadead7ecbc41.mockapi.io/api/immigration/services/${selectedService.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            details,
            icon,
            id: selectedService.id,
          }),
        }
      );

      if (response.ok) {
        console.log("Service details updated successfully!");
        setSuccessMessage("Service details updated successfully!");
        // Reset form fields
        setTitle("");
        setDetails("");
        setIcon("");
        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        console.error("Failed to update service details:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Select Service:
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => handleServiceSelect(JSON.parse(e.target.value))}
        >
          <option value="" disabled selected>
            Select a service...
          </option>
          {services.map((service) => (
            <option key={service.id} value={JSON.stringify(service)}>
              {service.title}
            </option>
          ))}
        </select>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="details"
            >
              Details:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="details"
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="icon"
            >
              Icon:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="icon"
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
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

export default ServiceSelector;
