import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/slots`);
      setSlots(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching slots');
      setLoading(false);
    }
  };

  const bookSlot = async (slotId) => {
    try {
      await axios.post(`http://localhost:5000/api/slots/book`, {
        slotId,
        userId: 'user1', // Simulating a logged-in user
      });
      fetchSlots();
    } catch (err) {
      setError('Error booking slot');
    }
  };

  const cancelBooking = async (slotId) => {
    try {
      await axios.post(`http://localhost:5000/api/slots/cancel`, {
        slotId,
        userId: 'user1', // Simulating a logged-in user
      });
      fetchSlots();
    } catch (err) {
      setError('Error cancelling booking');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Group slots by day
  const slotsByDay = slots.reduce((acc, slot) => {
    const date = new Date(slot.startTime).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(slot);
    return acc;
  }, {});

  return (
    <div className="App">
      <h1>Washing Machine Booking System</h1>
      {Object.entries(slotsByDay).map(([date, daySlots]) => (
        <div key={date}>
          <h2>{date}</h2>
          <div className="slot-list">
            {daySlots.map(slot => (
              <div key={slot._id} className={`slot ${slot.isBooked ? 'booked' : 'available'}`}>
                <p>Time: {new Date(slot.startTime).toLocaleTimeString()} - {new Date(slot.endTime).toLocaleTimeString()}</p>
                <p>Status: {slot.isBooked ? 'Booked' : 'Available'}</p>
                {slot.isBooked && slot.userId === 'user1' ? (
                  <button onClick={() => cancelBooking(slot._id)}>Cancel Booking</button>
                ) : !slot.isBooked ? (
                  <button onClick={() => bookSlot(slot._id)}>Book Slot</button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;