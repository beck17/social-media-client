import dayjs from 'dayjs'
import 'dayjs/locale/ru'

dayjs.locale('ru')

export const useDate = (createdAt) => {
	return dayjs(createdAt, 'D MMMM HH:m', 'ru').format('D MMMM HH:mm')
}

export const useDateTime = (createdAt) => {
	return dayjs(createdAt, 'HH:mm', 'ru').format('HH:mm')
}

export const useDateDay = (createdAt) => {
	return dayjs(createdAt, 'D M', 'ru').format('D.MM')
}
