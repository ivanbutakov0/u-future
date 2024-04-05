const generateRandomHexColor = () => {
	// Create a random number between 0 and 0xFFFFFF (inclusive)
	const randomNum = Math.floor(Math.random() * 16777215)

	// Convert the number to a hexadecimal string and pad it with leading zeros
	const hexColor = '#' + randomNum.toString(16).padStart(6, '0')

	return hexColor
}

module.exports = generateRandomHexColor
