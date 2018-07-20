import React,{ Component } from 'react'
import Comment from './Comment'
import PropTypes from 'prop-types'

class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    onDeleteComment: PropTypes.func.isRequired
  }

  static defaultProps = {
    comments: []
  }
  _filterProps (data = {}) {
    const {id, ...args} = data
    return args
  }
  handleDeleteComment = (index) => {
    const {onDeleteComment} = this.props
    if (onDeleteComment) {
      onDeleteComment(index)
    }
  }
  render() {
    const comments = this.props.comments
    const filterProps = this._filterProps
    return (
      <div>
        {
          comments.map((comment, index) => {
            return (
              <Comment {...filterProps(comment)}
                index={index}
                onDeleteComment={this.handleDeleteComment}
                key={comment.id}
              />
            )
          })
        }
      </div>
    )
  }
}

export default CommentList