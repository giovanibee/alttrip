export const getRandomInt = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min)) + min
}

export const roundNumber = (num: number, roundTo = 3) => {
	const decimalPlace = Math.pow(10, roundTo)
	return Math.round(num * decimalPlace) / decimalPlace
}
