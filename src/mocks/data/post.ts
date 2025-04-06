import { IPost } from '@/types/post'

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
