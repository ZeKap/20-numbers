import React from "react";
import "./App.css";
import { useCookies } from "react-cookie";
import { getRandomInt } from "./utils/utils";
import BoxManager from "./components/BoxManager";

function App() {
  const [nextNumber, setNextNumber] = React.useState(getRandomInt(1000));
  const [score, setScore] = React.useState(0);
  const [cookies, setCookie] = useCookies(["bestScore"]);
  const [bestScore, setBestScore] = React.useState(cookies["bestScore"] || 0);

  /**
   * Will restart the game
   */
  function restart(): void {
    if (score > bestScore) {
      setBestScore(score);
      setCookie("bestScore", score);
    }
    setScore(0);
  }

  return (
    <>
      <h1>20 numbers sorted</h1>
      <p>
        A random number from 0 to 1000 will be randomly picked, choose where to
        put it in this list so the list is sorted at the end.
      </p>
      <p>
        WARNING! Once the place for the number is chosen, you can't move it.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          margin: "auto",
        }}
      >
        <h3>Score: {score}</h3>
        {bestScore !== 0 && <h3>Best score: {bestScore}</h3>}
      </div>

      <h2>Number: {nextNumber}</h2>
      <BoxManager
        numberOfBoxes={20}
        nextNumber={nextNumber}
        incrementScore={() => {
          setScore(score + 1);
        }}
        setNextNumber={setNextNumber}
        restartGame={restart}
      ></BoxManager>
    </>
  );
}

export default App;
