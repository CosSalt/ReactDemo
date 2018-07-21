import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Comment extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired, 
    content: PropTypes.string.isRequired,
    timeString: PropTypes.string.isRequired,
    onDeleteComment: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
  }

  _getReplaceStr (str) {
    if(!str || typeof str !== 'string') return
    // 前面的是为了简单的防止 XSS 攻击
    return str.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/`([\s\S]+?)`/g, '<code>$1</code>')
  }

  handleDelete = () => {
    const {onDeleteComment, index} = this.props
    if(onDeleteComment) {
      onDeleteComment(index)
    }
  }

  render () {
    const {username, content, timeString} = this.props
    let commentContent
    if (/`[\s\S]+`/g.test(content)) {
      let newContent = this._getReplaceStr(content)
      commentContent = (
        <p className='comment-content'
          dangerouslySetInnerHTML={{__html: newContent}} />
      )
    } else {
      commentContent = <p className='comment-content'> content </p>
    }
    return (
      <div className='comment'>
        <div className="comment-user">
          <span className='comment-username'>{username}</span>:
          {/* <span dangerouslySetInnerHTML={{__html:'<hr />'}}></span> */}
        </div>
        {commentContent}
        <span className="comment-createdtime">{timeString}</span>
        <span className="comment-delete"
          onClick={this.handleDelete}
        >
          删除
        </span>
      </div>
    )
  }
}

export default Comment