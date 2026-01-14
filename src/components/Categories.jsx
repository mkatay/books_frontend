import { Box, Loader, Notification, Paper, Text, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getCategories } from '../utils'
import { IconX } from '@tabler/icons-react'

export const Categories = () => {
    const { isLoading, status, data, error, isError } = useQuery({ queryKey: ['categories'], queryFn: getCategories })
    const xIcon = <IconX size={20} />;

    data && console.log(data.data);
    //isLoading && console.log("loading...");
    isError && console.log(error);




    return (
        <>
            {isLoading && <Loader color="blue" />}
            {isError && <Notification icon={xIcon} color="red" title="Bummer!">
                {error.message}
            </Notification>}
            {data && data.data.map(obj =>
                <Box key={obj.id}>
                    <Paper shadow="md" radius="lg" withBorder p="xl" 
                        style={{
                            width:'300px',
                            cursor: 'pointer',
                            transition: 'all 150ms ease',
                            '&:hover': {
                                boxShadow: 'md',
                                backgroundColor: '#92bae2ff',
                            },
                        }}
                    >
                        <Title order={3} style={{ textAlign: 'center' }}>{obj.name}</Title>
                    </Paper>

                </Box>

            )

            }
        </>
    )
}

