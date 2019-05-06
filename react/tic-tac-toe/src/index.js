// - for methods, it is conventional to use on[Event] and handle[Event] for
//   names
// - classes are called React component class/type and takes in parameters
//   called props and returns hierarchy of views to display via the render
//   method
// - use arrow function syntax to avoid the confusing behavior of "this"
// - add constructors to classes to initialize states
//   - must always start with a "super(props);" call
// - to collect data from multiple children, or have two children components
//   communicate with each other, you need to declar the shared state in their
//   parent component instead
//   - lifting state into a parent component
// - the onClick prop tells React to set up a click event listener
// - understanding data changes with mutation and without mutation is very
//   important
// - determining when to re-render in React can be dealt with through
//   shouldComponentUpdate() and pure components
// - function components: components that only contain a render method and
//   do not have their own state, takes props as
// - the map method is commonly used for mapping data to other data
//   - ex) const numbers = [1, 2, 3];
//         const doubled = numbers.map(x => x * 2); // [2, 4, 6]
// - it’s strongly recommended that you assign proper keys whenever you build
//   dynamic lists
//   - when a list is re-rendered, React takes each list item’s key and searches
//     the previous list’s items for a matching key. If the current list has a key
//     that didn’t exist before, React creates a component. If the current list
//     is missing a key that existed in the previous list, React destroys the
//     previous component. If two keys match, the corresponding component is
//     moved. Keys tell React about the identity of each component which allows
//     React to maintain state between re-renders. If a component’s key changes,
//     the component will be destroyed and re-created with a new state.
// - The moves are never re-ordered, deleted, or inserted in the middle, so it’s
//   safe to use the move index as a key.

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
class Square extends React.Component { // considered a controlled component because Board has full control
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()} // when clicked, React will call the onClick handler defined here
      >
        {this.props.value}
      </button>
    );
  }
}
*/

function Square(props) { // when Square became a function component, onClick={() => this.props.onClick()} got shortened to onClick={props.onClick}
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)} // the call to this.props.onClick() is specified here and calls handleClick(i)
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(); // creates copy of the squares array
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ // vs push(), concat doesn't mutate the original array
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        "Go to move #" + move :
        "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />

        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
