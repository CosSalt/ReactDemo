// 每一个小方块,一个button
import React from 'react'
// import React, {Component} from 'react'

// 函数的方式写组件(纯函数)
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

export default Square