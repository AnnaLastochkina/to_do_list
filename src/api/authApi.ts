import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        "API-KEY": "204a06f3-f4cf-44c7-b104-0263b991a423"
    }
})


export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const authApi = {
    authMe() {
        return instance.get<CommonResponseType<{ id: number, email: string, login: string }>>(`/auth/me`)
    },
    login(params: LoginParamsType) {
        return instance.post<CommonResponseType<{ userId?: number }>>(`/auth/login`, params)
    },
    logout() {
        return instance.delete<CommonResponseType>(`/auth/login`)
    }
}


type CommonResponseType<T = {}> = {
    resultCode: number
    messages: string []
    fieldsErrors: string []
    data: T
}
