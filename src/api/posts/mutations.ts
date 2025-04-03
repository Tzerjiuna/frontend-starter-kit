import { searchData } from '@/actions/api'
import { logger } from '@/lib/logger'
import { IPost } from '@/types/post'

/**
 * Create a new post
 *
 * @param postData - The post data to create
 * @returns True if successful, false otherwise
 */
export async function createPost(postData: Partial<IPost>): Promise<boolean> {
  try {
    const response = await searchData('/posts', postData)
    return response.success
  } catch (error) {
    logger.error('Error creating post:', error)
    return false
  }
}

/**
 * Update an existing post
 *
 * @param id - The ID of the post to update
 * @param postData - The updated post data
 * @returns True if successful, false otherwise
 */
export async function updatePost(id: string, postData: Partial<IPost>): Promise<boolean> {
  try {
    const response = await searchData(`/posts/${id}`, postData)
    return response.success
  } catch (error) {
    logger.error('Error updating post:', error)
    return false
  }
}

/**
 * Delete a post
 *
 * @param id - The ID of the post to delete
 * @returns True if successful, false otherwise
 */
export async function deletePost(id: string): Promise<boolean> {
  try {
    const response = await searchData(`/posts/${id}/delete`, {})
    return response.success
  } catch (error) {
    logger.error('Error deleting post:', error)
    return false
  }
}
