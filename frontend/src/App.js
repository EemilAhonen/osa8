import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { ALL_AUTHORS, ME } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const favoriteGenre = useQuery(ME)
  const authors = useQuery(ALL_AUTHORS)

  useEffect(() => {
    const token = localStorage.getItem('books-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  if (authors.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    setPage('authors')
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <button onClick={() => setPage('add')}>add book</button>
        )}
        {token && !favoriteGenre.loading && favoriteGenre.data ? (
          <button onClick={() => setPage('recommendations')}>recommend</button>
        ) : (
          <div></div>
        )}
        {token ? <button onClick={logout}>logout</button> : <div></div>}
      </div>

      <Authors authors={authors.data.allAuthors} show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} favoriteGenre={favoriteGenre} />
      <Recommendations
        show={page === 'recommendations'}
        favoriteGenre={favoriteGenre}
      />
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App
