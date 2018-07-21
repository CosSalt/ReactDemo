import React,{Component} from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import PropTypes from 'prop-types'
import fnWrapLocalStorage from '../HigherComponent/fnWrapLocalStorage'
import './index2.css'
import './myIndex.css'

class CommentApp extends Component {
  static propTypes = {
    data: PropTypes.any,
    saveData: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      comments: props.data
    }
  }
  
  componentWillMount () {
    // const {comments} = this._getFromLocalStorage('comments')
    const {comments} = this.state
    if (comments) {
      this._autoUpdateTimeString(comments)
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

  _autoUpdateTimeString = (comments = this.state.comments) => {
    const key = 'comments'
    comments = this._updateTimeString(comments)
    this._stateChange(key, comments)
  }

  _saveLocalStorage(key, val) {
    if (!key) return
    this.props.saveData(val)
    // localStorage.setItem(key, val)
  }

  _stateChange(propName, val, needSave = false) {
    this.setState({
      [propName]: val
    })
    if(needSave && propName === 'comments') {
      if(!val || val.length <= 0) debugger
      this._saveLocalStorage(propName, val)
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

  handleDeleteComment = (index) => {
    const key = 'comments'
    let comments = [...this.state.comments]
    comments.splice(index, 1)
    this._stateChange(key, comments, true)
  }
  
  handleSubmit = (data = {}) => {
    const comments = [...this.state.comments]
    data.id = Date.now().toString() // 时间戳作为ID
    data.timeString = this._getTimeString(0)
    comments.push(data)
    this._stateChange('comments', comments, true)
  }
  render () {
    const {comments} = this.state
    return (
      <div className='wrapper'>
        <CommentInput onSubmit={this.handleSubmit}/>
        <CommentList
          comments={comments} 
          onDeleteComment={this.handleDeleteComment}
        />
      </div>
    )
  }
}

CommentApp = fnWrapLocalStorage(CommentApp, 'comments')

export default CommentApp