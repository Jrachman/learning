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

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice(); // creates copy of the squares array
    squares[i] = "X";
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)} // the call to this.props.onClick() is specified here and calls handleClick(i)
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
