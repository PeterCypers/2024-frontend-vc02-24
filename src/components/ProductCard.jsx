import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Grid, TextField,Box } from '@mui/material';
import { Tooltip } from '@mui/material';

// props zijn vermoedelijk de Database fields van product -> vb op mui.com geeft geen props mee
//TODO add to cart heeft nog een on-click event nodig
export default function ProductCard({ product }) {
const { IMAGEADRES, NAAM, EENHEIDSPRIJS,STOCK} = product; 
return (
  <Grid item xs={12} sm={6} md={4} lg={3} sx={{ padding: 7 }}>
    <Card sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', 
      height: 350,
      width: 350,
      borderRadius: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      overflow: 'hidden', 
    }}>
      <CardMedia
        sx={{ height: 200 }} 
        image={IMAGEADRES || "https://picsum.photos/345/140"} 
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {NAAM || "Product Name"}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', alignItems: 'center', padding: '0 16px 16px' }}>
        <TextField 
          size="small"
          type="number"
          defaultValue={1}
          InputProps={{ inputProps: { min: 1, max: STOCK || 10 } }}
          sx={{ width: '5em' }} 
        />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1, fontSize: '1.2rem' }}>
            €{EENHEIDSPRIJS?.toFixed(2) || "0.00"}
          </Typography>
          <Tooltip title="Add to cart" placement="bottom">
            <Button color='error' sx={{ padding: '6px' }}> 
              <AddShoppingCartIcon fontSize='large' />
            </Button>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  </Grid>
);
}