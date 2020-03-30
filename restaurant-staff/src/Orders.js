import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Fake order data, to replace with data from database
function createData(id, date, name, address, deliveryFee, totalCost) {
  return { id, date, name, address, deliveryFee, totalCost };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Shaun Wong', '81P Jalan Senang', '2.50', 10.50),
  createData(1, '16 Mar, 2019', 'Shaun Wong', '81P Jalan Senang', '2.50', 15.55),
  createData(2, '16 Mar, 2019', 'Shaun Wong', '81P Jalan Senang', '5.00', 13.70),
  createData(3, '16 Mar, 2019', 'Shaun Wong', '81P Jalan Senang', '0.00', 20.30),
  createData(4, '15 Mar, 2019', 'Shaun Wong', '81P Jalan Senang', '5.00', 14.60),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell align="right">Delivery Fee</TableCell>
            <TableCell align="right">Total Sale</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell align="right">{row.deliveryFee}</TableCell>
              <TableCell align="right">{row.totalCost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}