import { useEffect } from 'react'
import { Feedback as FeedbackType, InitialFeedback, RootState } from 'types'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { UserFeedbackInput } from './UserFeedbackInput'
import { UserSatisfactionButtons } from './UserSatisfactionButtons'
import { useSelector } from 'react-redux'

/**
 * This component is the feedback form that the user will see after receiving a response
 * isFirst is a bolean that is :
 * true when giving feedback on a regular response and
 * false when giving feedback on a question that has been regenerated
 */
export function Feedback({
  feedback,
  setFeedback,
}: { feedback: FeedbackType; setFeedback: (feedback: FeedbackType) => void }) {
  const user = useSelector((state: RootState) => state.user)
  console.log('feedback', feedback)
  useEffect(() => {
    setFeedback(InitialFeedback)
  }, [])
  return (
    <GlobalColContainer>
      <UserSatisfactionButtons
        isFirst={true}
        feedback={feedback}
        setFeedback={setFeedback}
      />
      {feedback.isGood !== undefined && (
        <UserFeedbackInput isFirst={true} feedback={feedback} setFeedback={setFeedback} />
      )}
    </GlobalColContainer>
  )
}
