import { GlobalColContainer } from "../Global/GlobalColContainer"
import { GlobalSubtitle } from "../Global/GlobalSubtitle"
import { MeetingAdditionalInput } from "./MeetingAdditionalInput"
import { MeetingDefaultQuestions } from "./MeetingDefaultQuestions"

/*
	MeetingadditionalInformations: optional inputs for themes and administrations
	COMPONENTS:
	
	**	MeetingAdditionalInput: set context from user input
	
	**	MeetingDefaultQuestions: proposes default questions to user and set context onClick()

 */

export function MeetingAdditionalInformations({ context, setContext }) {
	return (
		<GlobalColContainer>
			<GlobalSubtitle>Informations contextuelles</GlobalSubtitle>
			<MeetingAdditionalInput context={context} setContext={setContext} />
			<MeetingDefaultQuestions setContext={setContext} />
		</GlobalColContainer>
	)
}
