import React, {Component} from 'react'

const WarpComponent = (WrappedComponent, name) => {
  class NewComponent extends Component {
    constructor () {
      super()
      this.state = {data: null}
    }

    componentWillMount () {
      let data = localStorage.getItem(name)
      this.setState({data})
    }

    render () {
      const {data} = this.state
      return (
        <WrappedComponent data={data} />
      )
    }
  }
  return NewComponent
}

export default WarpComponent