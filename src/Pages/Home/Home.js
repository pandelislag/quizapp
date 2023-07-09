import "./Home.css";
import { Button, MenuItem, TextField } from "@mui/material";
import Categories from "../../Data/Categorizies";
import Dificultiess from "../../components/Select/Dif";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const Home = ({ name, setName, fetchQuestions }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!category || !difficulty || !name) {
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      navigate("/quiz");
    }
  };
  return (
    <div className="content">
      <div className="settings">
        <span>Quiz Settings</span>
        <div className="settings__select">
          {error && <ErrorMessage message={"Please fill the blank"} />}
          <TextField
            style={{ marginBottom: 25 }}
            label="Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            select
            label="Choose a Category"
            variant="outlined"
            style={{ marginBottom: 25, fontSize: 12 }}
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {Categories.map((cat) => (
              <MenuItem key={cat.category} value={cat.value}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Chose Difficulty"
            variant="outlined"
            style={{ marginBottom: 25 }}
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty}
          >
            {Dificultiess.map((diff) => (
              <MenuItem key={diff.difficulty} value={diff.value}>
                {diff.difficulty}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleSubmit}
          >
            Start Game
          </Button>
        </div>
      </div>
      <img src="/quizgame.svg" className="banner" alt="quizz"></img>
    </div>
  );
};

export default Home;
