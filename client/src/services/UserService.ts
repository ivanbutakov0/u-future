import { AxiosResponse } from 'axios'
import api from '../http'
import { TUser } from '../types/TUser'

export const fetchUsers = async (): Promise<AxiosResponse<TUser[]>> => {
	return api.get<TUser[]>('/user/')
}
