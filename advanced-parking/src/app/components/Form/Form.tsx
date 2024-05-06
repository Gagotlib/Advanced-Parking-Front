// 'use client'
// import { useState } from 'react'

// interface InputData {
// 	name: string
// 	type: string
// 	value: string
// 	placeholder: string
// }

// export default function Form({ inputData, setInputDat, buttonValue, onSubmit, errors }: { inputData: InputData[]; buttonValue: string; onSubmit: any; errors: any }) {
// 	// const [inputDat, setInputDat] = useState(inputData)

// 	const handleChange = (e: { target: { name: any; value: any } }) => {
// 		const { name, value } = e.target
// 		setInputDat((prevInputData: any) => {
// 			const updatedInputs = [...prevInputData]
// 			const inputToUpdate = updatedInputs.find((input) => input.name === name)
// 			if (inputToUpdate) {
// 				inputToUpdate.value = value
// 			}
// 			return updatedInputs
// 		})
// 		// console.log(inputDat)
// 	}

// 	return (
// 		<form className='' onSubmit={onSubmit}>
// 			{inputDat?.map((data: { name: string; type: string; value: string; placeholder: string }) => (
// 				<label key={data.name}>
// 					<p>{errors[data.name] ? errors[data.name] : ''}</p>
// 					<input type={data.type} name={data.name} value={data.value} placeholder={data.placeholder} onChange={handleChange} />
// 				</label>
// 			))}
// 			<button disabled={Object.values(errors).length > 0}>{buttonValue}</button>
// 		</form>
// 	)
// }
