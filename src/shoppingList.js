import React,{Component} from 'react'

class ShoppingList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      test: 'this is test'
    }
    this.click2 = this.click2.bind(this)
  }
  click0 () {
    if(!this || !this.state){
      console.log(this)
    } else {
      console.log('this is in click0:', this.state.test)
    }
  }
  click1 = () => {
    console.log('this is in click1:', this.state.test)
  }
  click2 () {
    console.log('this is in click2:', this.state.test)
  }
  click3 () {
    console.log('this is in click3:', this.state.test)
  }
  render() {
    return (
      <div className='shopping-list'>
        <h1>Shopping List for {this.props.name}</h1>
        <button onClick={this.click0}> button0 </button>
        <button onClick={this.click1}> button1 </button>
        <button onClick={this.click2}> button2 </button>
        <button onClick={() => this.click3()}> button3 </button>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    )
  }
}
export default ShoppingList