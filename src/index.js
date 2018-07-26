import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {ShoppingList, CommentApp, Gobang} from './ComponentsManage'
import {BrowserRouter, Route, Link} from 'react-router-dom'

const App = () => {
  const h2Style = {
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 500
  }
  const nav = [
    {name: '五子棋', path: '/gobang', component: Gobang, id: 'gobang'},
    {name: '评论', path: '/commentApp', component: CommentApp, id: 'commentApp'},
    {name: 'demo', path: '/shoppingList', component: ShoppingList, id: 'shoppingList'}
  ]
  return (
    <Fragment>
      <h2 style={h2Style}> React App by hosalt </h2>
      <ul>
        {
          nav.map(item => {
            const {name, id, path} = item
            return (
              <li key={id}>
                <Link to={path}>{name}</Link>
              </li>
            )
          })
        }
      </ul>
      {
        nav.map(item => {
          const {id, path, component} = item
          return (
            <Route exact path={path} component={component} key={id} />
          )
        })
      }
    </Fragment>
  )
}

// CommentApp
ReactDOM.render(
  <BrowserRouter>
    <Route path='/' component={App} />
  </BrowserRouter>,
  document.getElementById('root')
)