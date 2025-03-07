# react-datatable-library ![npm version](https://img.shields.io/npm/v/react-datatable-library)

A lightweight and efficient **React DataTable** component built with **Material UI (MUI)** and **TypeScript**. It provides built-in pagination, sorting, and filtering, fully leveraging Material UI's design system.

## Installation

```sh
npm install react-datatable-library
```

or

```sh
yarn add react-datatable-library
```

## Prerequisites

Make sure you have the following prerequisites installed:

- **Node.js**: >= 14.0.0
- **Yarn**: >= 1.22.0

## Peer Dependencies

Make sure you have the following dependencies installed in your project:

```json
{
  "peerDependencies": {
    "@mui/material": "^5.0.0",
    "@emotion/react": "^11.0.0",
    "@emotion/styled": "^11.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

## Usage

### Basic Example

```tsx
import React from 'react'
import { DataTable } from 'react-datatable-library'

const data = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
]

const columns = [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
]

const App = () => {
  return <DataTable data={data} columns={columns} />
}

export default App
```

## Props

| Prop                 | Type                | Default             | Description                              |
| -------------------- | ------------------- | ------------------- | ---------------------------------------- |
| `data`               | `any[]`             | `[]`                | The data to be displayed in the table.   |
| `columns`            | `DataTableColumn[]` | `[]`                | Defines the columns of the table.        |
| `rowsPerPageOptions` | `number[]`          | `[10, 25, 50, 100]` | Options for the number of rows per page. |
| `sx`                 | `SxProps`           | `{}`                | Custom styling using MUI's `sx` prop.    |

### `DataTableColumn` Type

```ts
interface DataTableColumn {
  title: string
  dataIndex: string
  render?: (value: any) => string
}
```

### Column Configuration (`columns`)

Each table column is defined by an object with the following properties:

- **`title`** _(string, required)_: The displayed name of the column.
- **`dataIndex`** _(string, required)_: The key corresponding to the data field in the `data` array.
- **`render`** _(function, optional)_: Allows modifying the displayed value (e.g., formatting a date, converting a state code to a label).

#### Examples

- **Format a date**:
  ```tsx
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    render: (date: string) => new Date(date).toLocaleDateString(),
  }
  ```
- **Convert a state code to a label**:

  ```tsx
  const states = { CA: 'California', NY: 'New York' };

  {
    title: 'State',
    dataIndex: 'state',
    render: (stateCode: string) => states[stateCode] || stateCode,
  }
  ```

## Features

- ✅ **Pagination** – Easily navigate through large datasets.
- ✅ **Sorting** – Click on column headers to sort data.
- ✅ **Search filtering** – Built-in text search for quick filtering.
- ✅ **Custom column rendering** – Customize cell content using the `render` function.
- ✅ **MUI `sx` styling support** – Apply custom styles using the Material UI `sx` prop.

## Custom Styling

The component supports MUI's `sx` prop for custom styling:

```tsx
<DataTable
  data={employees}
  columns={columns}
  sx={{
    container: {
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      mt: '20px',
    },
    search: { marginBottom: '20px' },
    table: { border: '1px solid black' },
    header: { backgroundColor: 'lightblue' },
    body: { backgroundColor: 'lightgrey' },
    row: { '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } },
    cell: { padding: '10px' },
    pagination: { marginTop: '20px' },
  }}
/>
```

## Contribution

Contributions are welcome! Feel free to open issues or pull requests in the [GitHub repository](https://github.com/piirk/react-datatable-library).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
