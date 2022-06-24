import { useRef, useState } from 'react'
import useModel from '../hooks/useModel'
import api from '../utils/api'
import ButtonBoolean from './ButtonBoolean'

export default function StoreForm ({ refresh = () => {} }) {
  const [storeModel, setStoreModel] = useModel('')
  const [cityModel, setCityModel] = useModel('')
  const [stateModel, setStateModel] = useModel('')
  const [cup, setCup] = useState(0)
  const [straw, setStraw] = useState(0)
  const [lid, setLid] = useState(0)
  const [bag, setBag] = useState(0)
  const storeRef = useRef(null)
  const cityRef = useRef(null)
  const stateRef = useRef(null)

  const createStore = async () => {
    // Validate
    const validationRules = [
      { ref: storeRef, value: storeModel.value },
      { ref: cityRef, value: cityModel.value },
      { ref: stateRef, value: stateModel.value }
    ]

    let error = false

    for (const r of validationRules) {
      if (!r.value) {
        r.ref.current.classList.add('errorInput')
        error = true
      } else {
        r.ref.current.classList.remove('errorInput')
      }
    }

    if (!error) {
      await api.post('/api/stores', {
        name: storeModel.value,
        city: cityModel.value,
        state: stateModel.value,
        cup,
        straw,
        lid,
        bag
      })

      refresh()
      setStoreModel('')
      setCityModel('')
      setStateModel('')
      setCup(0)
      setStraw(0)
      setLid(0)
      setBag(0)
    }
  }

  return (
    <div className='text-center'>
      <h2>Create Store</h2>
      <div className='my-2'>
        <input className='border border-gray-200 rounded-sm p-1' {...storeModel} ref={storeRef} onClick={(e) => e.target.classList.remove('errorInput')} placeholder='Store Name'/>
      </div>
      <div className='my-2'>
        <input className='border border-gray-200 rounded-sm p-1' {...cityModel} ref={cityRef} onClick={(e) => e.target.classList.remove('errorInput')} placeholder='City'/>
      </div>
      <div className='my-2'>
        <input className='border border-gray-200 rounded-sm p-1' {...stateModel} ref={stateRef} onClick={(e) => e.target.classList.remove('errorInput')} placeholder='State'/>
      </div>
      <div className='text-center my-4'>
        <ButtonBoolean name="Cup" value={cup} setValue={(value) => setCup(value)} />
        <ButtonBoolean name="Straw" value={straw} setValue={(value) => setStraw(value)} />
        <ButtonBoolean name="Lid" value={lid} setValue={(value) => setLid(value)} />
        <ButtonBoolean name="Bag" value={bag} setValue={(value) => setBag(value)} />
      </div>

      <button className='bg-blue-300 border border-blue-500 rounded-lg text-blue-900 p-2' onClick={createStore}>Create</button>
    </div>
  )
}
