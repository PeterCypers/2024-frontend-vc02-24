import React from "react";

import "./DelawareBotOptions.css";

//TODO: handlers aanvullen / verwijderen -> zie ActionProvider.js
const DelawareBotOptions = (props) => {
  const options = [
    // {
    //   text: "Javascript",
    //   handler: props.actionProvider.handleJavascriptList,
    //   id: 1,
    // },
    {
      text: "Products",
      handler: props.actionProvider.handleProductsList,
      id: 1,
    },
    { 
      text: "Orders",
      handler: props.actionProvider.handleOrderList,
      id: 2 
    },
    { text: "Reminders",
      handler: props.actionProvider.handleRemindersList,
      id: 3 
    },
    // { text: "Security", handler: () => {}, id: 4 },
    // { text: "Interview prep", handler: () => {}, id: 5 },
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