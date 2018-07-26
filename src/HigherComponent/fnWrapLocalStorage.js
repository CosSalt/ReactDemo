import React,{Component} from 'react'
const wrapLocalStorage = (WrappedComponent, name) => {
  class LocalStorageActions extends Component {
    constructor () {
      super()
      this.state = {data: null}
    }
    
    componentWillMount () {
      let data = localStorage.getItem(name)
      try {
        // 尝试解析成 JSON 对象
        this.setState({data: JSON.parse(data)})
      } catch (e) {
        // 如果出错了就当普通字符串读取
        this.setState({data})
      }
    }

    _saveData = (data) => {
      try {
        // 尝试把它解析成 JSON 字符串
        localStorage.setItem(name, JSON.stringify(data))
      } catch (e) {
        // 如果出错了就当普通字符串保存
        localStorage.setItem(name, data)
      }
    }

    render () {
      const {data} = this.state
      const saveData = this._saveData
      return (
        <WrappedComponent
          data={data}
          saveData={saveData}
          // 这里的意思是把其它的参数原封不动的传递给被包装的组件
          {...this.props}
        />
      )
    }
  }
  return LocalStorageActions
}

export default wrapLocalStorage