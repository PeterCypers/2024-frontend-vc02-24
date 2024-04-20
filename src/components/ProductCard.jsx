import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { TextField } from '@mui/material';
import { Tooltip } from '@mui/material';

// props zijn vermoedelijk de Database fields van product -> vb op mui.com geeft geen props mee
//TODO add to cart heeft nog een on-click event nodig
export default function ProductCard({ product }) {
const { IMAGEADRES, NAAM, EENHEIDSPRIJS,STOCK} = product; 
  return (
    <Card sx={{ maxWidth: 345 }}>
    {/* <Tooltip title={NAAM?NAAM:"product name"} placement="bottom"> has placeholder */}
      <CardMedia
        sx={{ height: 140 }}
        image={IMAGEADRES?IMAGEADRES:"https://picsum.photos/345/140"} //has placeholder
        // title={NAAM?NAAM:"product name"}
      />
      {/* </Tooltip> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {NAAM?NAAM:"Lizard"}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
      </CardContent>
      <CardActions>
        {/* <Button size="small">Share</Button>
        <Button size="small">Learn More</Button> */}
        <TextField 
          style = {{width: 80, minWidth: 60}}
          color='error'
          label="aantal"
          id="number"
          type="number"
          defaultValue={1}
          InputProps={{ inputProps: { min: 1, max: STOCK?STOCK:10 } }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div style={{display: 'flex', marginLeft: 'auto', alignItems: 'center'}} >
        <Typography sx={{mr: '0.8rem' }} variant="body2" color="text.secondary">{EENHEIDSPRIJS?EENHEIDSPRIJS.toString():"€0.00"}</Typography>
        <Tooltip title="Add to cart" placement="bottom">
        <AddShoppingCartIcon color='error' fontSize='large'></AddShoppingCartIcon>
        </Tooltip>
        </div>
      </CardActions>
    </Card>
  );
}