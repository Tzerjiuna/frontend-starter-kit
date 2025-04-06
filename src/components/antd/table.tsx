import { Table as AntdTable, TableProps } from 'antd'
import classNames from 'classnames'

// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forward_and_create_ref/
function Table<T>({ className, pagination, ...props }: TableProps<T>) {
  return (
    <AntdTable<T>
      className={classNames('app-table', className)}
      pagination={{
        ...pagination,
        simple: true,
        size: 'small',
        position: ['none', 'bottomCenter'],
        pageSize: 25,
        showSizeChanger: false
      }}
      size="small"
      tableLayout="fixed"
      {...props}
    />
  )
}

export default Table
