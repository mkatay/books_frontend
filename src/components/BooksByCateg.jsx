import { IconX } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { getBooksByCategory } from '../utils'
import { Box, Flex, Loader, Paper, Title } from '@mantine/core'
import { MyCard } from './MyCard'

export const BooksByCateg = () => {
  const {categId}=useParams()
  const { isLoading, status, data, error, isError } = useQuery({ queryKey: ['booksbycateg',categId], queryFn: getBooksByCategory })
  const xIcon = <IconX size={20} />;

  data && console.log(data.data);
  //isLoading && console.log("loading...");
  isError && console.log(error);


  return (
      <Flex  gap="md" justify="flex-start" align="center" direction="column"   wrap="wrap" >
          {isLoading && <Loader color="blue" />}
          {isError && 
              <Notification icon={xIcon} color="red" title="Bummer!">
                  {error.message}
              </Notification>
          }
          {data && data.data.map(obj =>
              <Box key={obj.id} >
                  <MyCard {...obj}/>

              </Box>

          )

          }
      </Flex>
  )
}

