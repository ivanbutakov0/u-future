import { AxiosResponse } from 'axios'
import api from '../http'
import { AuthResponse } from '../types/response/AuthResponse'

export const googleAuth = async (
	token: string
): Promise<AxiosResponse<AuthResponse>> => {
	return api.post<AuthResponse>('/user/google-auth', { token })
}

export const login = async (
	email: string,
	password: string
): Promise<AxiosResponse<AuthResponse>> => {
	return api.post<AuthResponse>('/user/login', { email, password })
}

export const registration = async (
	username: string,
	email: string,
	password: string
): Promise<AxiosResponse<AuthResponse>> => {
	return api.post<AuthResponse>('/user/registration', {
		username,
		email,
		password,
	})
}

export const logout = async (): Promise<void> => {
	return api.post('/user/logout')
}
