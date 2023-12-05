import { useState, useEffect } from 'react'
import './App.css'
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material'
import axios from "axios"
function App() {
  // Usar con le localhost
  const URL = 'http://localhost:5000/products'
  // cambiar con la url del docker play
  const URLDOCKERPLAY = 'http://ip172-18-0-3-ckqnu1csnmng00aleddg-5000.direct.labs.play-with-docker.com/products'
  const [items, setItems] = useState([]);
  const getinfo = async () => {
    const res = await axios
      // Cambiar la url en esta linea
      .get(URL)
      .catch((error) => console.log({ error }))
    setItems(res.data)
    console.log(res.data)
    return res.data
  }

  useEffect(() => {
    getinfo();
    console.log(items)
  })

  return (
    <>
      <p>PRODUCTOS</p>

      <div>
        {items.map((item) => (
          <Card key={item.productId}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {item.name}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {item.description}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {item.price}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

export default App
