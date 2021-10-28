import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button, Flex, Stack } from '@chakra-ui/react';
import { Input } from '../components/FormComponents/Input';

type SignInFormData = {
  name: string;
  email: string;
}

const signinSchema = yup.object().shape({
  email: yup.string().required('E-mail is mandatory').email('Please provide a valid e-mail address'),
  password: yup.string().required('Password is mandatory').min(6, 'Password must contain at least 6 characters'),
})

export default function SignIn() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(values);
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDirection="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">

          <Input
            name="email"
            type="email"
            label="E-mail"
            {...register(
              'email',
              // { required: 'Email is requireeeed'}
            )} 
            error={errors.email}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            {...register('password',
            // { required: 'Password is mandatory' }
            )} 
            error={errors.password}
          />

        </Stack>

        <Button
            type="submit"
            mt="8"
            colorScheme="pink"
            size="lg"
            isLoading={isSubmitting}
          >
            Entrar
          </Button>

      </Flex>
    </Flex>
  )
}
