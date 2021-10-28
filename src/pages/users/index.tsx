import Link from "next/link";
import { Box, Button, Checkbox, Flex, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { SectionHeading } from "../../components/PagesElements/SectionHeading";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function Users() {
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })

    const bg = useColorModeValue('gray.50', 'gray.800');
    const color = useColorModeValue('gray.800', 'gray.50');

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" >
                <Sidebar />

                <Box flex="1" borderRadius={8} bg={bg} p={["4", "8"]}>
                    <Flex mb="8" justify="space-between" align="center">
                        <SectionHeading>Users</SectionHeading>

                        <Link href="/users/create" passHref>
                            <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="pink"
                                color={color}
                                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                            >
                                Create user
                            </Button>
                        </Link>
                    </Flex>

                    <Table colorScheme="whiteAlpha" >
                        <Thead>
                            <Tr>
                                <Th px={["2", "4", "6"]} color="gray.300" width="8">
                                    <Checkbox colorScheme="pink" />
                                </Th>
                                <Th>User</Th>
                                <Th>File date</Th>
                                <Th width="8"></Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            <Tr>
                                <Td px={["2", "4", "6"]}>
                                    <Checkbox colorScheme="pink" />
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">Belinha Bell</Text>
                                        <Text fontSize="sm" color="gray.300" >belinha@bell.com</Text>
                                    </Box>
                                </Td>
                                <Td>27/07/2021</Td>
                                <Td>
                                <Button
                                        as="button"
                                        size="sm"
                                        fontSize="sm"
                                        colorScheme="gray"
                                        color={color}
                                        pr={["1", "4"]}
                                        leftIcon={<Icon as={RiPencilLine} />}
                                    >
                                        { isWideVersion ? 'Edit' : '' }
                                    </Button>
                                </Td>
                            </Tr>

                            <Tr>
                                <Td px={["2", "4", "6"]}>
                                    <Checkbox colorScheme="pink" />
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">Mala Malalin</Text>
                                        <Text fontSize="sm" color="gray.300" >malalin@mala.com</Text>
                                    </Box>
                                </Td>
                                <Td>27/08/2021</Td>
                                <Td>
                                    <Button
                                        as="button"
                                        size="sm"
                                        fontSize="sm"
                                        colorScheme="gray"
                                        color={color}
                                        pr={["1", "4"]}
                                        leftIcon={<Icon as={RiPencilLine} />}
                                    >
                                        { isWideVersion ? 'Edit' : '' }
                                    </Button>
                                </Td>
                            </Tr>

                            <Tr>
                                <Td px={["2", "4", "6"]}>
                                    <Checkbox colorScheme="pink" />
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">Mala Malalin</Text>
                                        <Text fontSize="sm" color="gray.300" >malalin@mala.com</Text>
                                    </Box>
                                </Td>
                                <Td>27/08/2021</Td>
                                <Td>
                                    <Button
                                        as="button"
                                        size="sm"
                                        fontSize="sm"
                                        colorScheme="gray"
                                        color={color}
                                        pr={["1", "4"]}
                                        leftIcon={<Icon as={RiPencilLine} />}
                                    >
                                        { isWideVersion ? 'Edit' : '' }
                                    </Button>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>

                    <Pagination />
                </Box>
            </Flex>
        </Box>
    )
}