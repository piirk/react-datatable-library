import React from 'react'

type DataTableProps = {
  data: any[]
  columns: { title: string; dataIndex: string }[]
}

const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.dataIndex}>{col.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col) => (
              <td key={col.dataIndex}>{row[col.dataIndex]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DataTable
