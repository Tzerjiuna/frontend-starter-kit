import { Input as AntdInput } from 'antd'
import classNames from 'classnames'
import { memo } from 'react'
import { Controller } from 'react-hook-form'

import FormErrorMessage from './form-error-message'
import { IInput } from '@/types/components/form-control'

const Input = ({
  name,
  className,
  onChange,
  disabled,
  showError = true,
  control,
  testId,
  validationRules,
  placeholder
}: IInput) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange: onFieldChange, ...restField },
        formState: { isSubmitting },
        fieldState: { error }
      }) => (
        <div className="app-input">
          <AntdInput
            {...restField}
            className={classNames(className, { error: !!error })}
            data-testid={testId}
            disabled={disabled || isSubmitting}
            placeholder={placeholder}
            type="text"
            onChange={event => {
              onFieldChange(event)
              onChange?.(event)
            }}
          />
          <FormErrorMessage message={error?.message} showError={showError} />
        </div>
      )}
      rules={validationRules}
    />
  )
}

export default memo(Input)
