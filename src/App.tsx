import './App.css';

function App() {
  var numbers = new Array(20).fill(0);

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  function handleCaseClick(index: number) {
    console.log(index);
  }

  return (
    <>
      <h1>20 numbers sorted</h1>
      <p>A random number from 0 to 1000 will be randomly picked, choose where to put it in this list so the list is sorted at the end.</p>
      <p>WARNING! Once the place for the number is chosen, you can't move it.</p>

      <div className="numbers">
      {numbers.map((number, index) => (
        <div key={index} className="number" onClick={()=>handleCaseClick(index)}>
          {number!==0 ? number : ''}
        </div>
      ))}
    </div>
    </>
  );
}

export default App;
