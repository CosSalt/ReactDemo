import React,{ Component } from 'react'
import Comment from './Comment'

class CommentList extends Component {
  static defaultProps = {
    comments: []
  }
  _filterProps (data = {}) {
    const {id, ...args} = data
    return args
  }
  render() {
    const comments = this.props.comments
    const filterProps = this._filterProps
    return (
      <div>
        {
          comments.map(comment => {
            return (
              <Comment {...filterProps(comment)} key={comment.id} />
            )
          })
        }
      </div>
    )
  }
}

export default CommentList