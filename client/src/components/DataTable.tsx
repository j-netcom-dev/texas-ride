'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {Button} from "@/components/ui/button";

const DataTable = ({trips, actions =[]}: {actions?: {label: string, action?: any, condition?: string[], theme?: string}[], trips: {_id?: string, customer?: string, from?: string, to?: string, time?: string, status?: string}[] }) => {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
            <TableHead>Time</TableHead>
          <TableHead>Status</TableHead>
            {actions.length? <TableHead className="text-right">Action</TableHead>: null}
        </TableRow>
      </TableHeader>
      <TableBody>
        {trips.map(trip => (
          <TableRow key={trip?._id}>
            <TableCell className="font-medium">{trip?.customer}</TableCell>
            <TableCell>{trip?.from}</TableCell>
            <TableCell>{trip?.to}</TableCell>
              <TableCell>{trip?.time}</TableCell>
            <TableCell>{trip?.status || 'Pending'}</TableCell>
              <TableCell>
                  {actions.length? (<div className={'flex items-center justify-end gap-2 py-4'}>
                      {actions.map(({action, label, theme, condition}) =><Button key={label} onClick={() =>action(trip?._id)} className={theme} disabled={!((condition || []).indexOf(`${trip?.status || ''}`.toLowerCase())>-1)}>{label}</Button>)}
                  </div>) :null}
              </TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default DataTable
