import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ShoppingList from './shoppingList.js'

function Square(props) {
  const val = props.value
  const disabled = props.disabled || !!val || false
  const className = disabled ? 'square-disabled' : 'square-abled'
  return (
    <button className={"square " + className}
      disabled={disabled}
      onClick={props.onClick}
    >
      {val}
    </button>
  )
}

// class Square extends Component {
//   render() {
//     const val = this.props.value
//     const disabled = this.props.disabled || !!val || false
//     const className = disabled ? 'square-disabled' : 'square-abled'
//     return (
//       <button
//         className={"square " + className}
//         disabled={disabled}
//         onClick={() => this.props.onClick()}
//       >
//         {val}
//       </button>
//     )
//   }
// }

class Board extends Component {
  constructor() {
    super()
    const rows = 3, columns = 3 // 3行3列
    const squares = Array.from({length: rows}, () => Array(columns).fill(null))
    this.state = {
      squares,
      executionOrder: [],
      nextSide: 'X'
    }
    this.handleClick = this.handleClick.bind(this)
  }
  getNextSide(nowSide) {
    return nowSide === 'X' ? 'O' : 'X'
  }
  handleClick (rowIndex, columnIndex) {
    const {squares, executionOrder, nextSide = 'X'} = this.state
    const newSquares = [...squares]
    newSquares[rowIndex][columnIndex] = nextSide
    const newExecutionOrder = [...executionOrder]
    newExecutionOrder.push([rowIndex, columnIndex])
    const theNextSide = this.getNextSide(nextSide)
    this.setState({
      squares: newSquares,
      executionOrder: newExecutionOrder,
      nextSide: theNextSide
    })
  }
  // renderSquare(rowIndex, columnIndex) {
  //   return (
  //     <Square
  //       key={columnIndex}
  //       value={this.state.squares[rowIndex][columnIndex]}
  //       onClick={() => this.handleClick(rowIndex, columnIndex)}
  //     />
  //   )
  // }

  render() {
    const winner = null
    let status
    const disabled = !!winner
    if(winner) {
      status = 'Game Over, winner is ' + winner
    } else {
      status = 'Next player: ' + this.state.nextSide
    }
    const {squares} = this.state
    return (
      <div>
        <ShoppingList name='[shopping list test]' />
        <hr />
        <div className="status">{status}</div>
        {
          squares.map((columnItem, rowIndex) => {
            return (
              <div className="board-row" key={rowIndex}>
                {
                  columnItem.map((val, columnIndex) => {
                    return (
                      <Square
                        key={columnIndex}
                        value={val}
                        disabled={disabled}
                        onClick={() => this.handleClick(rowIndex, columnIndex)}
                      />
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}

class Game extends Component {
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
    )
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)