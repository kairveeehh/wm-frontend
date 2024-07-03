import React from 'react';

const Slot = ({ slot, bookSlot, cancelBooking }) => {
  const startTime = new Date(slot.startTime);
  const endTime = new Date(slot.endTime);

  return (
    <div className={`slot ${slot.isBooked ? 'booked' : 'available'}`}>
      <p>Time: {startTime.toLocaleTimeString()} - {endTime.toLocaleTimeString()}</p>
      <p>Status: {slot.isBooked ? 'Booked' : 'Available'}</p>
      {slot.isBooked && slot.userId === 'user1' ? (
        <button onClick={() => cancelBooking(slot._id)}>Cancel Booking</button>
      ) : !slot.isBooked ? (
        <button onClick={() => bookSlot(slot._id)}>Book Slot</button>
      ) : null}
    </div>
  );
};

export default Slot;