import { Divider } from 'antd'
import { PropsWithChildren, ReactNode, forwardRef } from 'react'

import { cn } from '@/lib/utils'

const HeaderDropdownPopup = forwardRef<HTMLDivElement, PropsWithChildren<{ menu?: ReactNode; className?: string }>>(
  ({ menu, className, children }, ref) => {
    return (
      <div className={cn('header-dropdown-popup', className)} ref={ref}>
        {children}
        {children && <Divider className="divider" />}
        {menu || <></>}
      </div>
    )
  }
)

HeaderDropdownPopup.displayName = 'HeaderDropdownPopup'

export default HeaderDropdownPopup
