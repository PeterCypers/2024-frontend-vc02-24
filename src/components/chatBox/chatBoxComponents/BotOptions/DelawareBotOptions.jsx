import React from "react";

import "./DelawareBotOptions.css";

const DelawareBotOptions = (props) => {
  const options = [
    {
      text: "Producten",
      handler: props.actionProvider.handleProductsList,
      id: 1,
    },
    { 
      text: "Bestellingen",
      handler: props.actionProvider.handleOrderList,
      id: 2 
    },
    { text: "Notificaties",
      handler: props.actionProvider.handleRemindersList,
      id: 3 
    },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="learning-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default DelawareBotOptions;