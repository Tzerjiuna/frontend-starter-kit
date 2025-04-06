import { Typography } from 'antd'

const { Text } = Typography

const TextEllipsisMiddle: React.FC<{
  suffixCount: number
  children: string
}> = ({ suffixCount, children }) => {
  const start = children.slice(0, children.length - suffixCount).trim()
  const suffix = children.slice(-suffixCount).trim()

  return children.length >= suffixCount ? (
    <Text ellipsis={{ suffix }} style={{ maxWidth: '100%' }}>
      {start}
    </Text>
  ) : (
    <Text ellipsis>{children}</Text>
  )
}

export default TextEllipsisMiddle
