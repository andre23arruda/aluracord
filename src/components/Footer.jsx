import React from 'react'
import { Box } from '@skynexui/components'
import appConfig from '../../config.json'


export default function Footer() {
    return (
        <Box
            styleSheet={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem',
                fontSize: '0.8rem',
                color: appConfig.theme.colors.neutrals[200]
            }}
        >
            Desenvolvido por André Arruda
        </Box>
    )
}
