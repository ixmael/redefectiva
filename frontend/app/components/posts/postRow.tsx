import { PostType } from "@/app/core/domain/post"

export type PostRowProps = {
  post: PostType;
}

export default function PostRow(props: PostRowProps) {
  const {
    post,
  } = props

  return (
    <tr>
      <td>{post.id}</td>
      <td>{post.userId}</td>
      <td>{post.title}</td>
      <td>{post.body}</td>
    </tr>
  )
}
