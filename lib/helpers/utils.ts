export const roundNumber = (num: number, roundTo = 3) => {
	const decimalPlace = Math.pow(10, roundTo)
	return Math.round(num*decimalPlace) / decimalPlace
}