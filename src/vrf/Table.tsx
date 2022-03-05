import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Priceconsumer } from './types';

function createData(
  roundID: number,
  price: number,
  startedAt: number,
  timeStamp: number,
  answeredInRound: number,
) {
  return { roundID, price, startedAt, timeStamp, answeredInRound };
}

interface BasicTableProps {
  prices: Priceconsumer[];
}

export default function BasicTable(props: BasicTableProps) {
  const { prices } = props;

  if (!prices || prices.length === 0) {
    return <div>No data</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>RoundID</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">StartedAt</TableCell>
            <TableCell align="right">Timestamp</TableCell>
            <TableCell align="right">AnsweredInRound</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prices.map((row: Priceconsumer, index: number) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.roundID}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.startedAt}</TableCell>
              <TableCell align="right">{row.timeStamp}</TableCell>
              <TableCell align="right">{row.answeredInRound}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
