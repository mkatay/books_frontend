import { Menu, TextInput, Burger, Modal, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

export const MyMenu = ({setIsAdmin}) => {
  const [searchedTxt, setSearchedTxt] = useState("");
  const [opened, { toggle }] = useDisclosure(false);
  const [modalOpened, { open: openModal, close: closeModal }] =useDisclosure(false);
  const [password, setPassword] = useState("");

  
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (password === "kam123") {   // <-- EZ A TITKOS JELSZÓ
        setIsAdmin(true)           // beléptetés
      closeModal();    
      setPassword('')
      navigate('/dashboard')
    } else {
      alert("Hibás admin jelszó!");
    }
  };

  return (
    <>
    <Menu
      opened={opened}
      onChange={toggle}
      transitionProps={{ transition: "rotate-right", duration: 150 }}
    >
      <Menu.Target>
        <Burger opened={opened} onClick={toggle} size="md"  color="var(--mantine-color-blue-1)"/>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={() => navigate("/")}>Kategóriák</Menu.Item>
        <Menu.Item onClick={() => navigate("/books")}>Összes könyv</Menu.Item>

        <TextInput
          value={searchedTxt}
          onChange={(e) => setSearchedTxt(e.currentTarget.value)}
          placeholder="keresés címben..."
          leftSection={
            <IconSearch
              size={14}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/books/search/" + searchedTxt)}
            />
          }
          sx={{
            width: "100%",
            minWidth: 220,
          }}
        />
        <Menu.Item onClick={openModal}>Dashboard</Menu.Item>
      </Menu.Dropdown>
    </Menu>

     <Modal opened={modalOpened} onClose={closeModal} title="Admin belépés">
        <TextInput
          label="Admin jelszó"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button mt="md" onClick={handleSubmit}>
          Belépés
        </Button>
      </Modal>

   
    </>
  );
};
