import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, TextField } from '@skynexui/components'
import Header from '../../components/Header'
import MessageList from '../../components/MessageList'
import Loading from '../../components/Loading'
import Footer from '../../components/Footer'

import appConfig from '../../../config.json'
import { supabase } from '../../services/supabase'

function realTimeResponse(setMessagesList) {
    return supabase
    .channel('channel_1')
    .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
    }, response => {
        // console.log(response)
        setMessagesList(current => [response.new, ...current])
    })
    .subscribe()
}

export default function Chat() {
    const router = useRouter()
    const [message, setMessage] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    const [messagesList, setMessagesList] = useState([])

    useEffect(() => {
        if (router.isReady) {
            if (router.query.username) {
                return
            }
            router.push('/')
            alert('Faça login primeiro')
        }
    }, [router.isReady])

    async function handleMessage() {
        const newMessage = {
            from: router.query.username,
            content: message,
        }
        await supabase.from('messages').insert(newMessage)
        // const response = await supabase.from('messages').insert(newMessage).select()
        // console.log(response)
        setMessage('')
    }

    function sendMessage(event) {
        if (event.key === 'Enter') {
            event.preventDefault()
            handleMessage()
        }
    }

    useEffect(() => {
        supabase.from('messages').select('*')
        .then(response => {
            setMessagesList(response.data.reverse())
            setIsLoaded(true)
        })

        realTimeResponse(setMessagesList)
    }, [])

    return (
        <Box
            styleSheet={{
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(${ appConfig.background })`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '90vh',
                    padding: '25px',
                    marginTop: '1rem'
                }}
            >
                <Header />

                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    { isLoaded ? (
                        <MessageList messages={ messagesList } />
                    ) : (
                        <Loading />
                    )}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            gap: '12px',
                        }}
                    >
                        <div style={{ flex: 1 }}>
                            <TextField
                                value={message}
                                onChange={ event => setMessage(event.target.value) }
                                onKeyPress={ event => sendMessage(event) }
                                placeholder="Insira sua mensagem aqui..."
                                type="textarea"
                                styleSheet={{
                                    padding: '6px 8px',
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                    color: appConfig.theme.colors.neutrals[200],
                                }}
                                textFieldColors={{
                                    neutral: {
                                        textColor: appConfig.theme.colors.neutrals[200],
                                        mainColor: appConfig.theme.colors.neutrals[900],
                                        mainColorHighlight: appConfig.theme.colors.primary[500],
                                        backgroundColor: appConfig.theme.colors.neutrals[800],
                                    },
                                }}
                            />
                        </div>

                        <Button
                            label={<img src='/images/send-message.svg' height={20} width={20} />}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals['000'],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                            styleSheet={{
                                height: '50px',
                                width: '50px',
                                borderRadius: '50%',
                                lineHeight: 0.1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            title="Enviar mensagem"
                            onClick={() => handleMessage()}
                        />
                    </Box>
                </Box>
            </Box>

            <Footer />
        </Box>
    )
}
