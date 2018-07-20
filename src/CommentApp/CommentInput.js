import React,{ Component } from 'react'

class CommentInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      content: ''
    }
  }

  componentWillMount () {
    const key = 'username'
    const {username} = this._getFromLocalStorage(key)
    if(username) {
      this._valueChange(key, username)
    }
  }

  componentDidMount () {
    this.textareaEl.focus()
  }

  _saveToLocalStorage (key, val) {
    localStorage.setItem(key, val)
  }

  _getFromLocalStorage(key) {
    const res = {}
    const getItem = (itemKey) => localStorage.getItem(itemKey)
    if (key) {
      if(typeof key === 'string') {
        res[key] = getItem(key)
      } else if(Array.isArray(key)) {
        key.forEach(theKey => {
          res[theKey] = getItem(theKey)
        })
      } 
    }
    return res
  }

  _valueChange(propName, val) {
    this.setState({
      [propName]: val
    })
  }

  handleInputClick = (e) => {
    this._valueChange('username', e.target.value)
  }

  handleTextareaClick = (e) => {
    this._valueChange('content', e.target.value)
  }

  handleSubmit = () => {
    const {onSubmit} = this.props
    if(onSubmit) {
      const {username, content} = this.state
      onSubmit({
        username,
        content,
        createdTime: +new Date()
      })
    }
    this._valueChange('content', '')
  }

  handleNameBlur = (e) => {
    this._saveToLocalStorage('username', e.target.value)
  }

  render () {
    const {content, username} = this.state
    const isDisabled = !username || !content
    const disabledStyle = isDisabled ? {cursor: 'not-allowed'} : null
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名: </span>
          <div className="comment-field-input">
            <input value={username} 
              onBlur={this.handleNameBlur}
              onChange={this.handleInputClick}
            />
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论内容: </span>
          <div className="comment-field-input">
            <textarea value={content}
              ref={(e) => this.textareaEl = e}
              onChange={this.handleTextareaClick}
            />
          </div>
        </div>
        <div className="comment-field-button">
          <button
            onClick={this.handleSubmit}
            disabled={isDisabled}
            style={disabledStyle}
          >
            发布
          </button>
        </div>
      </div>
    )
  }
}

export default CommentInput