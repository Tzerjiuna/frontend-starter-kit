export interface IPost {
  id: string
  title: string
  createdDate: string
  author: string
  content: string
  tags: string[]
}

export interface IPostFormValues {
  title: string
  author: string
  content: string
  tags: string[]
}
