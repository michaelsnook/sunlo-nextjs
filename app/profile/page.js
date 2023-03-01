'use client'

import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { usePost, usePosts } from '/app/(app)/use-data.js'

export default function Page() {
  const [postId, setPostId] = useState(-1)

  return (
    <>
      <p className="my-6">
        As you visit the posts below, you will notice them in a loading state
        the first time you load them. However, after you return to this list and
        click on any posts you have already visited again, you will see them
        load instantly and background refresh right before your eyes!{' '}
        <strong>
          (You may need to throttle your network speed to simulate longer
          loading sequences)
        </strong>
      </p>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
      <ReactQueryDevtools initialIsOpen />
    </>
  )
}

function Posts({ setPostId }) {
  const session = 0
  const queryClient = useQueryClient(session ?? null)
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
