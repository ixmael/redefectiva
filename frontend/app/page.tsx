'use client'

import { useState, useEffect } from 'react'

import styles from './page.module.scss'
import { PostType } from './core/domain/post'

import Posts from '@/app/components/posts'
import getPosts from './api/posts/getPosts'

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [posts, setPosts] = useState<Array<PostType>>([])

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true)
      getPosts()
        .then((posts: Array<PostType>) => {
          setPosts(posts)
        })
        .catch((err: any) => {
          console.log('error')
        })
        .finally(() => {
          console.log('finally')
          setIsLoading(false)
        })
    }
  }, [])

  return (
    <main className={styles.main}>
      {isLoading ? (<span>loading</span>) : (null)}
      <Posts posts={posts} />
    </main>
  )
}
