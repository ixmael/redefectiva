import Table from 'react-bootstrap/Table'

import { PostType } from "@/app/core/domain/post"

import PostRow from './postRow'

export type PostProps = {
  posts: Array<PostType>;
}

export default function Posts(props: PostProps) {
  const {
    posts,
  } = props

  let postsView = (<div>sin publicaciones</div>)
  if (posts.length > 0) {
    postsView = (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User's ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: PostType) => (
            <PostRow
              key={post.id}
              post={post} />
          ))}
        </tbody>
      </Table>
    )
  }

  return postsView
}
