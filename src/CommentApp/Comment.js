import React, {Component} from 'react'

class Comment extends Component {
  render () {
    const {username, content} = this.props
    return (
      <div className='comment'>
        <div className="comment-user">
          <span className='comment-username'>{username}</span>:
          {/* <span dangerouslySetInnerHTML={{__html:'<hr />'}}></span> */}
        </div>
        <p className='comment-content'>{content}</p>
      </div>
    )
  }
}

export default Comment