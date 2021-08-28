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

function applySortFilter(array, comparator, query, searchBy) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query && searchBy) {
    return filter(
      array,
      (_user) =>
        _user[searchBy].toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------

const TableX = ({
  selected,
  initialOrderBy,
  searchBy,
  filterName,
  dataSource = [],
  cellSchema = [],
  onSelected,
  onRowSelected,
  onChangeRowsPerPage
}) => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState(initialOrderBy);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataSource.map((n, index) => index);
      onSelected(newSelecteds);
      return;
    }
    onSelected([]);
  };

  const handleSelected = (event, name) => {
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
    onSelected(newSelected);
  };

  const handleSelectedRow = (event, name, rowData) => {
    handleSelected(event, name);
    onRowSelected(rowData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    return onChangeRowsPerPage && onChangeRowsPerPage(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataSource.length) : 0;

  const filteredItems = applySortFilter(
    dataSource,
    getComparator(order, orderBy),
    filterName,
    searchBy
  );

  const isItemNotFound = filteredItems.length === 0;

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
          {filteredItems
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
                  sx={{ cursor: 'pointer' }}
                  aria-checked={isItemSelected}
                  onClick={(event) => handleSelectedRow(event, rowIndex, row)}
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
        {isItemNotFound && (
          <TableBody>
            <TableRow>
              <TableCell align="center" colSpan={6}>
                <Box sx={{ py: 3 }}>
                  {filterName ? (
                    <Typography>
                      No existen resultados de busqueda para{' '}
                      <strong>{filterName}</strong>
                    </Typography>
                  ) : (
                    <Typography>No existen datos para mostrar</Typography>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
      <TablePagination
        labelRowsPerPage="Ítems por página:"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={500}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

TableX.propTypes = {
  selected: PropTypes.array.isRequired,
  initialOrderBy: PropTypes.string,
  searchBy: PropTypes.string,
  filterName: PropTypes.string,
  dataSource: PropTypes.array.isRequired,
  cellSchema: PropTypes.array.isRequired,
  onSelected: PropTypes.func.isRequired,
  onRowSelected: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func
};

export default TableX;
