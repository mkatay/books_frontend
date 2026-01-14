import React from 'react'
import { useParams } from 'react-router-dom'


export const SearchResult = () => {
    const {txt}=useParams()
    
  return (
    <div>
      a keresett cím:{txt}
    </div>
  )
}
