import React from 'react'
import { useRouter } from 'next/router'
import { Box, Text, Button } from '@skynexui/components'
import appConfig from '../../config.json'

export default function Header() {
    const router = useRouter()

    function logout() {
        router.push('/')
    }

    return (
        <>
            <Box
                styleSheet={{
                    width: '100%',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    overflow:'teste'
                }}
            >
                <Text variant='heading5'>
                    Chat
                </Text>

                <Button
                    iconName="FaPowerOff"
                    buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals['000'],
                        mainColor: appConfig.theme.colors.neutrals[400],
                        mainColorLight: appConfig.theme.colors.primary[400],
                        mainColorStrong: appConfig.theme.colors.primary[600],
                    }}
                    styleSheet={{
                        fontSize: '11pt',
                        lineHeight: 0.1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        maxWidth: '30px',
                        maxHeight: '30px',
                    }}
                    title="Sair"
                    onClick={ logout }
                />
            </Box>
        </>
    )
}
