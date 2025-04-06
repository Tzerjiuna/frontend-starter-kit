import { announcementHandlers } from './announcement'
import { authHandlers } from './auth'
import { postHandlers } from './post'

// Define your handlers here
// Spread all handler arrays into this single array
export const handlers = [
  ...postHandlers,
  ...announcementHandlers,
  ...authHandlers,
]
