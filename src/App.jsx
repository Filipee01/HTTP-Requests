import './App.css'
import { useState, useEffect } from 'react'

//custom hook import

import { useFetch } from './hooks/usefetch'

function App() {
  const [products, setProducts] = useState([])
  const url = 'http://localhost:3001/products'

  //custom hook import
  const {data: items} = useFetch(url)


  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  //resgate de dados da api
  // useEffect(() => {
  //   async function fetchData() {
  //   fetch(url)
  //   .then(response => response.json())
  //   .then(data => setProducts(data))
  //   }
  //   fetchData()
  // },[])

 // adicao de um novo produto
 const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
      name,
      price,
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })

    //carregamento dinamico de produtos
    const addedProduct = await res.json()
    setProducts(prevProducts => [...prevProducts, addedProduct])

    setName('')
    setPrice('')

 }

  return (
    <div className='app'>
    <h1>lista de produtos</h1>
    <ul>
      {items && items.map(product => (
        <li key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.price}</p>
        </li>
      ))}
    </ul>
    <div className="add-product">
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Preço:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <button type="submit">Adicionar</button>
      </form>
    </div>
    </div>
  )
}

export default App
