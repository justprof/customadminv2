import React, { useState, useEffect } from "react";
import { Box, Button} from "@chakra-ui/react";
import { TextBox, NumberBox, TextArea } from "../../../components/textbox";
import SelectBox from "../../../components/selectbox";
import { FaGenderless } from "react-icons/fa";
import { Icon } from "@chakra-ui/react";
import { FileUpload, FileTypes } from "../../../components/fileupload";
import Form from "../../../components/form";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useDispatch } from "react-redux";
import { setPageHeader } from "../../../store/root/rootSlice";





 const MyForm = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageHeader("Form"));
  }, []);

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    alert(JSON.stringify(values, null, 2));
  };


 
   return (
    <Box bg={bgColor} color={textColor} p={4}>

<Form onSubmit={handleSubmit} buttonPosition="left"> 
        <TextBox
          label="İsim"
          name="name"
          placeholder="İsminizi girin"
          isRequired={true}
          maxLength={20}
          helpText="Tam isminiz"
          showCharacterCount={true}
          startAddon="#"
          defaultValue="Prof"
        />
        <TextBox
          label="E-posta"
          name="email"
          placeholder="E-posta adresinizi girin"
          type="email"
          isRequired={true}
          helpText="E-posta adresiniz"
          endAddon="@example.com"
          initialValue="Prof"
        />
        <TextArea
          label="Açıklama"
          name="description"
          placeholder="Açıklamanızı girin"
          isRequired={true}
          maxLength={100}
          helpText="Açıklamanız"
          showCharacterCount={true}
        />
        <NumberBox
          label="Yaş"
          name="age"
          placeholder="Yaşınızı girin"
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
          options={[
            { value: "male", label: "Erkek" },
            { value: "female", label: "Kadın" },
            { value: "other", label: "Diğer" },
          ]}
          isMulti={true}
          isSearchable={true}
          helpText="Cinsiyetiniz"
          isRequired={true}
        />
        <SelectBox
          label="Ülke"
          name="country"
          placeholder="Ülkenizi seçin"
          options={[
            { value: "tr", label: "Türkiye" },
            { value: "us", label: "ABD" },
            { value: "de", label: "Almanya" },
          ]}
          isMulti={false}
          isSearchable={true}
          helpText="Ülkeniz"
        />
        <FileUpload
          label="Dosya Yükle"
          name="file"
          acceptedFileTypes={FileTypes.IMAGE}
          maxFileSize={2}
          isRequired={true}
          valueType="base64"
          helpText="Yüklemek istediğiniz dosyayı seçin."
        />




      </Form>
       
     </Box>
   );
 };
 
 export default MyForm;