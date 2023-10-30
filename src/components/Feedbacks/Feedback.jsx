import { UserFeedbackSatisfaction } from "./UserFeedbackSatisfaction";
import { UserFeedbackInput } from "./UserFeedbackInput";
import { NOT_SET } from "../../constants/status";
import { useSelector } from "react-redux";
import { scrollToBottom } from "../../utils/manageEffects";
import { useEffect } from "react";

export function	Feedback({ isFirst }) {
	const	user = useSelector((state) => state.user);
	const	feedback = useSelector((state) => state.feedback);
	
	useEffect(() => { scrollToBottom(); }, [user, feedback]);

	return (
		<div className="user-feedback-container">
			<UserFeedbackSatisfaction isFirst={isFirst} isConfirmed={feedback.isConfirmed}/>
			{user.choices.feedback !== NOT_SET && <UserFeedbackInput activeTab={user.choices.feedback} isFirst={isFirst} />}
		</div>
	);
}