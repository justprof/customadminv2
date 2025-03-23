import React, { useState } from "react";
import { Box, VStack, Heading } from "@chakra-ui/react";
import DataTable from "../../../components/datatable";
import { data } from "../../../data/FakeUserData";
import avatar from "../../../assets/pp.webp";

const Dashboard = () => {

  const [tableData, setTableData] = useState(data);
  const [totalCount, setTotalCount] = useState(data.length);
    
  const columns = [
    {
      key: "avatar",
      header: "Avatar",
      
      render: () => (
          <img
            src={avatar}
            alt="user"
            style={{ maxWidth: "100px", height: "auto" }}
          />
        ),
    },
    { key: "id", header: "ID" },
     { key: "name", header: "Name" },
     { key: "age", header: "Age" },
     { key: "email", header: "Email" },
  ];
  
  const fetchData = ({ currentPage, rowsPerPageState, searchTerm}) => {
    console.log("Fetching data with Params", {
      currentPage,
      rowsPerpageState,
      searchTerm,
    });

    setTableData(data);
    setTotalCount(data.length);
  }

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="lg">
          Dashboard
        </Heading>
        <DataTable
           columns={columns}
           data={dataTable}
           totalCount={(totalCount)}
           rowsPerPage={5}
           onDataChange={fetchData}
           handleRefresh={() => {
            return data;
           }}
           deleteActive={true}
           onDelete={(e) => {
             console.log(e);
           }}
           editActive={true}
           onEdit={(e) => {
             console.log(e);
           }}
           selectable={true}
           onDeleteSelected={(e) => {
             console.log(e);
           }}
         />
       </VStack>
     </Box>
   );
 };

export default Dashboard;
