import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'

class Comment extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired, 
    content: PropTypes.string.isRequired,
    timeString: PropTypes.string.isRequired,
    onDeleteComment: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
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
    if (/`[\s\S]`/g.test(content)) {
      commentContent = (
        <Fragment dangerouslySetInnerHTML={{__html:'<hr />' + content}} />
      )
    } else {
      commentContent = content
    }
    return (
      <div className='comment'>
        <div className="comment-user">
          <span className='comment-username'>{username}</span>:
          {/* <span dangerouslySetInnerHTML={{__html:'<hr />'}}></span> */}
        </div>
        <p className='comment-content'>{commentContent}</p>
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