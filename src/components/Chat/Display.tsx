import { useSelector } from 'react-redux'
import { type Message, type RootState } from '@types'
import { ChatFollowUp } from './ChatFollowUp'
import { DisplayArrayMessages } from './DisplayArrayMessages'
import { DisplaySingleMessage } from './DisplaySingleMessage'
import { GlobalChatContainer } from './GlobalChatContainer'

/*
 *
 */
export function Display({
  messages,
  archive,
}: { messages: Message[]; archive: boolean }) {
  const user = useSelector((state: RootState) => state.user)
  return (
    <GlobalChatContainer>
      {messages.map((message, index) => {
        return Array.isArray(message.text) ? (
          <DisplayArrayMessages key={index} messages={message.text} />
        ) : (
          <DisplaySingleMessage
            key={index}
            sender={message.sender}
            text={message.text}
            isFirst={index === 0}
            chunks={user.chunks}
          />
        )
      })}
      {!archive && <ChatFollowUp />}
    </GlobalChatContainer>
  )
}
