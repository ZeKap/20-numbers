import React from "react";
import "./App.css";
import { useCookies } from "react-cookie";
import { getRandomInt } from "./utils/utils";
import BoxManager from "./components/BoxManager";
import { calcColor } from "./utils/utils";

function App() {
  const BOXES: number = 20;
  const NUMBER_MIN: number = 1;
  const NUMBER_MAX: number = 1000;
  const HUE_MIN: number = 110;
  const HUE_MAX: number = 0;

  const [nextNumber, setNextNumber] = React.useState(
    getRandomInt(NUMBER_MIN, NUMBER_MAX)
  );
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

      <h2>Number:<div style={{
        backgroundColor: calcColor(
          nextNumber,
          HUE_MIN,
          HUE_MAX,
          NUMBER_MIN,
          NUMBER_MAX
        ),
      }}>{nextNumber}</div></h2>
      <BoxManager
        NUMBER_OF_BOXES={BOXES}
        nextNumber={nextNumber}
        incrementScore={() => {
          setScore(score + 1);
        }}
        setNextNumber={setNextNumber}
        restartGame={restart}
        NUMBER_MIN={NUMBER_MIN}
        NUMBER_MAX={NUMBER_MAX}
        HUE_MIN={HUE_MIN}
        HUE_MAX={HUE_MAX}
      ></BoxManager>
    </>
  );
}

export default App;
