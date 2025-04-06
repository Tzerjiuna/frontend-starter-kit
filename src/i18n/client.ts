'use client'

import { FlatNamespace, KeyPrefix } from 'i18next'
import * as i18nextCore from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import {
  FallbackNs,
  UseTranslationOptions,
  UseTranslationResponse,
  initReactI18next,
  useTranslation as useTranslationOrg
} from 'react-i18next'

import { cookieName, getOptions, languages } from './settings'

const runsOnServerSide = typeof window === 'undefined'

// Using the imported core to avoid ESLint warnings
const i18next = i18nextCore

// on client side the normal singleton is ok
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator']
    },
    preload: runsOnServerSide ? languages : []
  })

/**
 * Hook for using translations in client components
 *
 * @param lng - The language code to use (e.g., 'en', 'ja')
 * @param ns - Namespace or array of namespaces to load
 * @param options - Additional options for the translation hook
 *
 * @returns Translation response object with t function and i18n instance
 *
 * @example
 * // Using default namespace with namespace prefix in the key
 * const { t } = useClientTranslation('en')
 * return <button>{t('common:actions.submit')}</button>
 *
 * @example
 * // Basic usage with a single namespace
 * const { t } = useClientTranslation('en', 'auth')
 * return <p>{t('heading')}</p>
 *
 * @example
 * // Using multiple namespaces
 * const { t } = useClientTranslation('en', ['common', 'auth', 'profile'])
 * return (
 *   <>
 *     <p>{t('common:welcome')}</p>
 *     <button>{t('auth:login')}</button>
 *     <p>{t('profile:settings')}</p>
 *   </>
 * )
 */
export function useClientTranslation<Ns extends FlatNamespace, KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined>(
  lng: string,
  ns?: Ns | Ns[],
  options?: UseTranslationOptions<KPrefix>
): UseTranslationResponse<FallbackNs<Ns>, KPrefix> {
  const [cookies, setCookie] = useCookies([cookieName])
  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng)
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return
      setActiveLng(i18n.resolvedLanguage)
    }, [activeLng, i18n.resolvedLanguage])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!lng || i18n.resolvedLanguage === lng) return
      i18n.changeLanguage(lng)
    }, [lng, i18n])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (cookies.i18next === lng) return
      setCookie(cookieName, lng, { path: '/' })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lng, cookies.i18next])
  }
  return ret
}

export default i18next
