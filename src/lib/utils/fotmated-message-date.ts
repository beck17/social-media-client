import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'

dayjs.extend(isToday)
dayjs.extend(isYesterday)

export const formatedDate = (date: string) => {
	const day = dayjs(new Date(date))

	if (day.isToday()) return 'Сегодня'
	if (day.isYesterday()) return 'Вчера'

	return day.format('D MMMM YYYY')
}