import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function ProductCard({ product }) {
const { IMAGEURL, NAAM, EENHEIDSPRIJS,STOCK} = product; 
return (
  <Card className="flex flex-col w-80 m-5">
  <CardMedia
    sx={{ height: 320, width: 320 }} 
    image={IMAGEURL|| "https://static.delhaize.be/medias/sys_master/h5e/hfb/12097500119070.jpg?buildNumber=82174e95e8034dc2242aadaed51c35b2e76a4bb2908eb0fb223ce572e154b418&imwidth=320"} 
  />
  <CardContent>
    <Typography gutterBottom component="div">
      {NAAM || "Product Name"}
    </Typography>
  </CardContent>
  <CardActions className="mt-auto justify-between">
    <Typography variant="body2" className='flex-grow'>
      Stock: {STOCK || 'N/A'}
    </Typography>
    <Box className="flex justify-items-center">
      <Typography variant="body2" className='mr-1'>
        €{EENHEIDSPRIJS?.toFixed(2) || "0.00"}
      </Typography>
    </Box>
  </CardActions>
</Card>
);
}