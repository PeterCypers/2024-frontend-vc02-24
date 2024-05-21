import React from "react";

import "./LinkList.css";

//link-list omgebouwd naar paragraph list
const LinkList = (props) => {
  const linkMarkup = props.options.map((link) => (
    <li key={link.id} className="link-list-item">
      {/* <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="link-list-item-url"
      >
        {link.text}
      </a> */}
      {/* <p>{link.text}</p> */}
    </li>
  ));

  return <ul className="link-list">{linkMarkup}</ul>;
};

export default LinkList;