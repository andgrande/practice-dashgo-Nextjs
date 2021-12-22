import { Button, useColorModeValue } from "@chakra-ui/react"

interface PaginationItemProps {
    number: number;
    isCurrentPage?: boolean;
    onPageChange: (page: number) => void;
}

export function PaginationItem({
    isCurrentPage = false, 
    onPageChange, 
    number
}: PaginationItemProps) {
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
            onClick={() => onPageChange(number)}
        >
            {number}
        </Button>
    )
}