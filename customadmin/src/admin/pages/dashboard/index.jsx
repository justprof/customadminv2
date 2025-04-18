import React, { useState, useEffect, useMemo } from "react";
import { Box, VStack, Heading } from "@chakra-ui/react";
import DataTable from "../../../components/datatable";
import { data } from "../../../data/FakeUserData";
import avatar from "../../../assets/pp.webp";
import { setPageHeader } from "../../../store/root/rootSlice";
import { useDispatch } from "react-redux";
import { MdEdit, MdDeleteForever } from "react-icons/md";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState(data);
  const [totalCount, setTotalCount] = useState(data.length);
    
  useEffect(() => {
    dispatch(setPageHeader("Dashboard"));
  }, [dispatch]);

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
        width:"80px",
    },
    { key: "id", header: "ID", primaryKey: true },
     { key: "name", header: "Name" },
     { key: "age", header: "Age" },
     { key: "email", header: "Email" },
  ];

  //ContexMenu items
 const contextMenuItems = [
  { key: "Edit", text: "Edit", icon: MdEdit },
  { key: "Delete", text: "Delete", icon: MdDeleteForever },
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

  const handleItemClick = (key, rowData) => {
    if (key === "Edit") {
      console.log(key , rowData);
    } else if (key === "Delete") {
      console.log(key, rowData);
    }
  };


  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        
        <DataTable
           columns={columns}
           data={tableData}
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
           contextMenuItems={contextMenuItems}
           onItemClick={handleItemClick}
         />
       </VStack>
     </Box>
   );
 };

export default Dashboard;
