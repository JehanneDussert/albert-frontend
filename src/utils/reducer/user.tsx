import { initialChatbotMessage } from "../../constants/chatbotProps"

/*****************************************************************************************************
	
	VARIABLES:

	**	question: user params used to POST on /stream
	**	messages: full conversation between user & agent with { sender: 'sender', text: 'message' }
	**	sheets: main sheets related to user question and display, GET on /indexes sheets
	**	additionalSheets: additional sheets display on Modify mode and suggest to user, GET on /indexes sheets
	**	webservices: related to question. Choice of webservices could be improve, GET on /indexes sheets 
			first index
	**	chunks: chunks used to generate response, GET on /indexes chunks
	**	should_sids: sheets id suggest to agent to generate response: 
			! Temporary removed: should is treated as a must in backend

	**	must_not_sids: sheets id forbidden to be used by agent to generate response

 *****************************************************************************************************/

interface Question {
	model_name: "albert-light"
	mode: "rag"
	query: string | undefined
	limit: number
	context: string | undefined
	institution: string | undefined
	links: string | undefined
	temperature: number
	sources: ["service-public", "travail-emploi"]
	should_sids: string[]
	must_not_sids: string[]
}

const InitialQuestion: Question = {
	model_name: "albert-light",
	mode: "rag",
	query: "",
	limit: 7,
	context: undefined,
	institution: undefined,
	links: undefined,
	temperature: 20,
	sources: ["service-public", "travail-emploi"],
	should_sids: [],
	must_not_sids: [],
}

interface UserChoices {
	newQuestion: number
	oldQuestion: number
}

const	InitialUserChoices: UserChoices = {
	newQuestion: -1,
	oldQuestion: -1,
}

interface Messages {
	text: string[]
	sender: string
}

interface User {
	originQuestion: string | undefined
	question: Question
	choices: UserChoices
	messages: Messages[]
	// TODO: check sheets/chunks structure
	sheets: any[]
	additionalSheets: any[]
	chunks: any[]
	webservices: any[]
}

const InitialUser: User = {
	originQuestion: undefined,
	question: InitialQuestion,
	choices: InitialUserChoices,
	messages: [{ text: initialChatbotMessage, sender: "agent" }],
	sheets: [],
	additionalSheets: [],
	chunks: [],
	webservices: [],
}

type UserAction =
	| { type: "SET_INITIAL_CHAT" }
	| { type: "SET_SHEETS"; sheets: any[] }
	| { type: "SET_CHUNKS"; chunks: any[] }
	| { type: "SET_SHEETS_FROM_ARCHIVE"; sheets: any[]; additionalSheets: any[]; webservices: any[] }
	| { type: "REMOVE_SHEETS"; indexToRemove: number }
	| { type: "ADD_SHEETS"; indexToAdd: number }
	| { type: "SET_USER_QUERY"; nextUserQuery: string }
	| { type: "RESET_QUESTION_FIELDS" }
	| { type: "RESET_USER_CHOICES" }
	| { type: "SET_USER_CHOICES"; nextKey: string; nextValue: string }
	| { type: "SET_MESSAGES"; nextMessage: Messages }

export const userReducer = (state: User = InitialUser, action: UserAction): User => {
	switch (action.type) {
		case "SET_INITIAL_CHAT":
			return InitialUser
		case "SET_SHEETS":
			return {
				...state,
				sheets: action.sheets.slice(0, 3),
				additionalSheets: action.sheets.slice(3, 10),
				webservices: action.sheets[0].web_services.slice(0, 3),
			}
		case "SET_CHUNKS":
			return {
				...state,
				chunks: action.chunks,
			}
		case "SET_SHEETS_FROM_ARCHIVE":
			return {
				...state,
				sheets: action.sheets,
				additionalSheets: action.additionalSheets,
				webservices: action.webservices,
			}
		case "REMOVE_SHEETS": {
			if (!state.sheets) return state

			const sheets = state.sheets.filter((index) => action.indexToRemove !== index)
			const additionalSheets = state.sheets.filter((index) => action.indexToRemove === index)
			const nextMustNotSids = [...state.question.must_not_sids, additionalSheets[0].sid]

			if (JSON.stringify(nextMustNotSids) === JSON.stringify(state.question.must_not_sids))
				return {
					...state,
					sheets: [...state.sheets, ...sheets],
					additionalSheets: additionalSheets,
				}

			return {
				...state,
				sheets: sheets,
				additionalSheets: [...state.additionalSheets, ...additionalSheets],
				question: {
					...state.question,
					must_not_sids: nextMustNotSids,
				},
			}
		}
		case "ADD_SHEETS": {
			if (!state.sheets) return state

			const sheets = state.additionalSheets.filter((index) => action.indexToAdd === index)
			const additionalSheets = state.additionalSheets.filter((index) => action.indexToAdd !== index)
			const nextShouldSids = [...state.sheets.map((sheet) => sheet.sid), sheets[0].sid]
			const nextMustNotSids = state.question.must_not_sids.filter(
				(sid) => !nextShouldSids.includes(sid)
			)

			if (JSON.stringify(nextMustNotSids) === JSON.stringify(state.question.must_not_sids))
				return {
					...state,
					sheets: [...state.sheets, ...sheets],
					additionalSheets: additionalSheets,
				}

			return {
				...state,
				sheets: [...state.sheets, ...sheets],
				additionalSheets: additionalSheets,
				question: {
					...state.question,
					must_not_sids: nextMustNotSids,
				},
			}
		}
		case "SET_USER_QUERY":
			return {
				...state,
				originQuestion: action.nextUserQuery,
				question: {
					...state.question,
					query: action.nextUserQuery,
				},
			}
		case "RESET_QUESTION_FIELDS":
			return {
				...state,
				question: InitialQuestion,
			}
		case "RESET_USER_CHOICES":
			return {
				...state,
				choices: InitialUserChoices,
			}
		case "SET_USER_CHOICES":
			return {
				...state,
				choices: {
					...state.choices,
					[action.nextKey]: action.nextValue,
				},
			}
		case "SET_MESSAGES":
			if (state.messages.length > 0) {
				const lastMessage = state.messages[state.messages.length - 1]

				if (lastMessage.sender === action.nextMessage.sender) {
					const updatedMessages = state.messages.slice(0, -1) // remove last message
					const updatedLastMessage = {
						...lastMessage,
						text: lastMessage.text.concat(action.nextMessage.text),
					} // update last message
					updatedMessages.push(updatedLastMessage)
					// action.nextMessage.text
					return {
						...state,
						messages: updatedMessages,
					}
				}
			}
			return {
				...state,
				messages: [...state.messages, action.nextMessage],
			}

		default: {
			return state
		}
	}
}
