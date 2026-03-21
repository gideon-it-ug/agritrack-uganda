import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { ugandaDistricts } from './ugandaDistricts'

const icons = { Maize: '🌽', Beans: '🫘', Cassava: '🥔', Rice: '🍚', Millet: '🌾' }

export default function PriceMap({ prices }) {
  const grouped = {}
  prices.forEach(p => {
    if (!grouped[p.district]) grouped[p.district] = []
    grouped[p.district].push(p)
  })

  function style(feature) {
    const hasPrices = grouped[feature.properties.name]
    return {
      fillColor: hasPrices ? '#4caf50' : '#cccccc',
      fillOpacity: 0.7,
      color: '#fff',
      weight: 1
    }
  }

  function onEachFeature(feature, layer) {
    const name = feature.properties.name
    const crops = grouped[name]
    if (crops) {
      const rows = crops.map(p =>
        `<tr><td>${icons[p.crop] || '🌿'} ${p.crop}</td><td><b>UGX ${p.price.toLocaleString()}</b></td></tr>`
      ).join('')
      layer.bindPopup(`<b>📍 ${name}</b><br/><table>${rows}</table>`)
    } else {
      layer.bindPopup(`<b>📍 ${name}</b><br/>No data yet`)
    }
  }

  return (
    <MapContainer center={[1.3733, 32.2903]} zoom={7}
      style={{ height: '400px', borderRadius: '12px', marginBottom: '24px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      <GeoJSON data={ugandaDistricts} style={style} onEachFeature={onEachFeature}/>
    </MapContainer>
  )
}