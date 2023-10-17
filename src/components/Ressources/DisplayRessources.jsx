import { useState } from "react";
import { askingDocumentationChoice } from "../../constants/ressources";
import { ConfirmationButton } from "./ConfirmationButton";
import { RessourceOptions } from "./RessourceOptions";

export function	DisplayRessources() {
	const	[isConfirmed, setIsConfirmed] = useState(false);

	return (
		<>
		{!isConfirmed &&
			<div>
				<p className="mt-4">{askingDocumentationChoice}</p>
				<RessourceOptions />
				{/* <UserFeedbackResume /> */}
				<ConfirmationButton setIsConfirmed={setIsConfirmed}/>
			</div>
		}
		</>
	);
}