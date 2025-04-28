import { ColorModeProvider } from "@/components/ui/color-mode"; 
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createSystem, defaultConfig, ChakraProvider } from "@chakra-ui/react";

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          900: { value: "#1a365d" },
          800: { value: "#153e75" },
          700: { value: "#2a69ac" },
        },
      },
    },
  },
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
       <ChakraProvider value={system}>
          <App />
       </ChakraProvider>
     </Provider>
  </React.StrictMode>,
)