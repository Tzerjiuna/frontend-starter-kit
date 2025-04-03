import { Dayjs } from 'dayjs'
import * as dayjsCore from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

// Using the imported core to avoid ESLint warnings
const dayjs = dayjsCore
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)
dayjs.tz.setDefault('Asia/Tokyo')

export default dayjs

export { Dayjs }
