import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import styles from './filters.module.scss'

type FiltersFormType = {
  filters: any;
  onFiltering: (filters: any) => void;
}

export default function PostRow(props: FiltersFormType) {
  const { t } = useTranslation()

  const {
    filters,
    onFiltering,
  } = props;

  const [userID, setUserID] = useState<string>('');

  const [content, setContent] = useState<string>(filters.content);
  const [usersIDs, setUsersIDs] = useState<Array<number>>(filters.usersIDs)

  const onSubmit = (e: any) => {
    e.preventDefault()

    onFiltering({
      usersIDs,
      content,
    })
  }

  const onClear = () => {
    setUsersIDs([])
    setContent('')
  }

  const onAddUserID = () => {
    if (userID !== '') {
      const userIDNumber: number = parseInt(userID, 10)

      if (!isNaN(userIDNumber)) {
        if (usersIDs.indexOf(userIDNumber) === -1) {
          const newUsersIDs = usersIDs.slice()
          newUsersIDs.push(userIDNumber)

          setUsersIDs(newUsersIDs)
        }
      }
    }

    setUserID('')
  }

  let usersIDsView = (<div>{t('domain:filters:users:empty')}</div>)
  if (usersIDs.length > 0) {
    usersIDsView = (
      <div className={styles.usersids}>
        <span>{t('domain:filters:users:selected')}</span>
        <span className={styles.usersidsList}>{usersIDs.join(', ')}</span>
      </div>
    )
  }

  let filtersDescriptionView = (
    <div>
      {t('glossary:nofilters')}
    </div>
  )
  if (usersIDs.length > 0 || content !== '') {
    let idsView = (null)
    if (usersIDs.length > 0) {
      idsView = (
        <div>
          <span>{t('domain:filters:users:selected')}</span>
          <span className={styles.usersidsList}>{usersIDs.join(', ')}</span>
        </div>
      )
    }

    let contentView = (null)
    if (content !== '') {
      contentView = (
        <div>
          <span>{t('domain:filters:content:contains')}</span>
          <span className={styles.content}>{content}</span>
        </div>
      )
    }

    filtersDescriptionView = (
      <div className={styles.filtersDescription}>
        {idsView}
        {contentView}
      </div>
    )
  }

  return (
    <form className={styles.filtersForm} onSubmit={onSubmit}>
      <h2>
        {t('domain:filters:title')}
      </h2>

      <Form.Group className="input-group mb-3 userids">
        <Form.Label className="col-sm-2 col-form-label">
          {t('domain:filters:users:title')}
        </Form.Label>

        <Form.Control type="number" value={userID} onChange={(e: any) => setUserID(e.target.value)} />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={onAddUserID}
        >
          {t('glossary:add')}
        </button>

        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => setUsersIDs([])}
        >
          {t('glossary:clear')}
        </button>

      </Form.Group>

      <Form.Group className="input-group mb-3">
        <Form.Label className="col-sm-2 col-form-label">
          {t('domain:filters:content:title')}
        </Form.Label>
        <Form.Control type="text" value={content} onChange={(e: any) => setContent(e.target.value)} />
      </Form.Group>

      <div>
        {filtersDescriptionView}

        <div className={styles.actions}>
          <Button
            type="button"
            className="col-3"
            variant="outline-dark"
            onClick={onClear}
          >
            {t('glossary:clear')}
          </Button>

          <Button
            type="submit"
            className="col-6"
          >
            {t('glossary:filter')}
          </Button>
        </div>
      </div>
    </form>
  )
}
