import { publicRequest } from '../requestMethods'
import {React, useState, useEffect} from 'react'
import styled from 'styled-components'
import Product from './Product'


const Container = styled.div`
    padding:20px;
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
`

const Products = ({cat, filters, sort}) => {
  const [products, setProducts] = useState([]);  
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
    await publicRequest.get(
      cat 
      ? `/products?category=${cat}` 
      : `/products`).then((res) => {
        setProducts(res.data)
      }).catch((err) => {
        console.log(err)
      })
    }
    getProducts()
  },[cat]);

  console.log(products)
  
  useEffect(() => {
    cat && setFilteredProducts(
      products.filter(item => 
        Object.entries(filters).every(([key, value]) =>
           item[key].includes(value)
        )
      )
    );
  },[products, cat, filters])

//seleciona os novos produtos, por exemplo uma nova coleção
  useEffect(() => {
    if(sort === "newest"){
      setFilteredProducts((prev) =>
        [...prev].sort((a,b)=>a.createdAt - b.createdAt) 
      )
    }else if(sort === "asc"){
      setFilteredProducts((prev) => 
        [...prev].sort((a,b)=> a.price - b.price) 
      )
    } else{
      setFilteredProducts((prev) => 
        [...prev].sort((a,b)=> b.price - a.price) 
      )
    }
  },[sort])  
  
  return (
    <Container>
      {cat 
        ? filteredProducts.map(item=>(<Product item={item} key={item._id}/>))
        : products.slice(0.8).map(item=>(<Product item={item} key={item._id}/>))
    }
    </Container>
  )
}

export default Products


  