import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const DISTRICT_COORDS = {
  'Kampala': [0.3476, 32.5825],
  'Gulu':    [2.7666, 32.2999],
  'Mbale':   [1.0796, 34.1750],
  'Lira':    [2.2499, 32.8999],
  'Kabale':  [1.2491, 29.9989],
  'Masaka':  [0.3360, 31.7360],
  'Soroti':  [1.7148, 33.6109],
}

export default function PriceMap({ prices }) {
  return (
    <MapContainer center={[1.3733, 32.2903]} zoom={7} style={{ height: '400px', borderRadius: '12px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      {prices.map(p => {
        const coords = DISTRICT_COORDS[p.district]
        if (!coords) return null
        return (
          <Marker key={p.id} position={coords}>
            <Popup>
              <b>{p.crop}</b><br/>
              📍 {p.district}<br/>
              UGX {p.price.toLocaleString()} / kg
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}