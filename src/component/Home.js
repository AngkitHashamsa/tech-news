import React from 'react'
import { useGlobalContext } from '../actions/context'
const Home = () => {
  const { isLoading, hits, removeArticle } = useGlobalContext()
  // console.log(hits)
  if (isLoading) {
    return <div className='loading'></div>
  }
  return (
    <section className='stories'>
      {hits.map((item) => {
        // console.log(item)
        const { author, num_comments, points, objectID, title, url } = item
        return (
          <article key={objectID} className='story'>
            <h4 className='title'>{title}</h4>
            <p className='info'>
              {points} points by <span>{author} |</span> {num_comments} comments
            </p>
            <div>
              <a
                href={url}
                className='read-link'
                target='_blank'
                rel='noreferrer'
              >
                read more
              </a>
              <button
                className='remove-btn'
                onClick={() => removeArticle(objectID)}
              >
                remove
              </button>
            </div>
          </article>
        )
      })}
    </section>
  )
}

export default Home
