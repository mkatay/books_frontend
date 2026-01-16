import axios from "axios";

const baseURL="http://localhost:8000/books"

export const getCategories= async ()=>{
    const response= await axios.get(baseURL+"/categories")
    return response
}

export const getBooksByCateg= async ({queryKey})=>{
    console.log(queryKey[1]);    
    const response= await axios.get(baseURL+"/categ/"+queryKey[1])
    return response
}
export const getBooksBySearchedText= async ({queryKey})=>{
    console.log(queryKey[1]);    
    const response= await axios.get(baseURL+"/title/"+queryKey[1])
    return response
}

export const readBooks=async (setBooks)=>{
     const response= await axios.get(baseURL)
     setBooks(response.data)
}

export const createBook = async (newBook) => {
  const response = await axios.post(baseURL, newBook);
  return response.data;  // visszatér az új könyv objektum (id-vel együtt)
};
export const updateBook = async (id, updatedData) => {
  const response = await axios.put(`${baseURL}/${id}`, updatedData);
  return response.data;
};
export const deleteBook=async (id)=>{
  const response=await axios.delete(baseURL+'/'+id)
  return response.data
}