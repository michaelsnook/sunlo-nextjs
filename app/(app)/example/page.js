'use client'

import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { usePost, usePosts } from 'app/(app)/example/use-data.js'
import { useDeck, useDecks, usePhrases } from 'app/data/hooks'
import ErrorList from 'components/ErrorList'

export function Phrases() {
  const { status, data, error } = usePhrases()

  return status === 'loading' ? (
    <>loading...</>
  ) : status === 'error' ? (
    <ErrorList error={error} />
  ) : (
    <textarea name="something" className="my-6">
      {JSON.stringify(data)}
    </textarea>
  )
}

export function Decks() {
  const { status, data, error } = useDecks()

  return status === 'loading' ? (
    <>loading...</>
  ) : status === 'error' ? (
    <ErrorList error={error} />
  ) : (
    <textarea name="something" className="my-6">
      {JSON.stringify(data)}
    </textarea>
  )
}

export function Deck({ lang }) {
  const { status, data, error } = useDeck(lang)

  return status === 'loading' ? (
    <>loading...</>
  ) : status === 'error' ? (
    <ErrorList error={error} />
  ) : (
    <textarea name="something" className="my-6">
      {JSON.stringify(data)}
    </textarea>
  )
}
// export default function Page({ params }) {
export default function Page() {
  const [postId, setPostId] = useState(-1)

  return (
    <>
      <p className="py-6 container">
        As you visit the posts below, you will notice them in a loading state
        the first time you load them. However, after you return to this list and
        click on any posts you have already visited again, you will see them
        load instantly and background refresh right before your eyes!{' '}
        <strong>
          (You may need to throttle your network speed to simulate longer
          loading sequences)
        </strong>
      </p>
      <div className="container flex">
        <div className="flex-grow">
          <Phrases />
        </div>
        <div className="flex-grow">
          <Decks />
        </div>
        <div className="flex-grow">
          <Deck lang="hin" />
        </div>
      </div>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
    </>
  )
}

function Posts({ setPostId }) {
  const queryClient = useQueryClient()
  const { status, data, error, isFetching } = usePosts()

  return (
    <div className="page-card">
      <h1 className="h1">Posts</h1>
      <div>
        {status === 'loading' ? (
          'Loading...'
        ) : status === 'error' ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data.map(post => (
                <p key={post.id}>
                  <a
                    onClick={() => setPostId(post.id)}
                    href="#"
                    className={`hover:underline ${
                      // We can find the existing query data here to show bold links for
                      // ones that are cached
                      queryClient.getQueryData(['post', post.id])
                        ? 'font-bold text-green-700 '
                        : 'text-primary'
                    }`}
                  >
                    {post.title}
                  </a>
                </p>
              ))}
            </div>
            <div>{isFetching ? 'Background Updating...' : ' '}</div>
          </>
        )}
      </div>
    </div>
  )
}

function Post({ postId, setPostId }) {
  const { status, data, error, isFetching } = usePost(postId)

  return (
    <div className="page-card">
      <div className="py-6">
        <a
          className="hover:underline text-primary py-3"
          onClick={() => setPostId(-1)}
          href="#"
        >
          &larr; Back
        </a>
      </div>
      {!postId || status === 'loading' ? (
        'Loading...'
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <h1 className="h1">{data.title}</h1>
          <div>
            <p>{data.body}</p>
          </div>
          <div>{isFetching ? 'Background Updating...' : ' '}</div>
        </>
      )}
    </div>
  )
}

/*export async function generateStaticParams() {
  const data = languages

  return Object.keys(data).map(code => ({
    code,
  }))
}*/
