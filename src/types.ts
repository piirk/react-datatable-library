export interface DataTableColumn {
  title: string
  dataIndex: string
  render?: (value: any) => string
}

export interface DataTableProps {
  data: any[]
  columns: DataTableColumn[]
  rowsPerPageOptions?: number[]
}
