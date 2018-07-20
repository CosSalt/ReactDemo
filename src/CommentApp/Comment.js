import React, {Component} from 'react'

class Comment extends Component {
  render () {
    const {username, content, timeString} = this.props
    return (
      <div className='comment'>
        <div className="comment-user">
          <span className='comment-username'>{username}</span>:
          {/* <span dangerouslySetInnerHTML={{__html:'<hr />'}}></span> */}
        </div>
        <p className='comment-content'>{content}</p>
        <span className="comment-createdtime">{timeString}</span>
      </div>
    )
  }
}

export default Comment