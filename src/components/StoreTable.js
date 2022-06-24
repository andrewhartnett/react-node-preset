import { Link } from 'react-router-dom'

export default function StoreTable ({ stores }) {
  return (
        <div>
        {stores && stores.map(store => {
          return (
              <div className="w-full" key={store._id}>
                <Link to={`/stores/${store._id}`} >{store.name}</Link>
              </div>
          )
        })}
        <Link to={'/stores/create'}>+ Create Store</Link>
        </div>
  )
}
