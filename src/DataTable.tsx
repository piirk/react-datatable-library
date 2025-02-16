import React, { useState } from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TextField,
  TableSortLabel,
  TableContainer,
} from '@mui/material'

interface Column {
  title: string
  dataIndex: string
  render?: (value: any) => string
}

interface DataTableProps {
  data: any[]
  columns: Column[]
  rowsPerPageOptions?: number[]
}

export const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  rowsPerPageOptions = [10, 25, 50, 100],
}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortedColumn, setSortedColumn] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null)

  const handleSort = (column: Column) => {
    setPage(0)
    const isAsc = sortedColumn === column.dataIndex && sortOrder === 'asc'
    setSortedColumn(column.dataIndex)
    setSortOrder(isAsc ? 'desc' : 'asc')
  }

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

  const filteredData = data.filter((row) => {
    return columns.some((col) => {
      const value = row[col.dataIndex]
      const renderedValue = col.render ? col.render(value) : value
      return renderedValue.toString().toLowerCase().includes(searchTerm.toLowerCase())
    })
  })

  const sortedData = sortedColumn
    ? [...filteredData].sort((a, b) => {
        const aValue = a[sortedColumn]
        const bValue = b[sortedColumn]

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
    : filteredData

  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <TableContainer>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />

      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.dataIndex} style={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={sortedColumn === col.dataIndex}
                  direction={sortOrder || 'asc'}
                  onClick={() => handleSort(col)}
                >
                  {col.title}
                </TableSortLabel>
              </TableCell>
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
    </TableContainer>
  )
}

export default DataTable
