export const checkAvailableSlots = (slotOptions: any, slotData: any) => {
  const availableSlots = slotOptions.filter((slotOption: any) => {
    // Check if there is a slot in slotData that matches the current slotOption
    const isBooked = slotData.some((bookedSlot: any) => {
      return (
        bookedSlot.startTime === slotOption.startTime &&
        bookedSlot.endTime === slotOption.endTime
      );
    });

    // Return true if the slot is not booked
    return !isBooked;
  });
  return availableSlots;
};
