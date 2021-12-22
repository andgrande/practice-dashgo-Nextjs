import Link from "next/link";
import { Box, Button, Flex, Divider, VStack, SimpleGrid, HStack } from "@chakra-ui/react";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../components/FormComponents/Input";
import { Header } from "../../components/Header";
import { SectionHeading } from "../../components/PagesElements/SectionHeading";
import { Sidebar } from "../../components/Sidebar";

import { useMutation } from 'react-query';
import { api } from "../../services/axios";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/dist/client/router";

type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }
  
  const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Name is mandatory'),
    email: yup.string().required('E-mail is mandatory').email('Please provide a valid e-mail address'),
    password: yup.string().required('Password is mandatory').min(6, 'Password must contain at least 6 characters'),
    password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'Must match password'),
  })

export default function CreateUsers() {
    const router = useRouter();

    const createUser = useMutation(async (user: CreateUserFormData) => {
      const response = await api.post('users', {
        user: {
          ...user,
          created_at: new Date(),
        }
      })

      return response.data.user;
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries('users')
      }
    })
    const { register, handleSubmit, formState: { errors, isSubmitting} } = useForm<CreateUserFormData>({
        resolver: yupResolver(createUserFormSchema),
    });

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
        // await new Promise(resolve => setTimeout(resolve, 1000));
        await createUser.mutateAsync(values);

        router.push('/users');
    }

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" >
                <Sidebar />

                <Box
                  as="form"
                  flex="1"
                  borderRadius={8}
                  bg="gray.800"
                  p={["4", "8"]}
                  onSubmit={handleSubmit(handleCreateUser)} 
                >
                    <SectionHeading>Create user</SectionHeading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8" >
                        <SimpleGrid minChildWidth="240px" spacing={["4", "8"]} w="100%" >
                            <Input
                              name="name"
                              label="Full name"
                              {...register('name')}
                              error={errors.name} 
                            />
                            <Input
                              name="email"
                              label="E-mail"
                              {...register('email')}
                              error={errors.email} 
                            />
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing={["4", "8"]} w="100%" >
                            <Input
                              name="password"
                              type="password"
                              label="Password"
                              {...register('password')}
                              error={errors.password} 
                            />
                            <Input
                              name="password_confirmation"
                              type="password"
                              label="Password confirmation"
                              {...register('password_confirmation')}
                              error={errors.password_confirmation} 
                            />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end" >
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button as="a" colorScheme="whiteAlpha">Cancel</Button>
                            </Link>
                            <Button type="submit" colorScheme="pink" isLoading={isSubmitting} >Save</Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}