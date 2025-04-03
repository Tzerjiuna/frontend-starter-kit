import { DatePickerProps } from 'antd/es/date-picker'
import { SelectProps } from 'antd/es/select'
import { Dayjs } from 'dayjs'
import { ChangeEvent } from 'react'
import { Control, ControllerProps, FieldValues } from 'react-hook-form'

interface BaseFormControl {
  name: string
  className?: string
  width?: number
  testId?: string
  disabled?: boolean
  control: Control<FieldValues, unknown>
  showError?: boolean
  validationRules?: ControllerProps['rules']
}

export interface IDatePicker extends BaseFormControl {
  isLoading?: boolean
  dateFormat?: string
  disabledDate?: DatePickerProps['disabledDate']
  showTime?: boolean
  getPopupContainer?: DatePickerProps['getPopupContainer']
  cellRender?: DatePickerProps<Dayjs>['cellRender']
  placeholder?: string
  onChange?: (event: Dayjs | null) => void
}

export interface IDateRangePicker extends Omit<IDatePicker, 'placeholder'> {
  placeholder?: [string, string]
}

export interface IInput extends BaseFormControl {
  placeholder?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export interface IInputNumber extends IInput {
  min?: number
  max?: number
}

export interface ITag extends IInput {
  options?: SelectProps['options']
}
