import * as React from 'react';
import { useAuth } from '../contexts/Auth.context';
import Box from '@mui/material/Box';
import { Grid, Item } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


export default function Row({bestelling}) {
  const { gebruikerRol } = useAuth();
  const { b } = bestelling;
  const [open, setOpen] = React.useState(false);

  if(gebruikerRol === "LEVERANCIER") {
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" align="center">
            {b.DATUMGEPLAATST}
          </TableCell>
          <TableCell align="center">{b.KLANT_GEBRUIKERID}</TableCell>  {/* KLANT_GEBRUIKERID -> naar bedrijf naam geraken */}
          <TableCell align="center">{b.ORDERID}</TableCell>
          <TableCell align="center">{b.ORDERSTATUS}</TableCell>
          <TableCell align="center">{b.BETALINGSTATUS}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Gegevens
                  <Grid container spacing={4}>
                    <Grid>
                        <Item>Contactgegevens:</Item>
                    </Grid>
                    <Grid>
                        <Item>{b.KLANT_GEBRUIKERID}</Item> {/*bedrijf contactgegevens */}
                    </Grid>
                    <Grid>
                      <Item>Totale bedrag:</Item>
                    </Grid>
                    <Grid>
                      <Item>{}</Item> {/*Totale prijs van alle producten */}
                    </Grid>
                    <Grid>
                      <Item>Leveradres:</Item>
                    </Grid>
                    <Grid>
                      <Item>{b.KLANT_GEBRUIKERID}</Item> {/* bedrijf adres */}
                    </Grid>
                    <Grid></Grid>
                    <Grid></Grid>
                    <Grid>
                      <Item>Betalingsherinnering:</Item>
                    </Grid>
                    <Grid>
                      <Item>{b.HERINNERINGSDATUM}</Item>
                    </Grid>
                  </Grid>
                  Product
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Naam</TableCell>
                      <TableCell align="center">Aantal</TableCell>
                      <TableCell align="center">In stock</TableCell>
                      <TableCell align="center">Eeheidsprijs</TableCell>
                      <TableCell align="center">Totale prijs</TableCell>
                    </TableRow>
                  </TableHead>
                  {/* <TableBody>
                    {b.PRODUCT.map((PRODUCTROW) => (
                      <TableRow key={PRODUCTROW.NAAM}>
                        <TableCell component="th" scope="row" align="right">
                          {PRODUCTROW.NAAM}
                        </TableCell>
                        <TableCell align="center">{PRODUCTROW.AANTAL}</TableCell>
                        <TableCell align="center">{PRODUCTROW.STOCK}</TableCell>
                        <TableCell align="center">{PRODUCTROW.EENHEIDSPRIJS}</TableCell>
                        <TableCell align="center">{PRODUCTROW.TOTALEPRIJS}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody> */}
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  if(gebruikerRol === "KLANT"){
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" align="center">
            {b.DATUMGEPLAATST}
          </TableCell>
          <TableCell align="center">{b.KLANT_GEBRUIKERID}</TableCell>  {/* KLANT_GEBRUIKERID -> naar bedrijf naam geraken */}
          <TableCell align="center">{b.ORDERID}</TableCell>
          <TableCell align="center">{b.ORDERSTATUS}</TableCell>
          <TableCell align="center">{b.BETALINGSTATUS}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Gegevens
                  <Grid container spacing={4}>
                    <Grid>
                        <Item>Betaalgegevens:</Item>
                    </Grid>
                    <Grid></Grid>
                    <Grid>
                      <Item>Totale bedrag:</Item>
                    </Grid>
                    <Grid>
                      <Item>{}</Item> {/*Totale prijs van alle producten */}
                    </Grid>
                    <Grid>
                      <Item align="right">Rekeningnummer:</Item>
                    </Grid>
                    <Grid>
                      <Item>{b.REKENINGNUMMER}</Item>
                    </Grid>
                    <Grid></Grid>
                    <Grid></Grid>
                    <Grid>
                      <Item align="right">BTW-nummer:</Item>
                    </Grid>
                    <Grid>
                      <Item>{b.BTWNR}</Item>
                    </Grid>
                    <Grid></Grid>
                    <Grid></Grid>
                    <Grid>
                      <Item>Leveradres:</Item>
                    </Grid>
                    <Grid>
                      <Item>{b.KLANT_GEBRUIKERID}</Item> {/* bedrijf adres */}
                    </Grid>
                  </Grid>
                  Product
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Naam</TableCell>
                      <TableCell align="center">Aantal</TableCell>
                      <TableCell align="center">In stock</TableCell>
                      <TableCell align="center">Eeheidsprijs</TableCell>
                      <TableCell align="center">Totale prijs</TableCell>
                    </TableRow>
                  </TableHead>
                  {/* <TableBody>
                    {b.PRODUCT.map((PRODUCTROW) => (
                      <TableRow key={PRODUCTROW.NAAM}>
                        <TableCell component="th" scope="row" align="right">
                          {PRODUCTROW.NAAM}
                        </TableCell>
                        <TableCell align="center">{PRODUCTROW.AANTAL}</TableCell>
                        <TableCell align="center">{PRODUCTROW.STOCK}</TableCell>
                        <TableCell align="center">{PRODUCTROW.EENHEIDSPRIJS}</TableCell>
                        <TableCell align="center">{PRODUCTROW.TOTALEPRIJS}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody> */}
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
}