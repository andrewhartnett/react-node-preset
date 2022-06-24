/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useEffect, useState } from 'react'
import StoreForm from '../components/StoreForm'
import StoreTable from '../components/StoreTable'

export default function Home () {
  const [stores, setStores] = useState([])
  const [search, setSearch] = useState('')

  const fetchStores = async () => {
    const res = await axios.get('/api/stores')
    setStores(res.data)
  }

  const filteredStores = stores.filter(v => {
    return v.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  })

  useEffect(() => {
    fetchStores()
  }, [])

  return (
    <main className="w-5/6 mx-auto">
      <input className='w-full border border-gray-200 text-center' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='search'/>
      {search && <StoreTable stores={filteredStores} />}
    </main>
  )
}
