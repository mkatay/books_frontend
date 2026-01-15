import { Affix, Box, Button, Center, Container, Flex, Paper, Text, Title } from "@mantine/core"
import { useMediaQuery, useViewportSize } from '@mantine/hooks';
import { Categories } from "./components/Categories";
import { MyMenu } from "./components/MyMenu";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Books } from "./components/Books";
import { SearchResult } from "./components/SearchResult";
import { BooksByCateg } from "./components/BooksByCateg";
import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const { height, width } = useViewportSize();
  const [isAdmin,setIsAdmin]=useState(false)
  const isMobile = useMediaQuery('(max-width: 500px)');
console.log(isAdmin);

  return (
    <BrowserRouter>
      <Flex mih={height} bg="var(--mantine-color-blue-light)"  gap="md" justify="center" pt={100} align="flex-start" direction="row"   wrap="wrap">
        
          <Affix position={{ top: 0}} h="80" w={width} bg="indigo">           
                <Title order={3} pt="20" c="var(--mantine-color-blue-1)" style={{textAlign:'center'}}>Válogass a könyvtárban</Title>    
          </Affix>
          <Affix  position={{ top: isMobile ? 50 : 20, right: 10 }}>
              <MyMenu setIsAdmin={setIsAdmin}/>
          </Affix>

         <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/search/:txt" element={<SearchResult />} />
          <Route path="/books/categ/:categId" element={<BooksByCateg />} /> 
          <Route path="/dashboard"  element={<ProtectedRoute isAdmin={isAdmin}> <Dashboard /> </ProtectedRoute> }/>
       </Routes>

      </Flex>

  </BrowserRouter>
  )
}

export default App
