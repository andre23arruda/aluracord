import React from 'react'
import { Box, Image } from '@skynexui/components'
import appConfig from '../../config.json'

export default function Loading() {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20pt',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            <Image
                styleSheet={{
                    width: '50px',
                    height: '50px',
                    display: 'inline-block',
                }}
                src="/images/loading.svg"
            />
        </Box>
    )
}
