import React, { useState } from 'react';
// prop types
import PropTypes from 'prop-types';
// lodash
import { filter } from 'lodash';
// material
import {
  Box,
  Table,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TablePagination
} from '@material-ui/core';
// custom components
import TableHeadX from './TableHeadX';

// functions ------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------

const TableX = ({ dataSource = [], cellSchema = [] }) => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataSource.map((n, index) => index);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataSource.length) : 0;

  const filteredProducts = applySortFilter(
    dataSource,
    getComparator(order, orderBy)
  );

  const isProductNotFound = filteredProducts.length === 0;

  return (
    <>
      <Table>
        <TableHeadX
          order={order}
          orderBy={orderBy}
          headLabel={cellSchema}
          rowCount={dataSource.length}
          numSelected={selected.length}
          onRequestSort={handleRequestSort}
          onSelectAllClick={handleSelectAllClick}
        />
        <TableBody>
          {filteredProducts
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, rowIndex) => {
              const isItemSelected = selected.indexOf(rowIndex) !== -1;

              return (
                <TableRow
                  hover
                  key={rowIndex}
                  tabIndex={-1}
                  role="checkbox"
                  selected={isItemSelected}
                  aria-checked={isItemSelected}
                  onClick={(event) => handleClick(event, rowIndex)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isItemSelected} />
                  </TableCell>
                  {cellSchema.map((item, cellIndex) => (
                    <TableCell key={cellIndex} {...item.cellProps}>
                      {item.render
                        ? item.render(row[item.columnName])
                        : row[item.columnName]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        {isProductNotFound && (
          <TableBody>
            <TableRow>
              <TableCell align="center" colSpan={6}>
                <Box sx={{ py: 3 }}>
                  <Typography>No existen datos para mostrar</Typography>
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={dataSource.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

TableX.propTypes = {
  dataSource: PropTypes.array.isRequired,
  cellSchema: PropTypes.array.isRequired
};

export default TableX;
