import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ShoppingList from './shoppingList.js'
import CommentApp from './CommentApp/CommentApp'
import FnWrapComponent from './HigherComponent/FnWrapComponent'

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
    const rows = 10, columns = 10 // 3行3列
    const squares = Array.from({length: rows}, () => Array(columns).fill(null))
    this.state = {
      winner: null,
      squares,
      executionOrder: [],
      nextSide: 'X',
      rows,
      columns,
      stepCount: 0,
      isGameOver: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  getNextSide(nowSide) {
    return nowSide === 'X' ? 'O' : 'X'
  }
  handleClick (rowIndex, columnIndex) {
    const {squares, executionOrder, rows, columns, nextSide = 'X'} = this.state
    const newSquares = [...squares]
    newSquares[rowIndex][columnIndex] = nextSide
    const newExecutionOrder = [...executionOrder]
    newExecutionOrder.push([rowIndex, columnIndex])
    const {result} = this.isGameOver(rowIndex, columnIndex, nextSide)
    const theNextSide = this.getNextSide(nextSide)
    const stepCount = this.state.stepCount + 1
    const isGameOver = result || rows * columns <= stepCount
    this.setState({
      squares: newSquares,
      executionOrder: newExecutionOrder,
      nextSide: theNextSide,
      winner: result ? nextSide : null,
      isGameOver,
      stepCount
    })
  }

  getSameStyleNumber(state, rowIndex, columnIndex, nodes = [], count = 0) {
    const {directions, squares, rows, columns, sideName} = state
    const judgeRowIndex = rowIndex + directions[0], judgeColumnIndex = columnIndex + directions[1]
    const isEffectiveCoordinate = judgeRowIndex >=0 && judgeRowIndex < columns && judgeColumnIndex >= 0 && judgeColumnIndex < rows
    let hasSameSide = false
    if(sideName && isEffectiveCoordinate) {
      hasSameSide = sideName === squares[judgeRowIndex][judgeColumnIndex]
    }
    if(hasSameSide) {
      // 生成一个新的数组,房子变量相互影响
      const sameSideNodes = nodes.map(item => {
        return item.slice()
      })
      sameSideNodes.push([judgeRowIndex, judgeColumnIndex])
      return this.getSameStyleNumber(state, judgeRowIndex, judgeColumnIndex, sameSideNodes, count + 1)
    }
    return {count, nodes}
  }

  isGameOver (rowIndex, columnIndex, sideName) {
    const winCountNumber = 5
    const {squares, rows, columns, stepCount} = this.state
    const checkStyle = [
      [[-1, 1], [1, -1]], // y = -x
      [[0, 1], [0, -1]],  // x = 0
      [[1, 1], [-1, -1]], // y = x
      [[1, 0], [-1, 0]]   // y = 0
    ]
    const judgeState = {squares, rows, columns, sideName} // directions
    let result = false
    let sameSideNodes = []
    for(let sameDirections of checkStyle.values()) {
      let sameSideCount = 1
      sameDirections.forEach(checkDirectionsItem => {
        judgeState.directions = checkDirectionsItem
        const {count, nodes} = this.getSameStyleNumber(judgeState, rowIndex, columnIndex)
        // const {count} = this.getSameStyleNumber(judgeState, rowIndex, columnIndex, [[rowIndex, columnIndex]])
        sameSideCount += count
        sameSideNodes = nodes
      })
      sameSideNodes.push([rowIndex, columnIndex])
      if(sameSideCount >= winCountNumber) {
        result = true
        break
      }
    }
    return {result, nodes: sameSideNodes}
  }

  render() {
    const {squares, winner, isGameOver} = this.state
    let status
    const disabled = !!winner || isGameOver
    if(winner) {
      status = 'Game Over, winner is ' + winner
    } else if(isGameOver){ // 平局,即所有的空间被用完了,但未有赢家
      status = 'Game Over, The game has drawn'
    } else {
      status = 'Next player: ' + this.state.nextSide
    }
    const NewShoppingList = FnWrapComponent(ShoppingList)
    return (
      <div>
        <NewShoppingList name='[shopping list test]' />
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
// 游戏 五子棋
// ReactDOM.render(
//   <Game />,
//   document.getElementById('root')
// )

// CommentApp
ReactDOM.render(
  <Fragment>
    <h2> CommentApp </h2>
    <CommentApp />
  </Fragment>,
  document.getElementById('root')
)