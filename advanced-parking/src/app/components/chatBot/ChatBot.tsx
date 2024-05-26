'use client'

import React, { useRef, useState } from 'react'
import Chats from '../chatBot/Chats'
import { analyzeNextSteps } from '../../utils/analizeNextStep'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faExpandArrowsAlt, faCompressArrowsAlt, faComment } from '@fortawesome/free-solid-svg-icons'

interface ResponseBotObject {
	purpose: string
	message: string
	options?: string[]
	sender: string
}

const Chatbot: React.FC = () => {
	const [userResponse, setUserResponse] = useState<string>('')
	const [step, setStep] = useState<number>(0)
	const [botResponse, setBotResponse] = useState<ResponseBotObject>({
		purpose: '',
		message: '',
		sender: 'bot'
	})
	const [sendUserResponse, setSendUserResponse] = useState<string>('')
	const [isExpanded, setIsExpanded] = useState<boolean>(false) // Estado para controlar si el chatbot está expandido o minimizado
	const bodyRef = useRef<HTMLDivElement>(null)
	// Función para alternar entre expandir y minimizar el chatbot
	const toggleCompression = () => {
		setIsExpanded((prevState) => !prevState)
	}

	// setting next step when there's response and option click
	const setNextStep = (response: string) => {
		setStep((prevState) => prevState + 1)
		setSendUserResponse(response)
		let res = analyzeNextSteps(step, response)
		setBotResponse({ ...res, sender: 'bot' })
		setUserResponse('')
	}

	const optionClick = (e: React.MouseEvent<HTMLElement>) => {
		const option = e.currentTarget.dataset.id
		if (option) {
			setNextStep(option)
		}
	}

	// event handlers
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserResponse(e.target.value)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setNextStep(userResponse)
	}

	return (
		<div
			className={`chat-container bg-duck-yellow fixed bottom-16 right-2.5 ${
				isExpanded ? 'lg:w-1/5 min-w-80 w-1/2 h-3/5' : 'w-1/10 h-6'
			} flex flex-col justify-between p-6 rounded-lg transition-all duration-500 ease-in-out overflow-hidden`}
			ref={bodyRef}
		>
			<div className=' flex items-center justify-center w-2 '>
				<button onClick={toggleCompression} className='absolute m-2 '>
					{isExpanded ? <FontAwesomeIcon icon={faCompressArrowsAlt} size='lg' className='text-black' /> : <FontAwesomeIcon icon={faComment} size='xl' className='text-black' />}
				</button>
			</div>

			{!isExpanded && <button onClick={toggleCompression}></button>}

			<div className={`${isExpanded ? '' : 'hidden'} flex-grow overflow-auto mt-4`} ref={bodyRef}>
				<Chats userResponse={userResponse} botResponse={botResponse} sendUserResponse={sendUserResponse} optionClick={optionClick} />
				<form onSubmit={handleSubmit} className='form-container flex justify-between mt-auto mb-4'>
					<input onChange={handleInputChange} value={userResponse} className='w-11/12 border-b border-gray-700 rounded-lg px-4 py-2 focus:outline-none bg-ghostwhite text-black' />
					<button type='submit' className='bg-gray-200 text-gray-700 rounded-lg px-4 py-2 hover:bg-opacity-80 hover:cursor-pointer'>
						<FontAwesomeIcon icon={faPaperPlane} size='2x' />
						<i className='fas fa-paper-plane'></i>
					</button>
				</form>
			</div>
		</div>
	)
}

export default Chatbot
