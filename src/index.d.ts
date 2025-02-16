declare module 'react-datatable-library' {
  export interface DataTableColumn {
    title: string
    dataIndex: string
    render?: (value: any) => string
  }

  export interface DataTableProps {
    data: any[]
    columns: DataTableColumn[]
    useMUI?: boolean
  }

  export const DataTable: React.FC<DataTableProps>
}
