import React, { useCallback, useMemo, useState } from "react";
import { visuallyHidden } from '@mui/utils';
import { useNavigate } from 'react-router-dom';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Paper, Toolbar, CircularProgress, Typography, TableFooter } from '@mui/material';
import { useAuth } from '../contexts/Auth.context';
import BestellingFilterDialog from './BestellingFilterDialog';
import useSWR from 'swr';
import { getAll } from '../api';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import IconButton from '@mui/material/IconButton';

const requestFields = ["DATUMGEPLAATST", "BEDRIJF_NAAM", "ORDERID", "ORDERSTATUS", "BETALINGSTATUS"];

const headCells = [
  {
    id: requestFields[0],
    numeric: false,
    disablePadding: true,
    label: 'Datum',
  },
  {
    id: requestFields[1],
    numeric: false,
    disablePadding: false,
    label: 'Naam',
  },
  {
    id: requestFields[2],
    numeric: true,
    disablePadding: false,
    label: 'Order id',
  },
  {
    id: requestFields[3],
    numeric: false,
    disablePadding: false,
    label: 'Orderstatus',
  },
  {
    id: requestFields[4],
    numeric: false,
    disablePadding: false,
    label: 'Betalingstatus',
  },
];

function BestellingenTable() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderField, setOrderField] = useState('DATUMGEPLAATST');
  const [filterValues, setFilterValues] = useState('');
  const [filterFields, setFilterFields] = useState('');

  const [dialogOpen, setDialogOpen] = useState('');

  const queryParams = useMemo(() => {
    const filter = filterValues && filterFields ? `filterValues=${filterValues}&filterFields=${filterFields}` : '';
    const orderParam = order ? `order=${order}` : '';
    const orderFieldParam = orderField ? `orderField=${orderField}` : '';

    const offsetParam = `offset=${(page) * rowsPerPage}`;
    const limitParam = `limit=${rowsPerPage}`;

    const params = [limitParam, offsetParam, orderParam, orderFieldParam, filter]
      .filter(str => str !== '').join('&');

    return params;
  }, [filterValues, filterFields, order, orderField, page, rowsPerPage]);

  const {
    data: bestellingen = { items: [] },
    isLoading,
    error,
  } = useSWR(`bestellingen?${queryParams}`, getAll, { revalidateOnMount: true });

  const handleFilterSubmit = (submittedValues) => {
    const values = submittedValues
      .filter(str => str !== '')
      .join(',');

    if (values.length == 0) {
      resetFilter();
      return;
    }

    const fields = submittedValues
      .map((value, index) => value.trim() !== '' ? requestFields[index] : null)
      .filter(field => field !== null)
      .join(',');

    setPage(0);
    setFilterValues(values);
    setFilterFields(fields);
  };

  const resetFilter = () => {
    setPage(0);
    setFilterValues('');
    setFilterFields('');
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderField === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderField(property);
  };

  const handleClick = (event, id, bestelling) => {
    navigate(`/profiel/bestellingen/${bestelling.ORDERID}`, { state: { id } });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterClick = () => {
    if (filterValues == '') {
      setDialogOpen(true);
    } else {
      resetFilter();
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const emptyRows = useMemo(() => {
    return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bestellingen.length) : 0;
  }, [page, bestellingen, rowsPerPage]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error.message}</Typography>;
  }

  return (
    <>
      <BestellingFilterDialog  dialogOpen={dialogOpen} handleDialogClose={handleDialogClose} handleSubmit={handleFilterSubmit} />
      <div className="h-fit w-auto">
        <Box className="rounded-md w-full h-full">
          <Paper className='rounded-md w-full h-full'>
            <Toolbar className="flex justify-between justify-items-end-end ">
              <h2 className="text-red-600 font-extrabold text-2xl">Bestellingen</h2>
              <IconButton
                onClick={handleFilterClick}
              >
                {filterValues == '' ? <FilterListIcon /> : <FilterListOffIcon />}
              </IconButton>
            </Toolbar>
            <TableContainer>
              <Table className='min-w-96 rounded-md'
                aria-labelledby="tableTitle"
                size={'medium'}
              >
                <BestellingenTableHead
                  order={order}
                  orderField={orderField}
                  onRequestSort={handleRequestSort}
                  rowCount={bestellingen.length}
                />
                <TableBody>
                  {bestellingen.items.map((bestelling, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    const { DATUMGEPLAATST, ORDERID, ORDERSTATUS, BETALINGSTATUS, klant, leverancier } = bestelling;
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, ORDERID, bestelling)}
                        tabIndex={-1}
                        key={ORDERID}
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
                        <TableCell align="center">{formatName(klant, leverancier)}</TableCell>
                        <TableCell align="center">{ORDERID}</TableCell>
                        <TableCell align="center">{formatOrderstatus(ORDERSTATUS)}</TableCell>
                        <TableCell align="center">{formatBetalingstatus(BETALINGSTATUS)}</TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      count={bestellingen.total}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </div>
    </>
  );
}

function BestellingenTableHead(props) {
  const { order, orderField, rowCount, onRequestSort } =
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
            sortDirection={orderField === headCell.id ? order : false}
            sx={{ fontWeight: 'bold' }}
          >
            <TableSortLabel
              active={orderField === headCell.id}
              direction={orderField === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderField === headCell.id ? (
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

function formatName(klant, leverancier) {
  const { gebruikerRol } = useAuth();

  if (gebruikerRol === 'LEVERANCIER') {
    return klant.KLANT_BEDRIJF_NAAM;
  }
  return leverancier.LEVERANCIER_BEDRIJF_NAAM;
}

function formatOrderstatus(ORDERSTATUS) {
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

function formatBetalingstatus(BETALINGSTATUS) {
  switch (BETALINGSTATUS) {
    case 'ONVERWERKT':
      return <div className="col-span-3 font-black text-yellow-300">Onverwerkt</div>
    case 'FACTUUR_VERZONDEN':
      return <div className="col-span-3 font-black text-indigo-400">Factuur verzonden</div>
    case 'BETAALD':
      return <div className="col-span-3 font-black text-green-400">Betaald</div>
  }
}

export default BestellingenTable;