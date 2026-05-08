'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks
  const { isBreakpointReached } = useVerticalNav()

  return (
    <div
      className={classnames(verticalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      <p>
        <span className='text-textSecondary'>{`© ${new Date().getFullYear()}, Développer  `}</span>
        <span></span>
        <span className='text-textSecondary'>{` par `}</span>
        <Link href='#' className='text-primary uppercase'>
          TAD IT CONSULTING
        </Link>
      </p>
      {!isBreakpointReached && (
        <div className='flex items-center gap-4'>
          <Link href='#'  className='text-primary'>
            Licence
          </Link>
          <Link href='#' className='text-primary'>
           Plus de thèmes
          </Link>
          <Link
            href='#'
            className='text-primary'
          >
            Documentation
          </Link>
          <Link href='#' className='text-primary'>
            Soutien
          </Link>
        </div>
      )}
    </div>
  )
}

export default FooterContent
