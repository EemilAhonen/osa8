import React, { useState } from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const books = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState(null)

  if (!props.show) {
    return null
  }

  if (books.loading) {
    return <div>loading...</div>
  }

  const genres = [...new Set(books.data.allBooks.map((b) => b.genres).flat(1))]
  const filteredBooks = genre
    ? books.data.allBooks.filter((b) => b.genres.includes(genre))
    : books.data.allBooks

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((g) => (
          <button key={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
