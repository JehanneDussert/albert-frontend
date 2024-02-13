import Button from '@codegouvfr/react-dsfr/Button'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useApiUrls } from '../../constants/api'
import { meetingGenerateButton } from '../../constants/meeting'
import { CurrQuestionContext } from '../../utils/context/questionContext'
import { useFetch } from '../../utils/hooks'
import { setHeaders, setQuestionWithContext } from '../../utils/setData'
import { MeetingInputContext } from 'types'

/**
	Button to send user query to /stream endpoint & switch to meeting stream page
    FUNCTIONS:

        setQuestionWithContext: improve user prompt with current question & context to send
            more precised user_query to /stream endpoint.

      handleClick: setGenerate to true to switch to meeting stream page + create new chat id for meeting
      context: 

 **/

export function MeetingInputButton({
  setGenerate,
  context,
}: {
  setGenerate: React.Dispatch<React.SetStateAction<boolean>>
  context: MeetingInputContext
}) {
  const dispatch = useDispatch()

  const { currQuestion, updateCurrQuestion } = useContext(CurrQuestionContext)
  const isDisable =
    !currQuestion.query || (currQuestion.query && currQuestion.query.length === 0)
  const { chatUrl } = useApiUrls()

  const handleClick = async () => {
    const headers = setHeaders(false)
    const chat = await useFetch(chatUrl, 'POST', {
      data: JSON.stringify({ chat_type: 'meeting' }),
      headers,
    })
    dispatch({ type: 'SET_USER_QUERY', nextUserQuery: currQuestion.query })
    updateCurrQuestion({
      ...currQuestion,
      query: setQuestionWithContext(currQuestion.query, context),
    })
    dispatch({ type: 'SET_CHAT_ID', nextChatId: chat.id })
    setGenerate(true)
  }

  return (
    <Button
      className="w-full flex justify-center fr-mt-3w"
      onClick={handleClick}
      disabled={isDisable}
    >
      {meetingGenerateButton}
    </Button>
  )
}
