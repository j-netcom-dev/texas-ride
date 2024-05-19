import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const customers = [
  {
    name: "John Doe",
    from: "New York",
    to: "Los Angeles",
    status: "Scheduled",
  },
  {
    name: "Jane Smith",
    from: "Chicago",
    to: "San Francisco",
    status: "In Progress",
  },
  {
    name: "Alice Johnson",
    from: "Miami",
    to: "Seattle",
    status: "Completed",
  },
  {
    name: "Bob Brown",
    from: "Houston",
    to: "Boston",
    status: "Cancelled",
  },
  {
    name: "Charlie Davis",
    from: "Dallas",
    to: "Denver",
    status: "Completed",
  },
]

const DataTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.name}>
            <TableCell className="font-medium">{customer.name}</TableCell>
            <TableCell>{customer.from}</TableCell>
            <TableCell>{customer.to}</TableCell>
            <TableCell className="text-right">{customer.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default DataTable
