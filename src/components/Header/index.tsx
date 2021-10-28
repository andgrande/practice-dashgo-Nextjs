import { Button, Flex, Icon, IconButton, useBreakpointValue, useColorMode, useColorModeValue } from '@chakra-ui/react';

import { Logo } from './Logo';
import { SearchBox } from './SearchBox';
import { NotificationNav } from './NotificationNav';
import { Profile } from './Profile';
import { useSidebarDrawer } from '../../context/SidebarDrawerContext';
import { RiMenuLine, RiMoonLine, RiSunLine } from 'react-icons/ri';

export function Header() {
    const { onOpen } = useSidebarDrawer();
    const { colorMode, toggleColorMode } = useColorMode()

    const isWideScreen = useBreakpointValue({
        base: false,
        lg: true,
    });

    return (
        <Flex
            as="header"
            w="100%"
            maxWidth={1480}
            h="20"
            mx="auto"
            mt="4"
            px="6"
            align="center"
        >

            {!isWideScreen && (
                <IconButton
                    aria-label="Open navigation"
                    icon={<Icon as={RiMenuLine} />}
                    fontSize={24}
                    variant="unstyled"
                    onClick={onOpen}
                    mr="2"
                />
            )}

            <Logo />

            {isWideScreen && (
                <SearchBox />
            )}
            
            
            <Flex
                align="center"
                ml="auto"
            >
                <IconButton 
                    aria-label="Switch color mode"
                    icon={colorMode === "light" ? <Icon as={RiMoonLine} />: <Icon as={RiSunLine} />}
                    fontSize="20"
                    variant="unstyled"
                    color="gray.300"
                    onClick={toggleColorMode}
                />

                <NotificationNav />

                <Profile showProfileData={isWideScreen} />
            </Flex>
        </Flex>
    )
}