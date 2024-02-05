import { Tag } from '@codegouvfr/react-dsfr/Tag'
import { useSelector } from 'react-redux'
import { feedbackResume } from '../../constants/feedback'

export function UserFeedbackResume({ feedback }) {
  return (
    <div role={feedbackResume} className="wrap-message fr-mb-2w">
      {feedback.reasons.map((button, index) => (
        <Tag key={index} className="fr-m-1v">
          {button}
        </Tag>
      ))}
    </div>
  )
}