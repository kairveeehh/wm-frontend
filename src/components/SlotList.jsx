import React from 'react';
import Slot from './Slot';

const SlotList = ({ slots, bookSlot, cancelBooking }) => (
  <div className="slot-list">
    {slots.map(slot => (
      <Slot
        key={slot._id}
        slot={slot}
        bookSlot={bookSlot}
        cancelBooking={cancelBooking}
      />
    ))}
  </div>
);

export default SlotList;