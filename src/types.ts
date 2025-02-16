import { SxProps } from '@mui/material'

export interface DataTableColumn {
  title: string
  dataIndex: string
  render?: (value: any) => string
}

export interface DataTableProps {
  data: any[]
  columns: DataTableColumn[]
  rowsPerPageOptions?: number[]
  sx?: {
    container?: SxProps
    search?: SxProps
    table?: SxProps
    header?: SxProps
    body?: SxProps
    row?: SxProps
    cell?: SxProps
    pagination?: SxProps
  }
}
