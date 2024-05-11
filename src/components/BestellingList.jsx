import * as React from 'react';
import { visuallyHidden } from '@mui/utils';
import { useNavigate } from 'react-router-dom';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Paper, Toolbar } from '@mui/material';
import { useAuth } from '../contexts/Auth.context';
import BestellingFilterDialog from './BestellingFilterDialog';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparatorKlant(order, orderBy) {
  const { gebruikerRol } = useAuth();
  return (a, b) => {
    if (gebruikerRol === "LEVERANCIER") {
      if (orderBy === 'KLANT_BEDRIJF_NAAM') {
        if (!a.klant || !b.klant) {
          return 0;
        }
        if (a.klant.KLANT_BEDRIJF_NAAM < b.klant.KLANT_BEDRIJF_NAAM) {
          return order === 'asc' ? -1 : 1;
        }
        if (a.klant.KLANT_BEDRIJF_NAAM > b.klant.KLANT_BEDRIJF_NAAM) {
          return order === 'asc' ? 1 : -1;
        }
        return 0;
      }
    }
    if (gebruikerRol === "KLANT") {
      if (orderBy === 'KLANT_BEDRIJF_NAAM') {
        if (!a.leverancier || !b.leverancier) {
          return 0;
        }
        if (a.leverancier.LEVERANCIER_BEDRIJF_NAAM < b.leverancier.LEVERANCIER_BEDRIJF_NAAM) {
          return order === 'asc' ? -1 : 1;
        }
        if (a.leverancier.LEVERANCIER_BEDRIJF_NAAM > b.leverancier.LEVERANCIER_BEDRIJF_NAAM) {
          return order === 'asc' ? 1 : -1;
        }
        return 0;
      }
    }
  };
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'DATUMGEPLAATST',
    numeric: false,
    disablePadding: true,
    label: 'Datum',
  },
  {
    id: 'KLANT_BEDRIJF_NAAM',
    numeric: false,
    disablePadding: false,
    label: 'Naam',
  },
  {
    id: 'ORDERID',
    numeric: true,
    disablePadding: false,
    label: 'Order id',
  },
  {
    id: 'ORDERSTATUS',
    numeric: false,
    disablePadding: false,
    label: 'Orderstatus',
  },
  {
    id: 'BETALINGSTATUS',
    numeric: false,
    disablePadding: false,
    label: 'Betalingstatus',
  },
];


function EnhancedTableHead(props) {
  const { order, orderBy, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: 'bold' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

function name(klant, leverancier) {
  const { gebruikerRol } = useAuth();

  if (gebruikerRol === 'LEVERANCIER') {
    return klant.KLANT_BEDRIJF_NAAM;
  }
  return leverancier.LEVERANCIER_BEDRIJF_NAAM;
}

function orderstatus(ORDERSTATUS) {
  switch (ORDERSTATUS) {
    case 'GEPLAATST':
      return <div className="col-span-3 font-black text-orange-300">Geplaatst</div>
    case 'VERWERKT':
      return <div className="col-span-3 font-black text-blue-300">Verwerkt</div>
    case 'VERZONDEN':
      return <div className="col-span-3 font-black text-purple-400">Verzonden</div>
    case 'UIT_VOOR_LEVERING':
      return <div className="col-span-3 font-black text-rose-300">Uit voor levering</div>
    case 'GELEVERD':
      return <div className="col-span-3 font-black text-red-400">Geleverd</div>
    case 'VOLTOOID':
      return <div className="col-span-3 font-black text-green-300">Voltooid</div>
  }
}

function betalingstatus(BETALINGSTATUS) {
  switch (BETALINGSTATUS) {
    case 'ONVERWERKT':
      return <div className="col-span-3 font-black text-yellow-300">Onverwerkt</div>
    case 'FACTUUR_VERZONDEN':
      return <div className="col-span-3 font-black text-indigo-400">Factuur verzonden</div>
    case 'BETAALD':
      return <div className="col-span-3 font-black text-green-400">Betaald</div>
  }
}

function EnhancedTable({ bestellingen }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('date');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleFilterSubmit = (data) => {
    console.log('Filter data:', data);
  };

  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, id, bestelling) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
    navigate(`/profiel/bestellingen/${bestelling.ORDERID}`, { state: { id } });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bestellingen.length) : 0;

  const visibleRows = React.useMemo(() => {
    if (orderBy === 'KLANT_BEDRIJF_NAAM') {
      return stableSort(bestellingen, getComparatorKlant(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      );
    }
    return stableSort(bestellingen, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
  }, [bestellingen, order, orderBy, page, rowsPerPage]);


  return (
    <Box className="rounded-md w-full h-full">
      <Paper className='rounded-md w-full h-fit'>
        <Toolbar>
          <BestellingFilterDialog handleSubmit={handleFilterSubmit} />
        </Toolbar>
        <TableContainer>
          <Table className='min-w-96 rounded-md'
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={bestellingen.length}
            />
            <TableBody>
              {visibleRows.map((bestelling, index) => {
                const isItemSelected = isSelected(bestelling.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                const { DATUMGEPLAATST, ORDERID, ORDERSTATUS, BETALINGSTATUS, klant, leverancier } = bestelling;
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, ORDERID, bestelling)}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={ORDERID}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align='center'
                    >
                      {formatDateTime(DATUMGEPLAATST)}
                    </TableCell>
                    <TableCell align="center">{name(klant, leverancier)}</TableCell>
                    <TableCell align="center">{ORDERID}</TableCell>
                    <TableCell align="center">{orderstatus(ORDERSTATUS)}</TableCell>
                    <TableCell align="center">{betalingstatus(BETALINGSTATUS)}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (33) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={bestellingen.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}


export default EnhancedTable;