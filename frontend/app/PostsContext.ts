import { createContext } from 'react'

import { PostType } from './core/domain/post'

export const PostsContext = createContext([])
export const PostsDispatchContext = createContext(null)

let initialPosts: Array<PostType> = []

export const postsReducer = (posts: Array<PostType>, action: any) => {
  switch (action.type) {
    case 'set': {
      initialPosts = action.posts

      return action.posts
    }
    case 'sort': {
      const orderedPosts = posts.slice()

      switch (action.sort) {
        case 'up':
          orderedPosts.sort((a: PostType, b: PostType) => {
            if (a.title < b.title) {
              return -1
            } else if (a.title > b.title) {
              return 1
            } else {
              return 0
            }
          })
          break
        case 'down':
          orderedPosts.sort((a: PostType, b: PostType) => {
            if (a.title > b.title) {
              return -1
            } else if (a.title < b.title) {
              return 1
            } else {
              return 0
            }
          })
          break
        default:
          orderedPosts.sort((a: PostType, b: PostType) => {
            if (a.id > b.id) {
              return -1
            } else if (a.id < b.id) {
              return 1
            } else {
              return 0
            }
          })
      }

      return orderedPosts
    }
    case 'filtering':
      if (action.filters.usersIDs.length === 0 && action.filters.content === '') {
        return initialPosts
      }

      let filteredPosts = initialPosts.slice()

      if (action.filters.usersIDs.length > 0) {
        filteredPosts = filteredPosts.filter((post: PostType) => {
          if (action.filters.usersIDs.indexOf(post.userId) >= 0) {
            return true
          }

          return false
        })
      }

      if (action.filters.content !== '') {
        filteredPosts = filteredPosts.filter((post: PostType) => {
          if (post.body.match(action.filters.content)) {
            return true
          }

          return false
        })
      }

      return filteredPosts
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
