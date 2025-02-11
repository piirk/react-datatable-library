import React from 'react'

interface Column {
  title: string
  dataIndex: string
  render?: (value: any) => string
}

interface DataTableProps {
  data: any[]
  columns: Column[]
}

export const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.dataIndex}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((record, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => {
              const value = record[column.dataIndex]
              return <td key={column.dataIndex}>{column.render ? column.render(value) : value}</td>
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DataTable
