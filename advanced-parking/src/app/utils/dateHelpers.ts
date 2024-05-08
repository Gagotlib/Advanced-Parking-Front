export const getTodayDate = () => {
	//funcion que me trae la fecha actual
	const today = new Date()
	const year = today.getFullYear()
	let month: number | string = today.getMonth() + 1
	let day: number | string = today.getDate()

	// Agregar un cero delante del mes y el día si son menores de 10
	month = month < 10 ? '0' + month : month
	day = day < 10 ? '0' + day : day

	return `${year}-${month}-${day}`
}

// funcion que me trae la fecha maxima
export const getMaxDate = () => {
	const maxDate = new Date()
	maxDate.setMonth(maxDate.getMonth() + 2) // Añadir 2 meses
	return maxDate.toISOString().split('T')[0]
}

// verifica si la fecha es fin de semana
export const isWeekend = (date: any) => {
	const dayOfWeek = new Date(date).getDay()
	return dayOfWeek === 0 || dayOfWeek === 6 // 0 para domingo, 6 para sábado
}
