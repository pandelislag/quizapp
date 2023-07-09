import { useState, useEffect } from "react";
import "./ErrorMessage.css";

const ErrorMessage = ({ message }) => {
  const [errorMessage, setErrorMessage] = useState(message);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return errorMessage ? <div className="errorMes">{errorMessage}</div> : null;
};

export default ErrorMessage;
