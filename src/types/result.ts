import { IPagingRes } from './paging'

export type IResult<T> = {
  data: T
  meta?: IPagingRes
}
