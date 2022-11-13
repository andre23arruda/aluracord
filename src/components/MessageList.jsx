import React from 'react'
import { Box, Image, Text } from '@skynexui/components'
import appConfig from '../../config.json'

function shortTime(date=null) {
    const now = new Date(date)
    return now.toLocaleTimeString('default', {
        hour: '2-digit',
        minute: '2-digit',
    }) + ' - ' + now.toLocaleDateString()
}

export default function MessageList({messages}) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            { messages.map(message => (
                <Text
                    key={ message.id }
                    tag="li"
                    styleSheet={{
                        borderRadius: '5px',
                        padding: '6px',
                        marginBottom: '12px',
                        transition: '0.2s',
                        hover: {
                            backgroundColor: appConfig.theme.colors.neutrals[700],
                        }
                    }}
                >
                    <Box
                        styleSheet={{
                            marginBottom: '8px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                display: 'inline-block',
                                marginRight: '8px',
                            }}
                            src={`https://github.com/${ message.from }.png`}
                        />

                        <Text
                            tag="strong"
                            styleSheet={{
                                fontFamily: 'monospace',
                                fontStyle: 'italic',
                            }}
                        >
                            { message.from }
                        </Text>

                        <Text
                            styleSheet={{
                                fontSize: '10px',
                                color: appConfig.theme.colors.neutrals[300],
                            }}
                            tag="span"
                        >
                        { shortTime(message.created_at) }

                        </Text>
                    </Box>

                    { message.content }
                </Text>
            ))}
        </Box>
    )
}
