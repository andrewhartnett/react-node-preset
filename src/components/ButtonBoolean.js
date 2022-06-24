
export default function ButtonBoolean ({ name, value, setValue }) {
  return (
    <button className={`border rounded-lg p-4 mx-2 ${value ? 'border-red-400 bg-red-200' : 'border-gray-400 bg-gray-100'}`} onClick={() => { value ? setValue(0) : setValue(1) }}>{name}</button>
  )
}
