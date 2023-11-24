import { useDispatch, useSelector } from 'react-redux';
import { NOT_SET } from '../../constants/status';
import { Display } from './Display';
import { UserMessage } from '../User/UserMessage';
import { useEffect } from 'react';
import { scrollToBottom } from '../../utils/manageEffects';
import { initialChatbotMessage } from '../../constants/chatbotProps';
import { checkConnexion } from '../../utils/localStorage';
import { GlobalColContainer } from '../Global/GlobalColContainer';

export function ChatMainContainer() {
	const	auth = useSelector((state) => state.auth);
	const	user = useSelector((state) => state.user);
	const	feedback = useSelector((state) => state.feedback);
	const	stream = useSelector((state) => state.stream);
	const   dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: 'SET_INITIAL_STREAM' });
		dispatch({ type: 'SET_INITIAL_USER' });
		dispatch({ type: 'SET_MESSAGES', nextMessage: { text: initialChatbotMessage, sender: 'agent' } });
		checkConnexion(auth, dispatch);
	}, []);

	useEffect(() => { scrollToBottom(); }, [user, feedback, stream, dispatch]);

	return (
		
        <GlobalColContainer>
			<div className='h-full flex flex-col'>
				<div className="flex flex-grow ">
					<Display
						messages={user.messages}
						archive={NOT_SET}
					/>
				</div>
				{/* <DefaultQuestions /> */}
				<UserMessage />
			</div>
		</GlobalColContainer>
	);
}