import React, { useState } from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TextField,
} from '@mui/material'

interface Column {
  title: string
  dataIndex: string
  render?: (value: any) => string
}

interface DataTableProps {
  data: any[]
  columns: Column[]
  useMUI?: boolean
  rowsPerPageOptions?: number[]
  enableSearch?: boolean
}

export const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  useMUI = false,
  rowsPerPageOptions = [10, 25, 50, 100],
  enableSearch = false,
}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0])
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = data.filter((row) => {
    return columns.some((col) => {
      const value = row[col.dataIndex]
      const renderedValue = col.render ? col.render(value) : value
      return renderedValue.toString().toLowerCase().includes(searchTerm.toLowerCase())
    })
  })

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setPage(0)
  }

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  if (useMUI) {
    return (
      <>
        {enableSearch && (
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginBottom: '20px' }}
          />
        )}
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.dataIndex}>{col.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, rowIndex) => (
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
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </>
    )
  }

  return (
    <>
      {enableSearch && (
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search"
          style={{ marginBottom: '20px' }}
        />
      )}
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.dataIndex}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((record, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => {
                const value = record[column.dataIndex]
                return (
                  <td key={column.dataIndex}>{column.render ? column.render(value) : value}</td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Previous
        </button>
        <span>Page {page + 1}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page * rowsPerPage + rowsPerPage >= data.length}
        >
          Next
        </button>
        <select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option} per page
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default DataTable
