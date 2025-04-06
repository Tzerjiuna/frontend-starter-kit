export const DEFAULT_PAGING_VALUES: IPagingReq = {
  number: 1,
  size: 25
}

export interface IPagingReq {
  number: number
  size: number
}

export interface IPagingRes {
  totalCount: number
  totalPages: number
}

export interface IPaging extends IPagingReq, IPagingRes {}
