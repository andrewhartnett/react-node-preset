import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Store () {
  const params = useParams()
  const [store, setStore] = useState(null)

  useEffect(() => {
    axios.get(`/api/stores/${params.id}`).then(res => {
      setStore(res.data.store)
    })
  }, [])

  if (!store) {
    return (<div></div>)
  }

  return (
        <div className='mt-6'>
          <div className='flex justify-between'>
            <div className='px-4'>
              <h2 className='text-4xl antialiased'>{store.name}</h2>
              <p className='text-gray-500'>{store.city}, {store.state}</p>
            </div>
            <div className='text-center text-lg rounded-full bg-red-200 text-red-800 border border-red-800 w-16 pt-4 mx-4'>
              {store.score.value} / {store.score.total}
            </div>
          </div>

            <h3 className='text-xl p-2 mt-6'>Single Use Platics:</h3>
            <div className='flex justify-around'>
                {['cup', 'straw', 'lid', 'bag'].map(v => {
                  return <div className={`${store.voteSummary[v] ? 'bg-red-400 border-red-900 text-gray-900' : 'bg-gray-100'} border border-black p-4 w-1/5 text-center rounded-md`} key={v}>{v}</div>
                })}
            </div>
        </div>
  )
}
