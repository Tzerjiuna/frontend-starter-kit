'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { UseFormReturn, useForm } from 'react-hook-form'
import { z } from 'zod'

/**
 * Custom hook that creates a form with Zod validation
 *
 * @param schema - Zod schema for validation
 * @param defaultValues - Default values for the form
 * @returns A useForm hook with Zod validation
 */
export function useZodForm<TSchema extends z.ZodType>(
  schema: TSchema,
  defaultValues?: Partial<z.infer<TSchema>>
): UseFormReturn<z.infer<TSchema>> {
  return useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as z.infer<TSchema>
  })
}

/**
 * Helper function to create a form with Zod validation
 * This is a non-hook version for cases where you can't use hooks directly
 */
export function createZodFormConfig<TSchema extends z.ZodType>(
  schema: TSchema,
  defaultValues?: Partial<z.infer<TSchema>>
) {
  return {
    resolver: zodResolver(schema),
    defaultValues: defaultValues as z.infer<TSchema>
  }
}

/**
 * Helper function to get a validation error message from Zod validation errors
 *
 * @param errors - Zod validation errors
 * @param path - Path to the field
 * @returns Error message
 */
export function getZodErrorMessage(errors: Record<string, unknown>, path: string): string | undefined {
  const error = errors[path]
  if (!error) return undefined

  return (error as { message?: string }).message
}

/**
 * Type for translation function
 */
type TranslationFunction = (key: string, options?: Record<string, unknown>) => string

/**
 * Common Zod validators with i18n support
 */
export const validators = {
  required: (_field: string, t: TranslationFunction) => {
    return z.string().min(1, t('common:validations.required'))
  },

  email: (t: TranslationFunction) => {
    return z.string().email(t('common:validations.email'))
  },

  url: (t: TranslationFunction) => {
    return z.string().url(t('common:validations.url'))
  },

  min: (_field: string, length: number, t: TranslationFunction) => {
    return z.string().min(length, t('common:validations.min', { length }))
  },

  max: (_field: string, length: number, t: TranslationFunction) => {
    return z.string().max(length, t('common:validations.max', { length }))
  },

  integer: (_field: string, t: TranslationFunction) => {
    return z.string().regex(/^\d+$/, t('common:validations.integer'))
  },

  decimal: (_field: string, t: TranslationFunction) => {
    return z.string().regex(/^\d+(\.\d+)?$/, t('common:validations.decimal'))
  },

  phone: (t: TranslationFunction) => {
    return z.string().regex(/^\+?[0-9]{6,15}$/, t('common:validations.phone'))
  }
  // Add more validators as needed
}
