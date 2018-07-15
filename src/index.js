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
      winner: null,
      squares,
      executionOrder: [],
      nextSide: 'X',
      rows,
      columns
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
    // rowIndex, columnIndex, sideName
    const {result} = this.isGameOver(rowIndex, columnIndex, nextSide)
    const theNextSide = this.getNextSide(nextSide)
    this.setState({
      squares: newSquares,
      executionOrder: newExecutionOrder,
      nextSide: theNextSide,
      winner: result ? nextSide : null
    })
  }

  getSameStyleNumber(state, rowIndex, columnIndex, nodes = [], count = 1) {
    const {directions, squares, rows, columns, sideName} = state
    const judgeRowIndex = columnIndex + directions[0], judgeColumnIndex = rowIndex + directions[1]
    const isEffectiveCoordinate = judgeRowIndex >=0 && judgeRowIndex < columns && judgeColumnIndex >= 0 && judgeColumnIndex < rows
    let hasSameSide = false
    if(sideName && isEffectiveCoordinate) {
      hasSameSide = sideName === squares[judgeRowIndex][judgeColumnIndex]
    }
    if(hasSameSide) {
      const sameSideNodes = nodes.map(item => item.slice()) // 生成一个新的数组
      sameSideNodes.push([judgeRowIndex, judgeColumnIndex])
      return this.getSameStyleNumber(state, judgeRowIndex, judgeColumnIndex, sameSideNodes, count + 1)
    }
    return {count, nodes}
  }

  isGameOver (rowIndex, columnIndex, sideName) {
    const winCountNumber = 3
    const {squares, rows, columns} = this.state
    // [x, y] 轴
    const checkStyle = [
      [[-1, 1], [1, -1]], // y = -x
      [[0, 1], [0, -1]],  // x = 0
      [[1, 1], [-1, -1]], // y = x
      [[1, 0], [-1, 0]]   // y = 0
    ]
    const judgeState = {squares, rows, columns, sideName} // directions
    console.log('judgeState', judgeState)
    let result = false
    let sameSideNodes = []
    for(let sameDirections of checkStyle.values()) {
      let sameSideCount = 0
      sameDirections.forEach(checkDirectionsItem => {
        judgeState.directions = checkDirectionsItem
        const {count, nodes} = this.getSameStyleNumber(judgeState, rowIndex, columnIndex)
        // const {count} = this.getSameStyleNumber(judgeState, rowIndex, columnIndex, [...checkDirectionsItem])
        sameSideCount += count
        sameSideNodes = nodes
      })
      if(sameSideCount >= winCountNumber) {
        result = true
        break
      }
    }
    return {result, nodes: sameSideNodes}
  }

  render() {
    const {squares, winner} = this.state
    let status
    const disabled = !!winner
    if(winner) {
      status = 'Game Over, winner is ' + winner
    } else {
      status = 'Next player: ' + this.state.nextSide
    }
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