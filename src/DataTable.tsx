import React from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

interface Column {
  title: string
  dataIndex: string
  render?: (value: any) => string
}

interface DataTableProps {
  data: any[]
  columns: Column[]
  useMUI?: boolean
}

export const DataTable: React.FC<DataTableProps> = ({ data, columns, useMUI = false }) => {
  if (useMUI) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.dataIndex}>{col.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((col) => (
                <TableCell key={col.dataIndex}>
                  {col.render ? col.render(row[col.dataIndex]) : row[col.dataIndex]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

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
