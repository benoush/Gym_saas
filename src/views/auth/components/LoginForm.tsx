'use client'

import { useState } from "react"


import { useParams, useSearchParams, useRouter } from "next/navigation"


import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form"

import { valibotResolver } from "@hookform/resolvers/valibot"

import { InputAdornment, IconButton, Button, Card, CardContent, Checkbox, FormControlLabel, Link, Typography } from "@mui/material"

import { signIn } from "next-auth/react"

import type { InferInput } from "valibot";

import { object, pipe, string, minLength, email, nonEmpty } from "valibot"

import CustomTextField from "@/@core/components/mui/TextField"
import themeConfig from "@/configs/themeConfig"
import { getLocalizedUrl } from "@/utils/i18n"
import type { Locale } from "@/configs/i18n"


type ErrorType = {
    message: string[]
}


const schema = object({
    email: pipe(string(), minLength(1, 'This field is required'), email('Email is invalid')),
    password: pipe(
        string(),
        nonEmpty('This field is required'),
        minLength(5, 'Password must be at least 5 characters long')
    )
})

type FormData = InferInput<typeof schema>


const LoginForm = () => {

    const [errorState, setErrorState] = useState<ErrorType | null>(null)
    const [isPasswordShown, setIsPasswordShown] = useState(false)



    // Hooks
    const router = useRouter()
    const searchParams = useSearchParams()
    const { lang: locale } = useParams()

    const handleClickShowPassword = () => setIsPasswordShown(show => !show)

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })



        if (res && res.ok && res.error === null) {
            // Vars
            const redirectURL = searchParams.get('redirectTo') ?? '/'

            router.replace(getLocalizedUrl(redirectURL, locale as Locale))
        } else {
            if (res?.error) {
                const error = JSON.parse(res.error)

                setErrorState(error)
            }
        }
    }


    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<FormData>({
        resolver: valibotResolver(schema),
        defaultValues: {
            email: '',
            password: ''
        }
    })


    return (
        <>
            <Card className='flex flex-col sm:is-[450px]'>
                <CardContent className='sm:p-12!'>
                    <div className='flex flex-col items-center gap-1 mbe-6'>
                        <Typography variant='h4'>{`Bienvenue à ${themeConfig.templateName}`}</Typography>
                        <Typography className='text-center'>Veuillez vous connecter pour commencer</Typography>
                    </div>
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name={'email'}
                            control={control}
                            render={({ field }) => {
                                return (
                                    <CustomTextField
                                        {...field}
                                        required={true}
                                        autoFocus
                                        fullWidth
                                        label="Email"

                                        placeholder="Entrez votre email"
                                        error={!!errors.email}
                                        {...(errors.email && {
                                            error: true,
                                            helperText: errors?.email?.message || errorState?.message[0]
                                        })}
                                    />
                                )
                            }}
                        />
                        <Controller
                            name={'password'}
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    required={true}
                                    {...field}
                                    fullWidth
                                    label={'Mot de passe'}
                                    placeholder='············'
                                    type={isPasswordShown ? 'text' : 'password'}
                                    error={!!errors.password}
                                    {...(errors.password && {
                                        error: true,
                                        helperText: errors?.password?.message
                                    })}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                                                        <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }
                                    }}
                                />
                            )}
                        />

                        <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                            <FormControlLabel control={<Checkbox />} label='Se souvenir de moi' />
                            <Typography
                                className='text-end'
                                color='primary.main'
                                component={Link}
                                href={getLocalizedUrl('/pages/auth/forgot-password-v1', locale as Locale)}
                            >
                                Mot de passe oublié ?
                            </Typography>
                        </div>
                        <Button fullWidth variant='contained' type='submit'>
                            Se connecter
                        </Button>
                    </form>
                </CardContent>
            </Card >
        </>
    )
}

export default LoginForm
