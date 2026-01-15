import { Button, Flex, ScrollArea, Table, Modal, TextInput, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";
import { createBook, readBooks, updateBook } from "../utils";
import { FaTrash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";

export const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newBook, setNewBook] = useState({title: "",author: "", description: ""});
  const [editingBook, setEditingBook] = useState(null);


  useEffect(() => {
    readBooks(setBooks);
  }, []);

  const handleChange = (e) => {
    setNewBook({...newBook,[e.target.name]: e.target.value});
  };
/*const handleSave = async () => {
  try {
    // Kiegészítjük az új könyvet kötelező mezőkkel, ha nincs űrlap hozzájuk
    const bookToSave = {...newBook, category_id: 1,rating: 1,cover:"borító"};
    console.log(bookToSave);
    
    const savedBook = await createBook(bookToSave);
    setBooks(current => [...current, savedBook]);
    setShowForm(false);
    setNewBook({ title: "", author: "", description: "" });
  } catch (error) {
    console.error("Hiba a könyv mentésekor:", error);
  }
};
*/
const handleSave = async () => {
  try {
    const bookToSave = {...newBook,category_id: 1,  cover: "borító", rating: 1,};

    if (editingBook) {
      const updatedBook = await updateBook(editingBook.id, bookToSave);
      setBooks((current) => current.map((b) => (b.id === editingBook.id ? updatedBook : b)));
    } else {
      const savedBook = await createBook(bookToSave);
      setBooks((current) => [...current, savedBook]);
    }

    setShowForm(false);
    setNewBook({ title: "", author: "", description: "" });
    setEditingBook(null);
  } catch (error) {
    console.error("Hiba a könyv mentésekor:", error);
  }
};


const handleEditClick = (book) => {
  setEditingBook(book);
  setNewBook({title: book.title,author: book.author,description: book.description});
  setShowForm(true);
};


  const rows = books.map((obj) => (
    <Table.Tr key={obj.id}>
      <Table.Td>{obj.title}</Table.Td>
      <Table.Td>{obj.author}</Table.Td>
      <Table.Td>{obj.description}</Table.Td>
      <Table.Td>
        <FaTrash style={{ color: "red", cursor: "pointer" }} size={20} />
        <CiEdit size={20} style={{ color: "blue", cursor: "pointer" }} onClick={()=>handleEditClick(obj)} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Flex
        gap="md"
        justify="flex-start"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <ScrollArea h={400} bg="#f3f0ff">
          <Table
            stickyHeader
            withTableBorder
            withColumnBorders
            withRowBorders
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Cím</Table.Th>
                <Table.Th>Szerző</Table.Th>
                <Table.Th>Leírás</Table.Th>
                <Table.Th>action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
            <Table.Caption>
              Összesen {books.length} könyv van a nyílvántartásban.
            </Table.Caption>
          </Table>
        </ScrollArea>

        <Button
          title="új könyv hozzáadása"
          onClick={() => setShowForm(true)}
          leftIcon={<IoIosAddCircleOutline size={20} />}
        >
          Új könyv hozzáadása
        </Button>
      </Flex>

      <Modal  opened={showForm}   
            onClose={() => {
                    setShowForm(false);
                    setEditingBook(null);
                    setNewBook({ title: "", author: "", description: "" });
                }}  
            title={editingBook ? "Könyv módosítása" : "Új könyv hozzáadása"} >
        <TextInput
          label="Cím"
          name="title"
          value={newBook.title}
          onChange={handleChange}
          required
        />

        <TextInput
          mt="md"
          label="Szerző"
          name="author"
          value={newBook.author}
          onChange={handleChange}
          required
        />

        <Textarea
          mt="md"
          label="Leírás"
          name="description"
          value={newBook.description}
          onChange={handleChange}
        />

        <Button mt="md" onClick={handleSave}>   Mentés  </Button>
      </Modal>
    </>
  );
};
