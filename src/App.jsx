import { Affix, Box, Button, Center, Container, Flex, Paper, Text, Title } from "@mantine/core"
import { useViewportSize } from '@mantine/hooks';
import { Categories } from "./components/Categories";

function App() {
  const { height, width } = useViewportSize();

  return (
    <Flex mih={height} bg="var(--mantine-color-blue-light)"  gap="md" justify="center" align="center" direction="row"   wrap="wrap">
       
         <Affix position={{ top: 20}} style={{width:width}}>
            <Title order={3}  c="var(--mantine-color-blue-8)" style={{textAlign:'center'}}>Válogass a könyvtárban</Title>          
         </Affix>
        

        <Categories />
      
    </Flex>

  
  )
}

export default App
