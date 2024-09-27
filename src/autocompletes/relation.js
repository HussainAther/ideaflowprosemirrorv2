// src/autocompletes/relation.js
import React from 'react';

const relations = ['Project A', 'Project B', 'Team Collaboration'];

const onMatch = (text) => relations.filter(relation => relation.includes(text));

const Relation = ({ children }) => <span className="Relation">{children}</span>;

const List = ({ children }) => <ul className="RelationList">{children}</ul>;

const Item = ({ item, current, onClick }) => {
    let classNames = "RelationListItem" + (current ? " current" : "");
    return (
        <li className={classNames} onClick={onClick}>
            {item}
        </li>
    );
};

const relation = {
    prefix: '<>',
    type: 'RELATION',
    onMatch,
    component: Relation,
    listComponent: List,
    itemComponent: Item,
};

export default relation;

