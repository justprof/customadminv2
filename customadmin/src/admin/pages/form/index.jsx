import React, { useState } from "react";
 import { Box, Button } from "@chakra-ui/react";
 import { TextBox,NumberBox, TextArea, SelectBox, } from "../../../components/textbox";
 
 const MyForm = () => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [description, setDescription] = useState("");
   const [age,setAge] = useState("");
   const [gender, setGender] = useState("");
 
   const handleNameChange = (value) => {
     setName(value);
   };
 
   const handleEmailChange = (value) => {
     setEmail(value);
   };
   const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleAgeChange = (value) => {
    setAge(value);
  };
 
   const handleSubmit = () => {
    console.log("Final submitted name:", name);
    console.log("Final submitted email:", email);
    console.log("Final submitted description:", description);
    console.log("Final submitted age:", age);
    console.log("Final submitted gender:", gender);


   };

   const handleGenderChange = (value) => {
    setGender(value);
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
         showCharacterCount={true}
         startAddon="#"
         
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
         endAddon="@example.com"
         startAddon="tl"

       />

        <TextArea
         label="Açıklama"
         name="description"
         placeholder="Açıklamanızı girin"
         initialValue={description}
         getFinalValue={handleDescriptionChange}
         isRequired={true}
         maxLength={100}
         helpText="Açıklamanız"
         showCharacterCount={true}
       />

        <NumberBox
         label="Yaş"
         name="age"
         placeholder="Yaşınızı girin"
         initialValue={age}
         getFinalValue={handleAgeChange}
         isRequired={true}
         min={0}
         max={120}
         precision={2}
         step={0.2}
         helpText="Yaşınız"
       />

        <SelectBox
         label="Cinsiyet"
         name="gender"
         placeholder="Cinsiyetinizi seçin"
         initialValue={gender}
         getFinalValue={handleGenderChange}
         isRequired={true}
         options={[
           { value: "male", label: "Erkek" },
           { value: "female", label: "Kadın" },
           { value: "other", label: "Diğer" },
         ]}
         helpText="Cinsiyetiniz"
       />

       <Button mt={4} onClick={handleSubmit}>
         Gönder
       </Button>
     </Box>
   );
 };
 
 export default MyForm;