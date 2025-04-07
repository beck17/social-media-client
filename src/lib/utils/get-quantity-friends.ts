export const getQuantityFriends = (count: number) => {
	const lastChar = count % 10
	const lastTwoChar = count % 100

	if (lastTwoChar >= 11 && lastTwoChar <= 20) {
		return `${count} друзей`
	}

	if (lastChar === 1 && count !== 11) {
		return `${count} друг`
	}

	if (lastChar >= 1 && lastChar <= 4) {
		return `${count} друга`
	}

	return `${count} друзей`
}