import { Avatar } from "../Chat/Avatar";
import { UserChatTools } from "../User/UserChatTools";
import { Feedback } from "./Feedback";
import { askingQuality, redoAskingQuality } from "../../constants/feedback";
import { useSelector } from 'react-redux';

const	AskingResponseQuality = ({ history, tabsLen }) => {

	return (
	<div className='ml-4'>
		<div className="py-4">
			{tabsLen > 1 ? redoAskingQuality : askingQuality}
		</div>
	</div>
	);
}

export function UserExperience() {
	const	stream = useSelector((state) => state.stream);
	const	history = useSelector((state) => state.history);
	const	tabsLen = stream.historyStream.length;

	return (
		<div className="col-message mt-12">
			{history.activeTab === tabsLen && <div>
				<div className="row-message">
					<UserChatTools type='quality'/>
					<Avatar user='agent' />
					<AskingResponseQuality history={history} tabsLen={tabsLen}/>
				</div>
				<Feedback isFirst={tabsLen === 1}/>
			</div>}
		</div>
	);
}