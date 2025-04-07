import { useTypedSelector } from '../utils/useTypedSelector'

export const useAuth = () => useTypedSelector((state) => state.user)
