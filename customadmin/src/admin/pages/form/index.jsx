import React, { useState } from "react";
 import { Box, Button } from "@chakra-ui/react";
 import TextBox from "../../../components/textbox/TextBox";
 
 const MyForm = () => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   
 
   const handleNameChange = (value) => {
     setName(value);
   };
 
   const handleEmailChange = (value) => {
     setEmail(value);
   };
 
   const handleSubmit = () => {
    console.log("Final submitted name:", name);
    console.log("Final submitted email:", email);
     
   };
 
   return (
     <Box>
       <TextBox
         label="İsim"
         name="name"
         placeholder="İsminizi Girin"
         initialValue={name}
         getFinalValue={handleNameChange}
         isRequired={true}
         maxLength={20}
         helpText="Tam isminiz"
         
       />
       <TextBox
         label="E-Posta"
         name="email"
         placeholder="E-posta Adresinizi Girin."
         initialValue={email}
         getFinalValue={handleEmailChange}
         type="email"
         isRequired={true}
         helpText="E-posta adresiniz"
        
       />
       <Button mt={4} onClick={handleSubmit}>
         Gönder
       </Button>
     </Box>
   );
 };
 
 export default MyForm;