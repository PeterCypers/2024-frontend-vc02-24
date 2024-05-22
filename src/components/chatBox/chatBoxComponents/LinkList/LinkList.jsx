import React from "react";

import "./LinkList.css";

//link-list omgebouwd naar paragraph list
const LinkList = (props) => {
  const linkMarkup = props.options.map((link) => (
    <li key={link.id} className="link-list-item">
      
    </li>
  ));

  return <ul className="link-list">{linkMarkup}</ul>;
};

export default LinkList;