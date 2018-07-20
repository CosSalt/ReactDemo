import React,{Component} from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import './index.css'

class CommentApp extends Component {
  constructor () {
    super()
    this.state = {
      comments: []
    }
  }
  onSubmit = (data = {}) => {
    const comments = [...this.state.comments]
    const len = comments.length
    data.id = data.username + '_' + len
    comments.push(data)
    this.setState({
      comments
    })
  }
  render () {
    const {comments} = this.state
    return (
      <div className='wrapper'>
        <CommentInput onSubmit={this.onSubmit}/>
        <CommentList comments={comments} />
      </div>
    )
  }
}

export default CommentApp