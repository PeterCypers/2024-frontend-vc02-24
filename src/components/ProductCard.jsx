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
  <Card className="flex flex-col w-96 m-5">
    <CardMedia
      sx={{ 
        height: 384,
        width: 384,
      }} 
      image={IMAGEADRES || "https://static.delhaize.be/medias/sys_master/h5e/hfb/12097500119070.jpg?buildNumber=82174e95e8034dc2242aadaed51c35b2e76a4bb2908eb0fb223ce572e154b418&imwidth=320"} 
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {NAAM || "Product Name"}
      </Typography>
    </CardContent>
    <CardActions className="mt-auto justify-between">
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
);
}