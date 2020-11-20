import { useState } from 'react';
import './App.css';
import Slot from './Slot.jsx';
import Confetti from 'react-confetti';

//  to implement a history stepper,
//  we can push every step we me make to an object. 
//  when that object is clicked, set the current state to that object.
function App() {
  const [currMove, setCurrMove] = useState(0);
  const [history, setHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  //game related
  const [isRedTurn, setIsRedTurn] = useState(true)
  //game board as an array - used to control colors of the circles
  const [game, setGame] = useState(Array(42).fill(null));
  //holds the moves for each color token
  const [moves, setMoves] = useState({
    red: [],
    yellow: []
  })


  const circleClicked = (id) => {

    let last;
    for (id; id < game.length; id += 7) {
      last = id;
    }

    var went = false;

    for (last; last > -1; last -= 7) {
      if (game[last] === null) {
        game[last] = isRedTurn ? 'red' : 'yellow';
        if (isRedTurn) {
          moves.red.push(last);
        } else {
          moves.yellow.push(last);
        }
        went = true;
        break;
      }
    }

    if (went) {
      var checkEm = isRedTurn ? moves.red : moves.yellow

      var newHistory = {
        gameBoard: [...game],
        moveHistory: { red: [...moves.red], yellow: [...moves.yellow] },
        redTurn: isRedTurn,
        lastMove: last,
      }
      var move = currMove;
      move++;
      setCurrMove(move);
      var temphist = [];
      for (var i = 0; i < move; i++) {
        temphist.push(history[i])
      }
      temphist.push(newHistory);
      setHistory(temphist)
      if (move === 42) {
        alert("Draw")
      } else {
        var winner = checkWinner(checkEm);
        if (winner) {
         setGameOver(true)
        } else {
          setIsRedTurn(!isRedTurn);
        }
      }
    }
  }

  const checkWinner = (check) => {
    check = check.sort(function (a, b) { return a - b; });
    //check horizontal
    var count = 0;
    var prev = check[0];
    for (var i = 1; i < check.length; i++) {
      var curr = check[i];
      if (curr % 7 === 0) {
        count = 0;
        continue;
      }
      if (prev + 1 === curr) {
        count++;
        if (count === 3) {
          console.log("horizontal winner")
          return true;
        }
      } else {
        count = 0;
      }
      prev = curr;
    }

    //  check veritcal
    for (i = 0; i < check.length; i++) {
      curr = check[i];
      count = 0;
      prev = curr;
      for (var j = i + 1; j < check.length; j++) {
        if (prev + 7 === check[j]) {
          count++;
          prev = check[j];
          if (count === 3) {
            console.log("vertical winner")
            return true;
          }
        }
      }
    }


    //  check diagonal left to right
    for (i = 0; i < check.length; i++) {
      curr = check[i];
      var countLR = 0;
      var prevLR = curr;

      var countRL = 0;
      var prevRL = curr;
      for (j = i + 1; j < check.length; j++) {
        if (prevLR + 8 === check[j]) {
          countLR++;
          prevLR = check[j];
          if (countLR === 3) {
            console.log("left-right diag winner")
            return true;
          }
        }
        if (prevRL + 6 === check[j]) {
          countRL++;
          prevRL = check[j];
          if (countRL === 3) {
            console.log("right-left diag winner")
            return true;
          }
        }
      }
    }

    // no winner found
    return false;
  }

  const resetState = (e) => {
    var index = e.target.value;
    setGame(history[index].gameBoard)
    setMoves(history[index].moveHistory)
    setIsRedTurn(history[index].redTurn)
    setCurrMove(e.target.value);
  }

  const swapOrderOfHistory = () => {
    var temp = [...history];
    temp.reverse();
    setHistory(temp);
  }

  return (
    <div className="container">
      <Confetti
        run={gameOver} />
      { gameOver &&
        <h1 className="winner">
          Winner, {
          isRedTurn ? "Red!" : "Yellow!"
          }
        </h1>
      }
      <select onChange={resetState}>
        <option value={null}></option>
        {history !== undefined &&
          history.map((hist, i) => {
            var row;
            var col;
            if (hist !== undefined) {
              col = hist.lastMove % 7 + 1;
              row = parseInt(hist.lastMove / 7) + 1
            }
            return (
              <option value={i} key={i}>
                Move #{i + 1}, Row: {row}, Col: {col}
              </option>
            )
          })
        }
      </select>
      <button onClick={swapOrderOfHistory}>
        Switch Chronological Order
      </button>
      <div className="game-grid">
        {
          game.map((val, id) => {
            return (
              <Slot id={id} fill={val} handleClick={circleClicked} key={id} />
            )
          })
        }
      </div>
    </div>
  );
}



export default App;



