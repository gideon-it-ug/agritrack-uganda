import { useState, useEffect } from 'react'
import PriceMap from './map'

const CROPS = ['All', 'Maize', 'Beans', 'Cassava', 'Rice', 'Millet']

function PriceCard({ crop, district, price }) {
  const icons = { Maize: '🌽', Beans: '🫘', Cassava: '🥔', Rice: '🍚', Millet: '🌾' }
  return (
    <div style={{
      background: '#1a2e1a',
      border: '1px solid #2d4a2d',
      borderRadius: '12px',
      padding: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'border-color 0.2s',
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = '#4caf50'}
    onMouseLeave={e => e.currentTarget.style.borderColor = '#2d4a2d'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '32px' }}>{icons[crop] || '🌿'}</span>
        <div>
          <h3 style={{ margin: 0, color: '#e8f5e8' }}>{crop}</h3>
          <p style={{ margin: 0, color: '#6a9a6a', fontSize: '14px' }}>📍 {district}</p>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ margin: 0, color: '#4caf50', fontSize: '22px', fontWeight: 'bold' }}>
          UGX {price.toLocaleString()}
        </p>
        <p style={{ margin: 0, color: '#6a9a6a', fontSize: '12px' }}>per kg</p>
      </div>
    </div>
  )
}

function App() {
  const [prices, setPrices] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetch('/api/prices/')
      .then(res => res.json())
      .then(data => { setPrices(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = prices.filter(p =>
    (filter === 'All' || p.crop === filter) &&
    (p.crop.toLowerCase().includes(search.toLowerCase()) ||
     p.district.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: '#4caf50', fontSize: '2.2rem', margin: 0 }}>🌾 AgriTrack Uganda</h1>
        <p style={{ color: '#6a9a6a', marginTop: '8px' }}>Live crop prices across Uganda</p>
        <PriceMap prices={prices}/>
      </div>

      <input
        placeholder="🔍 Search crop or district..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%', padding: '12px 16px', borderRadius: '8px',
          border: '1px solid #2d4a2d', background: '#1a2e1a',
          color: '#e8f5e8', fontSize: '15px', marginBottom: '16px',
          boxSizing: 'border-box'
        }}
      />

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {CROPS.map(crop => (
          <button key={crop} onClick={() => setFilter(crop)} style={{
            padding: '6px 16px', borderRadius: '20px', border: '1px solid #2d4a2d',
            background: filter === crop ? '#4caf50' : '#1a2e1a',
            color: filter === crop ? '#fff' : '#6a9a6a',
            cursor: 'pointer', fontSize: '14px'
          }}>{crop}</button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: '#6a9a6a', textAlign: 'center' }}>Loading prices...</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: '#6a9a6a', textAlign: 'center' }}>No results found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map(item => (
            <PriceCard key={item.id} crop={item.crop} district={item.district} price={item.price} />
          ))}
        </div>
      )}

      <p style={{ color: '#3a5a3a', textAlign: 'center', marginTop: '40px', fontSize: '13px' }}>
        AgriTrack Uganda © 2026 — Empowering farmers with data
      </p>
    </div>
  )
}

export default App