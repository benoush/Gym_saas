import { getSession, signOut } from 'next-auth/react'

import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 15000
})

instance.interceptors.request.use(
    async function (config) {
        const session = await getSession()

        if (session?.user) {
            config.headers['x-access-token'] = session.token
        }

        return config
    },
    function (error) {
        return Promise.reject(error as AxiosError)
    }
)

instance.interceptors.response.use(
    function (response) {
        return response as AxiosResponse
    },
    async function (error) {
        const session = await getSession()

        if (session?.user && error.response && error.response.status === 401) {
            signOut({ redirect: false }).then(() => {
                toast.warning('Votre session a expirée ! Veuillez vous reconnecter...', {
                    hideProgressBar: false,
                    autoClose: 5000
                })
                new Promise(() => setTimeout(() => {
                    window.location.reload()
                }, 3000))
            })
        }

        return Promise.reject(error as AxiosError)
    }
)


instance.interceptors.request.use(config => {


    if (config.params) {
        config.params = Object.fromEntries(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            Object.entries(config.params).filter(([_, value]) => value !== null && value !== undefined && value !== '')
        )
    }

    return config
})



export default instance
