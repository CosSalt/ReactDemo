import React,{ Component } from 'react'

class CommentInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      content: ''
    }
  }
  valueChange(propName, val) {
    this.setState({
      [propName]: val
    })
  }
  inputClick = (e) => {
    this.valueChange('username', e.target.value)
  }
  textareaClick = (e) => {
    this.valueChange('content', e.target.value)
  }
  handleSubmit = () => {
    const {onSubmit} = this.props
    if(onSubmit) {
      const {username, content} = this.state
      onSubmit({username, content})
    }
    this.valueChange('content', '')
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
              onChange={this.inputClick}
            />
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论内容: </span>
          <div className="comment-field-input">
            <textarea value={content} 
              onChange={this.textareaClick}
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