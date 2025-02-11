import React from 'react'

interface Column {
  key: string
  header: string
}

interface DataTableProps {
  data: Record<string, any>[]
  columns: Column[]
}

const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col) => (
              <td key={col.key}>{row[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DataTable
