import React,{ Component } from 'react'
import fnWrapLocalStorage from '../HigherComponent/fnWrapLocalStorage'
import PropTypes from 'prop-types'

class CommentInput extends Component {
  static propTypes = {
    data: PropTypes.any,
    saveData: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      username: props.data,
      content: ''
    }
  }

  componentDidMount () {
    this.textareaEl.focus()
  }

  _saveToLocalStorage = (key, val) => {
    // localStorage.setItem(key, val)
    if(!key) return
    this.props.saveData(val)
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

CommentInput = fnWrapLocalStorage(CommentInput, 'username')

export default CommentInput