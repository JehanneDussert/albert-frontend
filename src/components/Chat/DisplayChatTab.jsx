import { useDispatch, useSelector } from 'react-redux';
import { NOT_SET } from '../../constants/status';
import { Display } from './Display';
import { UserMessage } from '../User/UserMessage';
import { useEffect } from 'react';
import { scrollToBottom } from '../../utils/manageEffects';
import { DisplaySheets } from '../Sheets/DisplaySheets';
export function DisplayChatTab() {
	const	user = useSelector((state) => state.user);
	const	feedback = useSelector((state) => state.feedback);
	const	ressources = useSelector((state) => state.ressources);
	const	stream = useSelector((state) => state.stream);
	const   dispatch = useDispatch();

	useEffect(() => {scrollToBottom();}, [user, feedback, ressources, stream, dispatch]);

	return (
		<div className='row-message'>
			<div className='min-h-full py-10 w-3/5 pl-10'>
				<Display messages={user.messages} archive={NOT_SET}/>
				<UserMessage />
			</div>
			<DisplaySheets />
		</div>
	);
}