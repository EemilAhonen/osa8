import React from 'react'
import { RECOMMENDED_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Recommendations = (props) => {
  console.log(props.favoriteGenre)
  const favoriteGenre =
    props.favoriteGenre.data.me === null
      ? ''
      : props.favoriteGenre.data.me.favoriteGenre
  const books = useQuery(RECOMMENDED_BOOKS, {
    variables: { genre: favoriteGenre },
  })

  if (!props.show) {
    return null
  }

  if (books.loading) {
    return <div>loading...</div>
  }

  if (favoriteGenre === '') {
    return <div>Choose a favourite genre</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre {favoriteGenre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
