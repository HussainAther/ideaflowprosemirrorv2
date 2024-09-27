// src/autocompletes/relation.js
import React from 'react';

const relations = ['Project A', 'Project B', 'Team Collaboration', 'Strategy Meeting'];

const onMatch = (text) => relations.filter(relation => relation.toLowerCase().startsWith(text.toLowerCase()));

const Relation = ({ children }) => (
  <span className="Relation">{children}</span>
);

const List = ({ children }) => (
  <ul className="RelationList">{children}</ul>
);

const Item = ({ item, current, onClick }) => {
  let classNames = "RelationListItem";
  classNames += current ? " current" : "";
  return (
    <li className={classNames} onClick={onClick}>
      {item}
    </li>
  );
};

const relation = {
  prefix: '<>',
  type: 'RELATION',
  pattern: /<>\s*(\w*)$/,
  onMatch: onMatch,
  component: Relation,
  listComponent: List,
  itemComponent: Item,
  format: (item) => `<${item}>`
};

export default relation;

