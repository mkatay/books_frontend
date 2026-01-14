import { Box, Flex, Loader, Notification, Paper, Text, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getCategories } from '../utils'
import { IconX } from '@tabler/icons-react'
import "./Categories.css"
import { useNavigate } from 'react-router-dom'

export const Categories = () => {
    const { isLoading, status, data, error, isError } = useQuery({ queryKey: ['categories'], queryFn: getCategories })
    const xIcon = <IconX size={20} />;

    data && console.log(data.data);
    //isLoading && console.log("loading...");
    isError && console.log(error);

    const navigate=useNavigate()


    return (
        <Flex  gap="md" justify="flex-start" align="center" direction="column"   wrap="wrap" >
            {isLoading && <Loader color="blue" />}
            {isError && 
                <Notification icon={xIcon} color="red" title="Bummer!">
                    {error.message}
                </Notification>
            }
            {data && data.data.map(obj =>
                <Box key={obj.id}>
                    <Paper shadow="md" radius="lg" withBorder p="xl" className="category">
                        <Title order={3} style={{ textAlign: 'center' }} onClick={()=>navigate('/books/categ/'+obj.id)}>{obj.name}</Title>
                    </Paper>

                </Box>

            )

            }
        </Flex>
    )
}

