'use client'

import { ComponentPropsWithoutRef, HTMLAttributes, LabelHTMLAttributes, createContext, useContext, useId } from 'react'
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from 'react-hook-form'

import { cn } from '@/lib/utils'

// FormField Component: Context and Types
// ------------------------------------

const FormFieldContext = createContext<{ id: string }>({ id: '' })

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  const id = useId()

  return (
    <FormFieldContext.Provider value={{ id }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

// Form Item Component
// ------------------------------------

interface FormItemProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  error?: string
}

export function FormItem({ className, error, ...props }: FormItemProps) {
  const { id } = useContext(FormFieldContext)

  return (
    <div className={cn('space-y-2 mb-4', className)} {...props}>
      {props.children}
      {error && (
        <p className="text-sm font-medium text-red-500" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}

// Form Label Component
// ------------------------------------

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export function FormLabel({ className, required, ...props }: FormLabelProps) {
  const { id } = useContext(FormFieldContext)

  return (
    <label
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      htmlFor={id}
      {...props}
    >
      {props.children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  )
}

// Form Control Component
// ------------------------------------

interface FormControlProps extends HTMLAttributes<HTMLDivElement> {}

export function FormControl({ ...props }: FormControlProps) {
  const { id } = useContext(FormFieldContext)

  return <div id={id} {...props} />
}

// Form Description Component
// ------------------------------------

interface FormDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export function FormDescription({ className, ...props }: FormDescriptionProps) {
  const { id } = useContext(FormFieldContext)

  return <p className={cn('text-sm text-gray-500', className)} id={`${id}-description`} {...props} />
}

// Form Message Component
// ------------------------------------

interface FormMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  name?: string
}

export function FormMessage({ className, children, name, ...props }: FormMessageProps) {
  const { formState } = useFormContext()
  const fieldError = name ? formState.errors[name] : null
  const message = (fieldError?.message as string) || children

  if (!message) {
    return null
  }

  return (
    <p className={cn('text-sm font-medium text-red-500', className)} {...props}>
      {message}
    </p>
  )
}

// Form Root Component
// ------------------------------------

export function Form<TFieldValues extends FieldValues>(
  props: ComponentPropsWithoutRef<typeof FormProvider<TFieldValues>>
) {
  return <FormProvider<TFieldValues> {...props} />
}
