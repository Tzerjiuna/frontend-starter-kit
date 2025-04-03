import { IPost } from '@/types/post'

/**
 * Mock data for the application
 * This centralizes our mock data to avoid duplication across API routes
 */

// Mock posts data
export const mockPosts: IPost[] = [
  {
    id: '1',
    title: 'Understanding React Hooks',
    createdDate: '2023-08-07T12:34:56Z',
    author: 'John Doe',
    content: 'React Hooks are functions that let you use state and other React features without writing a class...',
    tags: ['React', 'JavaScript', 'Frontend']
  },
  {
    id: '2',
    title: 'A Guide to Node.js',
    createdDate: '2023-08-06T11:22:33Z',
    author: 'Jane Smith',
    content: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine...",
    tags: ['Node.js', 'Backend', 'JavaScript']
  },
  {
    id: '3',
    title: 'CSS Grid Layout',
    createdDate: '2023-08-05T10:11:22Z',
    author: 'Alice Johnson',
    content: 'CSS Grid Layout is a two-dimensional layout system for the web...',
    tags: ['CSS', 'Frontend', 'Design']
  },
  {
    id: '4',
    title: 'Introduction to TypeScript',
    createdDate: '2023-08-04T09:00:11Z',
    author: 'Bob Brown',
    content: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript...',
    tags: ['TypeScript', 'JavaScript', 'Frontend']
  },
  {
    id: '5',
    title: 'Building REST APIs with Express',
    createdDate: '2023-08-03T08:45:00Z',
    author: 'Charlie Davis',
    content: 'Express is a minimal and flexible Node.js web application framework...',
    tags: ['Express', 'Node.js', 'Backend']
  }
]

// Helper function to get a post by ID
export function getPostById(id: string): IPost | undefined {
  return mockPosts.find(post => post.id === id)
}

// Helper function to create a post
export function createPost(post: Omit<IPost, 'id' | 'createdDate'>): IPost {
  const newPost: IPost = {
    ...post,
    id: String(mockPosts.length + 1),
    createdDate: new Date().toISOString()
  }

  // In a real implementation, you'd persist this
  // mockPosts.push(newPost)

  return newPost
}

// Helper function to update a post
export function updatePost(id: string, post: Partial<IPost>): IPost | null {
  const index = mockPosts.findIndex(p => p.id === id)
  if (index === -1) return null

  // In a real implementation, you'd update the actual array
  return {
    ...mockPosts[index],
    ...post
  }
}

// Helper function to delete a post
export function deletePost(id: string): boolean {
  const index = mockPosts.findIndex(p => p.id === id)
  if (index === -1) return false

  // In a real implementation, you'd actually remove it
  // mockPosts.splice(index, 1)

  return true
}
