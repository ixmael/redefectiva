import { useState, forwardRef, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import FilterIcon from '@/app/assets/icons/filter'
import SortIcon from '@/app/assets/icons/sort'
import SortDownIcon from '@/app/assets/icons/sortDown'
import SortUpIcon from '@/app/assets/icons/sortUp'
import CloseIcon from '@/app/assets/icons/close'

import { PostsDispatchContext } from '@/app/PostsContext'

import styles from './filters.module.scss'

import Form from './Form'

export default function PostsFilters() {
  const { t } = useTranslation()

  const dispatch = useContext(PostsDispatchContext)

  const [filters, setFilters] = useState<any>({
    usersIDs: [],
    content: '',
  })

  const [sort, setSort] = useState<string>('')

  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    dispatch({
      type: 'sort',
      sort,
    })
  }, [sort])

  useEffect(() => {
    dispatch({
      type: 'filtering',
      filters,
    })
  }, [JSON.stringify(filters)])

  const onSort = () => {
    let newSort = ''

    if (sort === '') {
      newSort = 'up'
    } else if (sort === 'up') {
      newSort = 'down'
    }

    setSort(newSort)
  }

  const onFiltering = (newFilters: any) => {
    setFilters(newFilters)
    setIsOpen(false)
  }

  let filtersForm = (null)
  let filtersView = (
    <div className={styles.empty}>
      {t('domain:filters:empty')}
    </div>
  )

  if (filters.usersIDs.length > 0 || filters.content !== '') {
    let usersIDsView = (null)
    if (filters.usersIDs.length > 0) {
      usersIDsView = (
        <div className={styles.userids}>
          {t('domain:filters:content:usersids')}: {filters.usersIDs.join(', ')}
        </div>
      )
    }

    let contentView = (null)
    if (filters.content !== '') {
      contentView = (
        <div className={styles.content}>
          {t('domain:filters:content:title')}: {filters.content}
        </div>
      )
    }

    filtersView = (
      <div className={styles.filtersList}>
        <div className={styles.filtersTitle}>
          {t('domain:filters:filterby')}
        </div>
        {usersIDsView}
        {contentView}
      </div>
    )
  }

  if (isOpen) {
    filtersForm = (<Form filters={filters} onFiltering={onFiltering} />)
  }

  let sortMessage = t('domain:posts:order:id')
  let sortIcon = (
    <SortIcon fill="rgba(0,0,0,0.9)" width={32} height={32} />
  )
  if (sort === 'down') {
    sortIcon = (
      <SortDownIcon fill="rgba(0,0,0,0.9)" width={32} height={32} />
    )
    sortMessage = t('domain:posts:order:down')
  } else if (sort === 'up') {
    sortIcon = (
      <SortUpIcon fill="rgba(0,0,0,0.9)" width={32} height={32} />
    )
    sortMessage = t('domain:posts:order:up')
  }

  let filterIcon = (
    <FilterIcon fill="rgba(0,0,0,0.9)" width={32} height={32} />
  )
  if (isOpen) {
    filterIcon = (
      <CloseIcon fill="rgba(0,0,0,0.9)" width={32} height={32} />
    )
  }

  return (
    <div className={styles.filters}>
      <button
        title={sortMessage}
        onClick={onSort}
        disabled={isOpen}
      >
        {sortIcon}
      </button>
      <button
        onClick={() => setIsOpen(!isOpen)}
      >
        {filterIcon}
      </button>
      {filtersView}
      {filtersForm}
    </div>
  )
}
