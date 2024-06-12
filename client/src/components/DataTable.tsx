'use client';

import {useState} from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const DataTable = ({trips}: {trips: {customer?: string, from?: string, to?: string, time?: string, status?: string}[] }) => {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trips.map(trip => (
          <TableRow key={trip?.customer}>
            <TableCell className="font-medium">{trip?.customer}</TableCell>
            <TableCell>{trip?.from}</TableCell>
            <TableCell>{trip?.to}</TableCell>
            <TableCell className="text-right">{trip?.status || 'Pending'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default DataTable
