import { createContext, useContext, useState } from "react";

const AddBookingsContext = createContext();
export const AddBookingsProvider = ({ children }) => {
  const [cabinID, setCabinID] = useState("");
  const [guestID, setGuestID] = useState("");
  const handleCabinID = (e) => {
    setCabinID(e.target.value);
  };
  const handleGuestID = (e) => {
    setGuestID(e.target.value);
  };

 



  const booking = { cabinID, guestID, handleCabinID, handleGuestID };
  return (
    <AddBookingsContext.Provider value={booking}>
      {children}
    </AddBookingsContext.Provider>
  );
};
export const useContextAddBookings = () => {
  return useContext(AddBookingsContext);
};
