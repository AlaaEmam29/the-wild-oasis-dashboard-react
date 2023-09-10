import { createContext, useContext, useState } from "react";

const CheckInOutContext = createContext();
export const CheckInOutProvider = ({ children }) => {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakFast, setAddBreakfast] = useState(false);
  const handleConfirmPaid = () => {
    setConfirmPaid((confirm) => !confirm);
  };
  const handleAddBreakfast = () => {
    setAddBreakfast((confirm) => !confirm);
  };

  const check = {
    addBreakFast,
    confirmPaid,
    handleAddBreakfast,
    handleConfirmPaid,
    setConfirmPaid,
    setAddBreakfast,
  };
  return (
    <CheckInOutContext.Provider value={check}>
      {children}
    </CheckInOutContext.Provider>
  );
};
export const useContextCheck = () => {
  return useContext(CheckInOutContext);
};
