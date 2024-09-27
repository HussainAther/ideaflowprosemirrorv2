// src/autocompletes/mention.js
import React from 'react';

const mentions = ['John Doe', 'Jane Smith', 'Alice Johnson'];

const onMatch = (text) => mentions.filter(mention => mention.includes(text));

const Mention = ({ children }) => <span className="Mention">{children}</span>;

const List = ({ children }) => <ul className="MentionList">{children}</ul>;

const Item = ({ item, current, onClick }) => {
    let classNames = "MentionListItem" + (current ? " current" : "");
    return (
        <li className={classNames} onClick={onClick}>
            {item}
        </li>
    );
};

const mention = {
    prefix: '@',
    type: 'MENTION',
    onMatch,
    component: Mention,
    listComponent: List,
    itemComponent: Item,
};

export default mention;

