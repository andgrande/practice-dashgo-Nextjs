import NextLink from "next/link";
import { useState } from "react";
import { Box, Button, Checkbox, Flex, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue, useColorModeValue, Spinner, Link } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { SectionHeading } from "../../components/PagesElements/SectionHeading";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from '../../services/queryClient';
import { api } from "../../services/axios";

export default function Users() {
    const [ page, setPage ] = useState<number>(1);
    const { data: dataQuery, isLoading: isLoadingQuery, error: queryError, isFetching, refetch } = useUsers(page);

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })

    const bg = useColorModeValue('gray.50', 'gray.800');
    const color = useColorModeValue('gray.800', 'gray.50');
    const buttonColor = useColorModeValue('cyan.800', 'cyan.200')

    async function handlePrefetchUser(userId: string) {
        await queryClient.prefetchQuery(['users', userId], async () => {
            const response = await api.get(`users/${userId}`);

            return response.data;
        }, {
            staleTime: 1000 * 60 * 10 // 10 minutes,
        })
    }

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" >
                <Sidebar />

                <Box flex="1" borderRadius={8} bg={bg} p={["4", "8"]}>
                    <Flex mb="8" justify="space-between" align="center">
                        <SectionHeading>
                            Users
                        </SectionHeading>

                        <Box>
                            <Button
                                onClick={() => refetch()}
                                as="button"
                                size="sm"
                                fontSize="sm"
                                colorScheme="cyan"
                                color={buttonColor}
                                minWidth="100"
                                mr="4"
                            >
                                {isFetching ? <Spinner size="sm" color="gray.500" /> : <Text color={bg}>Refresh</Text>}
                            </Button>

                            <NextLink href="/users/create" passHref>
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
                            </NextLink>

                        </Box>
                    </Flex>

                    { isLoadingQuery ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : queryError ? (
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
                                {dataQuery.users.map(user => (
                                    <Tr>
                                        <Td px={["2", "4", "6"]}>
                                            <Checkbox colorScheme="pink" />
                                        </Td>
                                        <Td>
                                            <Box>
                                                <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                                    <Text fontWeight="bold">{user.name}</Text>
                                                </Link>
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

                    <Pagination 
                        totalCountOfRegisters={dataQuery?.totalCount}
                        currentPage={page}
                        onPageChange={setPage}
                    />
                </Box>
            </Flex>
        </Box>
    )
}