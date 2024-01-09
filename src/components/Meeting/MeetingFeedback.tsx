import thumbsUp from "../../../icons/feedbacks/thumbsUp.svg"
import thumbsDown from "../../../icons/feedbacks/thumbsDown.svg"
import { useFetch } from "../../utils/hooks"
import { feedbackUrl } from "../../constants/api"
import { setHeaders } from "../../utils/setData";
import { useState } from "react"
import { ButtonInformation } from "../Global/ButtonInformation"
import { thankFeedback } from "../../constants/feedback"
import { GlobalParagraph } from "../Global/GlobalParagraph"
import { useSelector } from "react-redux"
import { RootState } from "types";

export const MeetingFeedback = () => {
	const streamId = useSelector((state: RootState) => state.user.streamId)
	const [isClicked, setIsClicked] = useState<boolean | null>(null)

	const handleClick = (isGood: boolean | null)  => {

		const data = {
			is_good: isGood,
			message: "",
		}

		useFetch(`${feedbackUrl}/${streamId}`, 'POST', {
			data: JSON.stringify(data),
			headers: setHeaders(false)
		});

		setIsClicked(isGood)
	}

	return (
		<div className="fr-mt-2w">
			<button
				onClick={() => handleClick(true)}
				className={`fr-mr-1w border border-[#DDD] ${
					isClicked === true ? "bg-purple" : "bg-white"
				}`}
			>
				<img
					className={`fr-m-1w ${
						isClicked && isClicked === true ? "mr-2 brightness-0 invert-[1]" : "mr-2"
					}`}
					src={thumbsUp}
					alt="Feedback positif"
				/>
			</button>
			<button
				onClick={() => handleClick(false)}
				className={`fr-mr-1w border border-[#DDD] ${isClicked === false ? "bg-purple" : "bg-white"}`}
			>
				<img
					className={`fr-m-1w ${isClicked === false ? "mr-2 brightness-0 invert-[1]" : "mr-2"}`}
					src={thumbsDown}
					alt="Feedback négatif"
				/>
			</button>
			{isClicked !== null && (
				<GlobalParagraph extraClass="fr-text--xs">{thankFeedback}</GlobalParagraph>
			)}
		</div>
	)
}