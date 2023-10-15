import { PostType } from "@/app/core/domain/post"

export default function getPosts(_: any): Promise<Array<PostType>> {
  const url = new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URI}/posts`);

  const request = new Request(url)
  return fetch(request)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }

      // Checking the response
      if (response.status === 404) {
        throw new Error("unauthorized")
      } else if (response.status === 400) {
        throw new Error("there is an error in your data")
      } else if (response.status >= 500) {
        throw new Error("there is an error in the server")
      }

      throw new Error("unknown error")
    })
    .then((posts: Array<PostType>) => {
      return posts.sort((a: PostType, b: PostType) => {
        if (a.id > b.id) {
          return -1
        } else if (a.id < b.id) {
          return 1
        } else {
          return 0
        }
      })
    })
}
