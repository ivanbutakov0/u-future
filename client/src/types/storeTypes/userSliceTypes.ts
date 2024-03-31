import { TUser } from '../TUser'

export type userState = {
	currentUser: TUser | null
	error: string | null
	loading: boolean
}
