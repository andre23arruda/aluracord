import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import Footer from '../../components/Footer'

import appConfig from '../../../config.json'

export default function Login() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [userExist, setUserExist] = useState(false)

    function handleLogin(event) {
        event.preventDefault()
        router.push(`/chat?username=${ username }`)
    }

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage: `url(${ appConfig.background })`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundBlendMode: 'multiply',
                }}
            >
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <Box
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: { xs: 'column', sm: 'row' },
                            width: '95%',
                            maxWidth: '700px',
                            borderRadius: '5px',
                            padding: '32px',
                            // margin: '16px',
                            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                            backgroundColor: appConfig.theme.colors.neutrals[700],
                        }}
                    >
                        <Box
                            as="form"
                            onSubmit={ event => handleLogin(event) }
                            styleSheet={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: { xs: '100%', sm: '50%' },
                                textAlign: 'center',
                                marginBottom: '32px',
                            }}
                        >
                            <Text
                                tag="h2"
                                styleSheet={{
                                    color: appConfig.theme.colors.neutrals['000'],
                                    fontSize: '24px',
                                    fontWeight: 600,
                                }}
                            >
                                Boas vindas de volta!
                            </Text>

                            <Text
                                variant="body3"
                                styleSheet={{
                                    marginBottom: '32px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                            >
                                { appConfig.name }
                            </Text>

                            <TextField
                                placeholder="Seu usuário Github"
                                value={ username }
                                onChange={event => setUsername(event.target.value) }
                                fullWidth
                                textFieldColors={{
                                    neutral: {
                                        textColor: appConfig.theme.colors.neutrals[200],
                                        mainColor: appConfig.theme.colors.neutrals[900],
                                        mainColorHighlight: appConfig.theme.colors.primary[500],
                                        backgroundColor: appConfig.theme.colors.neutrals[800],
                                    },
                                }}
                                required
                            />

                            <Button
                                type="submit"
                                label="Entrar"
                                fullWidth
                                buttonColors={{
                                    contrastColor:appConfig.theme.colors.neutrals['000'],
                                    mainColor: appConfig.theme.colors.primary[500],
                                    mainColorLight: appConfig.theme.colors.primary[400],
                                    mainColorStrong: appConfig.theme.colors.primary[600],
                                }}
                                disabled={ !userExist }
                            />
                        </Box>

                        <Box
                            styleSheet={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                maxWidth: '200px',
                                padding: '16px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                border: '1px solid',
                                borderColor: appConfig.theme.colors.neutrals[999],
                                borderRadius: '10px',
                                flex: 1,
                                height: '245px',
                                gap: '16px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    borderRadius: '50%',
                                }}
                                src={username ? `https://github.com/${ username }.png` : '/images/user-1.png'}
                                onLoad={ ({currentTarget}) => {
                                    if (!currentTarget.src.includes('user-1.png')) {
                                        setUserExist(true)
                                    }
                                }}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null
                                    currentTarget.src='/images/user-1.png'
                                    setUserExist(false)
                                }}
                            />

                            { (userExist && username) && (
                                <Text
                                    variant="body4"
                                    styleSheet={{
                                        color: appConfig.theme.colors.neutrals[200],
                                        backgroundColor: appConfig.theme.colors.neutrals[900],
                                        padding: '3px 10px',
                                        borderRadius: '1000px',
                                    }}
                                >
                                    { username }
                                </Text>
                            )}
                        </Box>
                    </Box>
                </div>

                <Footer />
            </Box>
        </>
    )
}
