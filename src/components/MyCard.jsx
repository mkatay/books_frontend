import { Card, Image, Text, Badge, Button, Group, Title } from '@mantine/core';

export const MyCard=({title,cover,description,rating,author,categ,category})=> {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{width:'300px'}}>
      <Card.Section>
        <Image
            src={cover}
             w="100%"
            mah={320}   // max height
            fit="contain"
            alt={title}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
        <Badge color="pink">Rating:{rating}</Badge>
      </Group>
      <Text size="sm" c="dimmed">{description}</Text>
{categ && <Text size="md" >Kategória:{category}</Text>}
      <Title  order={5}>Szerző: {author}</Title>
    </Card>
  );
}