import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./Pages/Home/Home";
import Quiz from "./Pages/Quiz/Quiz";
import Result from "./Pages/Result/Result";
import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState("");
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    try {
      const { data } = await axios.get(
        `https://opentdb.com/api.php?amount=20${
          category && `&category=${category}`
        } ${difficulty && `&Dificultiess=${difficulty}`}&type=multiple`
      );

      const parser = new DOMParser();
      const decodedResults = data.results.map((question) => ({
        ...question,
        question: parser.parseFromString(question.question, "text/html").body
          .textContent,
        incorrect_answers: question.incorrect_answers.map(
          (answer) =>
            parser.parseFromString(answer, "text/html").body.textContent
        ),
        correct_answer: parser.parseFromString(
          question.correct_answer,
          "text/html"
        ).body.textContent,
      }));

      setQuestions(decodedResults);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <BrowserRouter>
      <div
        className="app"
        style={{
          backgroundImage: "url(./quiz.jpg",
          opacity: 2,
        }}
      >
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                name={name}
                setName={setName}
                fetchQuestions={fetchQuestions}
              />
            }
          ></Route>
          <Route
            path="/quiz"
            element={
              <Quiz
                name={name}
                questions={questions}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
              />
            }
          ></Route>
          <Route
            path="/result"
            element={<Result name={name} score={score} />}
          ></Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
