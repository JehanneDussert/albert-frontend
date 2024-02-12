import { Card } from '@codegouvfr/react-dsfr/Card'
import { Tag } from '@codegouvfr/react-dsfr/Tag'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ArchiveType, RootState } from 'types'
import { meetingQRTitle } from '../../constants/meeting'
import { GlobalSecondaryTitle } from '../Global/GlobalSecondaryTitle'

/*****************************************************************************************
	
	COMPONENTS:

		Frequently asked question suggestions
		For now we get the related questions from the sheets
 *****************************************************************************************/
export function MeetingQR({
  archive,
  setQuestion,
}: {
  archive: ArchiveType | undefined
  setQuestion: React.Dispatch<React.SetStateAction<string>>
}) {
  const sheets = archive
    ? archive.sheets
    : useSelector((state: RootState) => state.user.sheets)
  const [relatedQuestions, setRelatedQuestions] = useState([])

  useEffect(() => {
    if (!sheets || !sheets.length) return

    let updatedQuestions = []
    setRelatedQuestions([])

    sheets.forEach((sheet) => {
      sheet.related_questions &&
        sheet.related_questions.forEach((qr) => {
          const object = updatedQuestions.some((obj) => {
            return obj.sid === qr.sid
          })

          if (!object)
            updatedQuestions = [
              ...updatedQuestions,
              { question: qr.question, sid: qr.sid, url: qr.url },
            ]
        })
    })
    setRelatedQuestions(updatedQuestions)
  }, [sheets])

  return (
    <>
      {relatedQuestions.length !== 0 && (
        <p className="fr-pt-4w fr-mb-2w">{meetingQRTitle}</p>
      )}
      {relatedQuestions.slice(0, 3).map((rq, index) => {
        return (
          <div className="fr-mb-3v" key={index} onClick={() => setQuestion(rq.question)}>
            <div
              style={{
                width: '100%',
                height: '100%',
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 12,
                paddingBottom: 12,
                background: '#F5F5FE',
                borderRadius: 5,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: 10,
                display: 'inline-flex',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  color: '#3A3A3A',
                  fontSize: 16,
                  fontFamily: 'Marianne',
                  fontWeight: '400',
                  wordWrap: 'break-word',
                }}
              >
                {rq.question}
              </div>
            </div>
            {/*             <Card
              background
              border
              end={<Tag>{rq.sid}</Tag>}
              enlargeLink
              linkProps={{ href: rq.url }}
              size="small"
              title={rq.question}
              titleAs="h6"
            /> */}
          </div>
        )
      })}
    </>
  )
}
