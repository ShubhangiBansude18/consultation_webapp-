import React, { useState, useEffect } from 'react';

const AppointmentData = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch('https://65e40f7388c4088649f63c58.mockapi.io/kayaadmin/calendar-data')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Assuming the status could be null or empty string from API
        const appointmentsWithStatus = data.map((appointment) => ({
          ...appointment,
          status: appointment.status, // Keep the pending state if status is falsy
        }));
        setAppointments(appointmentsWithStatus);
      })
      .catch((error) => {
        console.error('Error fetching appointment data from API:', error);
      });
  }, []);

  const updateAppointmentStatus = (appointmentId, status) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === appointmentId ? { ...appointment, status } : appointment
    );

    setAppointments(updatedAppointments);

    fetch(`https://65e40f7388c4088649f63c58.mockapi.io/kayaadmin/calendar-data/${appointmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error updating appointment status');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error updating appointment status on the API:', error);
      });
  };

  // Function to handle clicking the accept button
  const handleAccept = (appointmentId) => {
    updateAppointmentStatus(appointmentId, 'accepted');
  };

  // Function to handle clicking the reject button
  const handleReject = (appointmentId) => {
    updateAppointmentStatus(appointmentId, 'rejected');
  };

  return (
    <div className="text-black w-full overflow-hidden border-[1px] border-black rounded-xl ml-4">
      <div className="ml-4 border-b-2 p-2 text-lg font-semibold">
        Client Appointment
      </div>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      Contact Number
                    </th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      Selected Time Slot
                    </th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment, index) => (
                    <tr key={appointment.id} className={`${index % 2 === 0 ? "bg-gray-100 " : "bg-white"}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {appointment.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {appointment.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {appointment.contactNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {appointment.selectedTimeSlot}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                        {appointment.status !== "rejected" && appointment.status !== "accepted" && (
                          <>
                            <button className="px-2 py-1 bg-green-500 text-white rounded mr-2" onClick={() => handleAccept(appointment.id)}>
                              Accept
                            </button>
                            <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleReject(appointment.id)}>
                              Reject
                            </button>
                          </>
                        )}
                        {appointment.status === 'accepted' && (
                          <span className="text-green-600">✔</span> // Checkmark icon
                        )}
                        {appointment.status === 'rejected' && (
                          <span className="text-red-600">✖</span> // Cross icon
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentData;