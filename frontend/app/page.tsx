'use client'

import { useState, useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'

import '@/app/i18n'

import Spinner from 'react-bootstrap/Spinner'

import styles from './page.module.scss'
import { PostType } from './core/domain/post'

import getPosts from '@/app/api/posts/getPosts'
import Posts from '@/app/components/Posts'

import { PostsContext, PostsDispatchContext, postsReducer } from './PostsContext'

export default function Home() {
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [postsInitial, setPostsInitial] = useState<Array<PostType>>([])

  const [posts, dispatch] = useReducer(postsReducer, postsInitial);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true)
      getPosts({})
        .then((loadedPosts: Array<PostType>) => {
          setPostsInitial(loadedPosts)

          dispatch({
            type: 'set',
            posts: loadedPosts,
          })
        })
        .catch((err: any) => {
          console.log('error')
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [])

  let loadingView = (null)
  let postsView = (null)

  if (isLoading) {
    loadingView = (
      <div className={styles.loading}>
        <Spinner
          animation="border"
          variant="success"
          role="status"
        >
        </Spinner>
        <div className={styles.info}>
          {t('domain:posts:loading')}
        </div>
      </div>
    )
  } else {
    postsView = (<Posts />)
  }

  return (
    <main className={styles.main}>
      <PostsContext.Provider value={posts}>
        <PostsDispatchContext.Provider value={dispatch}>
          {loadingView}
          {postsView}
        </PostsDispatchContext.Provider>
      </PostsContext.Provider>
    </main>
  )
}
