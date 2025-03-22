import {
    Flex,
    Box,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
  } 
  from "@chakra-ui/react";
  import { useState } from "react";
  import { FaEye, FaEyeSlash } from "react-icons/fa";
  import { Link } from "react-router-dom";
  import  useCustomColorModeValue  from "/src/hooks/useCustomColorModeValue";
  import { Field } from "@chakra-ui/react"
  
  
  export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
  
    return (
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useCustomColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useCustomColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <Field.Root id="firstName" isRequired>
                    <Field.Label>First Name</Field.Label>
                    <Input type="text" />
                  </Field.Root>
                </Box>
                <Box>
                  <Field.Root id="lastName">
                    <Field.Label>Last Name</Field.Label>
                    <Input type="text" />
                  </Field.Root>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {/* {showPassword ? <FaEye /> : <FaEyeSlash />} */}
                      {showPassword ? <FaEye /> : <FaEyeSlash />}

                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link to={"/login"} color={"blue.400"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }