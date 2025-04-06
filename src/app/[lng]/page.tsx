import { useTranslation } from '@/i18n'

import { ParamProps } from '@/types/common'

export default async function IndexPage({ params: { lng } }: { params: ParamProps }) {
  const { t } = await useTranslation(lng)

  return (
    <div className="flex flex-col gap-4 m-4">
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold my-auto">HOME PAGE</h1>
      </div>
      <hr />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, ipsam asperiores perferendis eum nisi voluptatum
        impedit, deserunt consequuntur tempora magnam ut necessitatibus ullam repudiandae, ipsum iste officiis facilis
        molestias. Quia.
      </p>
      {t('emptyData')}
    </div>
  )
}
