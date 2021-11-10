import Link from "next/link";
import { Box, Button, Checkbox, Flex, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue, useColorModeValue, Spinner } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { SectionHeading } from "../../components/PagesElements/SectionHeading";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useEffect } from "react";
import { useQuery } from "react-query";

export default function Users() {

    const { data, isLoading,error } = useQuery('users', async () => {
        const response = await fetch('http://localhost:3000/api/users');
        const data = await response.json();

        const users = data.users.map(user => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                })
            }
        });

        return users;
    });

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

                    { isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter os dados dos usuários.</Text>
                        </Flex>

                    ) : (
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
                                {data.map(user => (
                                    <Tr>
                                        <Td px={["2", "4", "6"]}>
                                            <Checkbox colorScheme="pink" />
                                        </Td>
                                        <Td>
                                            <Box>
                                                <Text fontWeight="bold">{user.name}</Text>
                                                <Text fontSize="sm" color="gray.300" >{user.email}</Text>
                                            </Box>
                                        </Td>
                                        <Td>{user.createdAt}</Td>
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
                                ))}

                            </Tbody>
                        </Table>
                    )}                    

                    <Pagination />
                </Box>
            </Flex>
        </Box>
    )
}