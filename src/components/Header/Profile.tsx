import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex align="center">
            {showProfileData && (
                <Box mr="4" textAlign="right" >
                    <Text>Belinha Bell</Text>
                    <Text color="gray.300" fontSize="small" >belinha@bell.com</Text>
                </Box>
            )}

            <Avatar
            size="md"
            name="Belinha Bell"
            src="https://i.pinimg.com/236x/a0/5d/fc/a05dfce6e744f75b4f07a2804ff2f6d8.jpg"
            />
        </Flex>
    )
}