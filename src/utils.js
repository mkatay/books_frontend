import axios from "axios";

const baseURL="http://localhost:8000/books/"

export const getCategories= async ()=>{
    const response= await axios.get(baseURL+"categories")
    return response
}
export const getBooksByCategory= async ({queryKey})=>{
    const response= await axios.get(baseURL+"categ/"+queryKey[1])
    return response
}