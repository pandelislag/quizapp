import { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./Question.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  score,
  setScore,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const handleSelect = (i) => {
    if (selected === i && selected === correct) {
      return "select";
    } else if (selected === i && selected !== correct) {
      return "wrong";
    } else if (i === correct) {
      return "select";
    }
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(Math.floor(score + (1 * 100) / 20));
    setError(false);
  };

  const navigate = useNavigate();

  const handleNext = () => {
    if (currQues > 18) {
      navigate("/result");
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else {
      setError("Please select an option");
    }
  };
  const handleQuit = () => {};

  return (
    <div className="question">
      <h1>Question {currQues + 1}</h1>

      <div className="singleQuestion">
        <h3> {questions[currQues].question} </h3>

        <div className="options">
          {error && <ErrorMessage message={"Select an option"} />}
          {options &&
            options.map((i) => (
              <button
                onClick={() => handleCheck(i)}
                className={`singleOption ${selected && handleSelect(i)}`}
                key={i}
                disabled={selected}
              >
                {i}
              </button>
            ))}
        </div>

        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"
            onClick={handleQuit}
          >
            Play Again
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
