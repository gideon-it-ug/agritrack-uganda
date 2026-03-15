function PriceCard({crop, district, price}){
  return (
    <div style={{bprder: '1px solid green', padding: '16px', margin: '8px', borderRadius: '8px'}}>
      <h3>{crop}</h3>
      <p>District: {district}</p>
      <p>Price: UGX {price} / kg</p>
    </div>
  )
}
function App(){
  const prices = [
    {id:1, crop: "Maize", district: "Kampala", price: "12000"},
    {id:2, crop: "Beans", district: "Gulu", price: "3500"},
    {id:3, crop: "Cassava", district: "Mbale", price: "800"},
    {id:4, crop: "Rice", district: "Lira", price: "2800"},
  ]
  return (
    <div style={{ 
      border: '1px solid #4caf50',
      padding: '16px',
      margin: '8px 0',
      borderRadius: '8px',
      background: '#1a2e1a'
    }}>
      <h1>AgriTrack Uganda 🌾</h1>
      <p>Live crop prices across Uganda</p>
      {prices.map(item=> (
        <PriceCard key ={item.id} crop={item.crop} district={item.district} price={item.price}/>
      ))}
    </div>
  )
}
export default App