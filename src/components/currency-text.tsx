import classNames from 'classnames'
import { PureComponent, ReactNode } from 'react'
import { NumericFormat } from 'react-number-format'

class CurrencyText extends PureComponent<{ className?: string; value: number | string | null }> {
  render(): ReactNode {
    const { value, className } = this.props
    return (
      <NumericFormat
        displayType="text"
        prefix="¥"
        renderText={value => {
          return <div className={classNames('text-right', className)}>{value}</div>
        }}
        thousandSeparator=","
        value={value}
        valueIsNumericString={true}
      />
    )
  }
}

export default CurrencyText
