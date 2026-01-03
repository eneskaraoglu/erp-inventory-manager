import { Link } from 'react-router-dom'

interface CustomerCardProps {
    id: number
    name: string
    code: string
    adress: string
    number: string
    vkno: number
    onDelete: (id: number) => void
}

function CustomerCard({ id, name, code, adress, number, vkno, onDelete }: CustomerCardProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                {name}-{code}
            </h3>
            <p className="text-gray-600 mt-2">Adress: {adress}</p>
            <p className="text-gray-600 mt-2">Number: {number}</p>
            <p className="text-gray-600 mt-2">VK No: {vkno}</p>
            <button
                onClick={() => onDelete(id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            > Delete
            </button>
        </div>
    )
}

export default CustomerCard