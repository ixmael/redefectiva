import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import Alert from 'react-bootstrap/Alert'

import { PostType } from "@/app/core/domain/post"
import Filters from '@/app/components/PostsFilters'

import { PostsContext } from '@/app/PostsContext'

import styles from './posts.module.scss'
import PostRow from './postRow'

export default function Posts() {
  const { t } = useTranslation();
  const posts = useContext(PostsContext)

  let postsView = (
    <Alert variant="warning">
      {t('domain:posts:empty')}
    </Alert>
  )
  // let filtersView = (null)
  let filtersView = (<Filters />)

  if (posts.length > 0) {
    postsView = (
      <div className={styles.content}>
        {posts.map((post: PostType) => (
          <PostRow
            key={post.id}
            post={post}
          />
        ))}
      </div>
    )

    // filtersView = (<Filters />)
  }

  return (
    <div className={styles.posts}>
      <div className={styles.header}>
        <h2>
          {t('glossary:posts')}
        </h2>
      </div>
      {filtersView}
      {postsView}
    </div>
  )
}
