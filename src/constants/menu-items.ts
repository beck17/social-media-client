import { menuItemsProps } from '@/components/ui/menu-item/MenuItem'

import friends from '@/assets/img/friends.svg'
import news from '@/assets/img/news.svg'
import messanger from '@/assets/img/messanger.svg'
import search from '@/assets/img/search.svg'
import audio from '@/assets/img/audio.svg'
import video from '@/assets/img/video.svg'
import community from '@/assets/img/community.svg'

interface menuItemsPropsWithId extends menuItemsProps {
	id: number
}

export const menuItems: menuItemsPropsWithId[] = [
	{ id: 1, value: 'Друзья', href: '/friends', image: friends },
	{ id: 2, value: 'Новости', href: '/feed', image: news },
	{ id: 3, value: 'Сообщения', href: '/im', image: messanger },
	{ id: 4, value: 'Сообщества', href: '/my-communities', image: community },
	{ id: 5, value: 'Аудиозаписи', href: '/audio', image: audio },
	{ id: 6, value: 'Видеозаписи', href: '/video', image: video },
	{ id: 7, value: 'Поиск', href: '/search', image: search },
]
