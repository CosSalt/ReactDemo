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
  render () {
    const {content, username} = this.state
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
          <button>
            发布
          </button>
        </div>
      </div>
    )
  }
}

export default CommentInput