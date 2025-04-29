# Netly — социальная платформа
 
Цель — показать умение строить production-ready SPA с полноценной архитектурой, авторизацией, чатами, постами и глобальным стейтом.

---

## 🔧 Технологии

### Клиент:
- React 18.2
- Next.js 13.3.4
- TypeScript
- Redux Toolkit
- React Query
- React Hook Form
- Axios
- SCSS Modules
- React Hot Toast
- WebSocket (Socket.IO) — реалтайм чат

### Сервер:
- NestJS
- MongoDB + Mongoose
- JWT (аутентификация)
- Socket.IO

---

## ⚙️ Функциональность

- Регистрация и вход по JWT
- Создание и редактирование профиля
- Добавление, редактирование и удаление постов с фото
- Лайки, комментарии и подписки
- Друзья и подписчики
- Поиск по пользователям, друзьям, подписчикам, сообществам и т.д.
- Приватные чаты (через WebSocket)
- Сообщества
- Приватность и ограничения

---

## 🚀 Демо

- Клиент: https://netly-mu.vercel.app

---

## 🧠 Архитектура

- Разделение логики, запросов и UI
- Кастомные React-хуки (`useLike`, useComment, `useChat`)
- Работа с глобальным и локальным состоянием
- Роутинг на Next.js с динамическими параметрами

---

## 🛠️ Установка

### Клиент:

```bash
git clone https://github.com/beck17/social-media-client
cd social-media-client
npm install
npm run dev
```

### Сервер:

```bash
git clone https://github.com/beck17/social-media-server
cd social-media-server
npm install
npm run start:dev
```
