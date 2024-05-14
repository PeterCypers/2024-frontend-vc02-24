import React, { useState } from 'react';
import { Box, Button, MenuItem, Select } from '@mui/material';
import { updateOrderById, getById } from '../api';

const BetaalHerinnering = ({ orderIds }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

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

      // Anders mag ze geupdate worden op vandaag TODO: controlleer of het werkt -> er is momenteel geen onbetaalde order om te controlleren
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
    <Box p={2}>
      <h2 className="text-red-600 font-extrabold text-2xl mb-4">BetalingsHerinnering</h2>
      <Box display="flex" alignItems="center" gap={2}>
        <Select
          value={selectedValue}
          onChange={handleChange}
          variant="outlined"
          style={{ minWidth: "8rem" }}
          displayEmpty
        >
          <MenuItem disabled value="">
            Order Id
          </MenuItem>
          {orderIds.map(orderId => (
            <MenuItem key={orderId} value={orderId}>{orderId}</MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          Verzenden
        </Button>
      </Box>
      {feedbackMessage && (
        <Box mt={2}>
          {feedbackMessage}
        </Box>
      )}
    </Box>

  );
};

export default BetaalHerinnering;