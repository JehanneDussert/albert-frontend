import { feedbackButtonsChoice } from "../../constants/feedback"

export const ButtonsOptions = ({ isFirst, buttonsType, reasons, setReasons }) => {
	const handleClick = (index) => {
		if (reasons.includes(buttonsType[index])) {
			setReasons(reasons.filter((reason) => reason !== buttonsType[index]))
		} else {
			setReasons([...reasons, buttonsType[index]])
			if (buttonsType[index] === "Autre raison") return
		}
	}

	return (
		<div className="wrap-message">
			{isFirst &&
				buttonsType.map((button, index) => {
					const classNames = reasons.includes(buttonsType[index]) ? "bg-purple" : "bg-[white]"

					return (
						<div key={index}>
							<button
								role={feedbackButtonsChoice(button)}
								className={`user-feedback-buttons ${classNames}`}
								onClick={() => handleClick(index)}
							>
								<p className={reasons.includes(buttonsType[index]) ? "text-white" : "text-purple"}>
									{button}
								</p>
							</button>
						</div>
					)
				})}
		</div>
	)
}
