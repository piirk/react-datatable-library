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
  Box,
} from '@mui/material'
import { DataTableProps, DataTableColumn } from './types'
import { StyledTableCell } from './styles'

export const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  rowsPerPageOptions = [10, 25, 50, 100],
  sx,
}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortedColumn, setSortedColumn] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null)

  const handleSort = (column: DataTableColumn) => {
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
    <TableContainer sx={sx?.container}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={sx?.search}
      />

      <Box sx={{ overflow: 'auto' }}>
        <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
          <Table sx={sx?.table}>
            <TableHead sx={sx?.header}>
              <TableRow>
                {columns.map((col) => (
                  <StyledTableCell key={col.dataIndex} sx={sx?.cell}>
                    <TableSortLabel
                      active={sortedColumn === col.dataIndex}
                      direction={sortOrder || 'asc'}
                      onClick={() => handleSort(col)}
                    >
                      {col.title}
                    </TableSortLabel>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={sx?.body}>
              {paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex} sx={sx?.row}>
                  {columns.map((col) => (
                    <TableCell key={col.dataIndex} sx={sx?.cell}>
                      {col.render ? col.render(row[col.dataIndex]) : row[col.dataIndex]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={sx?.pagination}
      />
    </TableContainer>
  )
}

export default DataTable
