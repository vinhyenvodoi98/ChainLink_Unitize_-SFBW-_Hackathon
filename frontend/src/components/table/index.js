import React, { useEffect } from 'react';
import * as contractAction from 'actions/contractAction';
import { useSelector, useDispatch } from 'react-redux';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    height: 520,
  },
  table: {
    minWidth: 650,
  },
}));

export default function SimpleTable() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const contract = useSelector((state) => state.contract);

  useEffect(() => {
    dispatch(contractAction.updateHistory());
  }, [dispatch, contract.ContractReference]);

  return (
    <Paper elevation={4} className={classes.root}>
      <TableContainer>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell align='right'>Amount</TableCell>
              <TableCell align='right'>Time Start</TableCell>
              <TableCell align='right'>Time End</TableCell>
              <TableCell align='right'>Price at that Time</TableCell>
              <TableCell align='right'>Predict</TableCell>
              <TableCell align='right'>Status</TableCell>
              <TableCell align='right'>Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contract.history.map((row, index) => (
              <TableRow key={index}>
                <TableCell component='th' scope='row'>
                  {row.player}
                </TableCell>
                <TableCell align='right'>{row.amount}</TableCell>
                <TableCell align='right'>{row.timeStart}</TableCell>
                <TableCell align='right'>{row.timeEnd}</TableCell>
                <TableCell align='right'>{row.lastPrice}</TableCell>
                <TableCell align='right'>{row.choice}</TableCell>
                <TableCell align='right'>{row.status}</TableCell>
                <TableCell align='right'>{row.isWin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
