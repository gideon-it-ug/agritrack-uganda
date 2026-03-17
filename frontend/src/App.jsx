import { useState, useEffect } from 'react'

function PriceCard({ crop, district, price }) {
  return (
    <div style={{
      border: '1px solid #4caf50',
      padding: '16px',
      margin: '8px 0',
      borderRadius: '8px',
      background: '#1a2e1a'
    }}>
      <h3>{crop}</h3>
      <p>District: {district}</p>
      <p>Price: UGX {price} / kg</p>
    </div>
  )
}

function App() {
  const [prices, setPrices] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
  fetch('/api/prices/')
    .then(res => res.json())
    .then(data => {
      setPrices(data)
      setLoading(false)
    })
    .catch(error => {
      console.error('Error fetching prices:', error)
      setLoading(false)
    })
}, [])

  
  return (
    <div style={{ padding: '24px' }}>
      <h1>AgriTrack Uganda 🌾</h1>
      <p>Live crop prices across Uganda</p>
      {loading ? <p>Loading prices...</p> : prices.map(item => (
        <PriceCard key={item.id} crop={item.crop} district={item.district} price={item.price} />
      ))}
    </div>
  )
}

export default App