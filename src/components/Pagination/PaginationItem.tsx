import { Button, useColorModeValue } from "@chakra-ui/react"

interface PaginationItemProps {
    number: number;
    isCurrentPage?: boolean;
}

export function PaginationItem({isCurrentPage = false, number}: PaginationItemProps) {
    const bg = useColorModeValue('gray.100', 'gray.700');

    if (isCurrentPage) {
        return (
            <Button
                size="sm"
                fontSize="xs"
                width="4"
                colorScheme="pink"
                disabled
                _disabled={{
                    bg: "pink.500",
                    cursor: "default",
                }}
            >
                {number}
            </Button>
        )
    }

    return (
        <Button
            size="sm"
            fontSize="xs"
            width="4"
            bg={bg}
            _hover={{
                bg: "gray.500"
            }}
        >
            {number}
        </Button>
    )
}