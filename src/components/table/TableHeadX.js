import PropTypes from 'prop-types';
// material
import {
  Checkbox,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel
} from '@material-ui/core';

// ----------------------------------------------------------------------

ProductListHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func
};

export default function ProductListHead({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.columnName}
            sortDirection={orderBy === headCell.columnName ? order : false}
            {...headCell.columnProps}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.columnName}
              direction={orderBy === headCell.columnName ? order : 'asc'}
              onClick={createSortHandler(headCell.columnName)}
            >
              {headCell.columnLabel}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
