import React, { useState } from 'react';
import { Box, Button, MenuItem, Select } from '@mui/material';
import { updateOrderById, getById } from '../api';

const BetaalHerinnering = ({ orderIds }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  let orderids = orderIds.filter((value, index, self) => {
    return self.indexOf(value) === index
  })

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setFeedbackMessage('');
  };

  const handleButtonClick = async () => {
    try {
      // controle op BETALINGSTATUS
      const selectedOrder = await getById(`bestellingen/${selectedValue}`);

      if (selectedOrder.BETALINGSTATUS === 'BETAALD') {
        // Als order al betaald is, niet updaten:
        setFeedbackMessage('Deze order is al betaald.');
        return;
      }

      // Anders mag ze geupdate worden op vandaag
      await updateOrderById(selectedValue, { HERINNERINGSDATUM: new Date().toISOString().split('T')[0] });

      // Reset selectedValue after sending the request
      setSelectedValue('');

      // Display a success message
      setFeedbackMessage('Order succesvol bijgewerkt.');
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <Box className="w-full h-fit mt-5">
      <h2 className="mb-4">BetalingsHerinnering</h2>
      <div className="grid grid-cols-2 gap-x-10 ml-3 w-fit" >
        <Select
          value={selectedValue}
          onChange={handleChange}
          variant="standard"
          style={{ minWidth: "8rem" }}
          displayEmpty
        >
          <MenuItem disabled value="">
            Order Id
          </MenuItem>
          {orderids.map(orderId => (
            <MenuItem key={orderId} value={orderId}>{orderId}</MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          Verzenden
        </Button>
        {feedbackMessage && (
          <Box className="mt-3 col-span-2">
            <p className="text-red-600">{feedbackMessage}</p>
          </Box>
        )}  
      </div>

    </Box>

  );
};

export default BetaalHerinnering;