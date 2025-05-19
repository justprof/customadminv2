import {
  Flex,
  Box,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";



export default function Login() {
  const bg = useColorModeValue("gray.50", "gray.800");
  const boxBg = useColorModeValue("white", "gray.700");

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={bg}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Text color={"blue.400"}>features</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={boxBg}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Field.Root id="email">
              <Field.Label>Email address</Field.Label>
              <Input type="email" />
            </Field.Root>
            <Field.Root id="password">
              <Field.Label>Password</Field.Label>
              <Input type="password" />
            </Field.Root>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
