import { Box, Flex, Loader, Notification, Text, Title } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { MyCard } from './MyCard'
import { getBooksBySearchedText } from '../utils'

export const SearchResult = () => {
    const {txt}=useParams()
    const { isLoading, status, data, error, isError } = useQuery({ queryKey: ['booksbytitle', txt], queryFn: getBooksBySearchedText })

  const xIcon = <IconX size={20} />;

  return (
    <Flex direction="column" justify="flex-start" gap="md" align="center" >
      {isLoading && <Loader color="blue" />}
      {isError && 
        <Notification icon={xIcon} color="red" title="Bummer!">
          {error.message}
        </Notification>}
       {data &&  <Text>A keresett könyvcím/könyvcím részlet: <span style={{fontSize:'1.5rem'}}>{txt}</span></Text>}
      {(data && data.data.length>0) ? data.data.map(obj =>
                                      <Box key={obj.id}>
                                        <MyCard {...obj} categ={true}/>
                                      </Box>
                                    )
      :
       <Notification icon={xIcon} color="indigo" title="Bummer!">
         A keresés nem eredményezett találatot!
        </Notification>
      }
    </Flex>
  )
}


