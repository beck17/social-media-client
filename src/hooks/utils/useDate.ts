import dayjs from 'dayjs'
import 'dayjs/locale/ru'

dayjs.locale('ru')

export const useDate = (createdAt: string) => {
	const currentYear = String(new Date().getFullYear())
	const createdAtYear = createdAt.slice(0, 4)

	if (currentYear === createdAtYear) return dayjs(createdAt, 'D MMMM HH:m', 'ru').format('D MMMM HH:mm')

	return dayjs(createdAt, 'D MMMM YYYY').format('D MMMM YYYY')
}

export const useDateTime = (createdAt: string) => {
	return dayjs(createdAt, 'HH:mm', 'ru').format('HH:mm')
}

export const useDateDay = (createdAt: string) => {
	return dayjs(createdAt, 'D M', 'ru').format('D.MM')
}

export const useDateWithYear = (createdAt: string | undefined) => {
	return dayjs(createdAt, 'D MMMM YYYY').format('D MMMM YYYY')
}

export const useDatePastTime = (createdAt: string | Date) => {
	const now = dayjs()
	const createdDate = dayjs(createdAt)

	const minutesDiff = now.diff(createdDate, 'minute')
	const hoursDiff = now.diff(createdDate, 'hour')
	const daysDiff = now.diff(createdDate, 'day')
	const weeksDiff = now.diff(createdDate, 'week')

	if (minutesDiff === 0) {
		return `только что`
	}

	if (minutesDiff < 60) {
		return `${minutesDiff} мин.`
	}

	if (hoursDiff < 24) {
		return `${hoursDiff} ч.`
	}

	if (daysDiff < 7) {
		return `${daysDiff} д.`
	}


	return `${weeksDiff} н.`
}
