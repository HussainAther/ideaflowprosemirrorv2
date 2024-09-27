// src/autocompletes/mention.js
import React from 'react';

const people = ['John Doe', 'Jane Smith', 'Bill Gates', 'Elon Musk'];

const onMatch = (text) => people.filter(person => person.toLowerCase().startsWith(text.toLowerCase()));

const Mention = ({ children }) => (
  <span className="Mention">{children}</span>
);

const List = ({ children }) => (
  <ul className="MentionList">{children}</ul>
);

const Item = ({ item, current, onClick }) => {
  let classNames = "MentionListItem";
  classNames += current ? " current" : "";
  return (
    <li className={classNames} onClick={onClick}>
      {item}
    </li>
  );
};

const mention = {
  prefix: '@',
  type: 'MENTION',
  pattern: /@(\w*)$/,
  onMatch: onMatch,
  component: Mention,
  listComponent: List,
  itemComponent: Item,
  format: (item) => `@${item}`
};

export default mention;

