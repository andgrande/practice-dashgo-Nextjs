import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { mode } from "@chakra-ui/theme-tools"

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

export const theme = extendTheme({
    colors: {
        gray: {
            "50": "#EEEEF2",
            "100": "#D1D2DC",
            "200": "#B3B5C6",
            "300": "#9699B0",
            "400": "#797D9A",
            "500": "#616480",
            "600": "#4B4D63",
            "700": "#353646",
            "800": "#1F2029",
            "900": "#181B23",
        }
    },
    fonts: {
        body: 'Roboto',
        heading: 'Roboto',
    },
    styles: {
        global: (props) => ({
            body: {
                bg: mode('whiteAlpha.900', 'gray.900')(props),
                color: mode('gray.800', 'gray.50')(props),
                // bg: props.colorMode === 'dark' ? 'gray.900' : 'white';
                // color: props.colorMode === 'dark' ? 'gray.50' : 'gray.900';
            }
        })
    },
    config,
});
