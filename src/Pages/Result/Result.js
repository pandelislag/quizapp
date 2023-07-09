import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Result.css";

const Result = ({ name, score }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) {
      navigate("/");
    }
  }, [name, navigate]);

  return (
    <div className="result">
      <span className="title">Final Score: {Math.floor(score)}%</span>
      <Button
        className="btn__result"
        variant="contained"
        color="secondary"
        size="medium"
        href="/"
      >
        Home
      </Button>
    </div>
  );
};

export default Result;
