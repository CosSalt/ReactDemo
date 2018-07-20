import React,{Component} from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import './index2.css'
import './myIndex.css'

class CommentApp extends Component {
  constructor () {
    super()
    this.state = {
      comments: []
    }
  }
  
  componentWillMount () {
    const {comments} = this._getFromLocalStorage('comments')
    if (comments) {
      this._autoUpdateTimeString(JSON.parse(comments))
    }
    this._timeUpdateTimer = setInterval(this._autoUpdateTimeString, 5000)
  }

  componentWillUnmount () {
    clearInterval(this._timeUpdateTimer)
  }

  _getTimeString (seconds=0) {
    let str = ''
    if(seconds === 0) {
      str = '刚刚'
    } else {
      str = seconds > 60
        ? `${Math.round(seconds / 60)} 分钟前`
        : `${Math.round(Math.max(seconds, 1))} 秒前`
    }
    return str
  }

  _updateTimeString (comments) {
    const getTimeString = this._getTimeString
    const timeNow = Date.now()
    return comments.map(comment => {
      const duration =( timeNow - comment.createdTime) / 1000
      return Object.assign({}, comment, {
        timeString: getTimeString(duration)
      })
    })
  }

  _autoUpdateTimeString = () => {
    let {comments} = this.state
    const key = 'comments'
    comments = this._updateTimeString(comments)
    this._stateChange(key, comments)
  }

  _saveLocalStorage(key, val) {
    if (!key) return
    localStorage.setItem(key, val)
  }

  _stateChange(propName, val) {
    this.setState({
      [propName]: val
    })
    if(propName === 'comments') {
      this._saveLocalStorage(propName, JSON.stringify(val))
    }
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
  
  handleSubmit = (data = {}) => {
    const comments = [...this.state.comments]
    const len = comments.length
    data.id = data.username + '_' + len
    data.timeString = this._getTimeString(0)
    comments.push(data)
    this._stateChange('comments', comments)
  }
  render () {
    const {comments} = this.state
    return (
      <div className='wrapper'>
        <CommentInput onSubmit={this.handleSubmit}/>
        <CommentList comments={comments} />
      </div>
    )
  }
}

export default CommentApp