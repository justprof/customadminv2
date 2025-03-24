import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { ChakraProvider } from "@chakra-ui/react";


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
       <ChakraProvider theme={theme}>
          <App />
       </ChakraProvider>
     </Provider>
  </React.StrictMode>,
)
