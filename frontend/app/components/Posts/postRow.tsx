import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useTranslation } from 'react-i18next'

import styles from './post.module.scss'

import { PostType } from "@/app/core/domain/post"

export type PostRowProps = {
  post: PostType;
}

export default function PostRow(props: PostRowProps) {
  const { t } = useTranslation()

  const {
    post,
  } = props

  return (
    <Row>
      <Col>
        <div className={styles.header}>
          <h3>{post.title}</h3>
          <div className={styles.metadata}>
            <div className={styles.metadataUserID}>
              <div>{t('domain:posts:userid')}</div>
              <div>{post.userId}</div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          {post.body}
        </div>
      </Col>
    </Row>
  )
}
