// src/autocompletes/hashtag.js
import React from 'react';

const hashtags = ['react', 'draft-js', 'component'];

const onMatch = (text) => hashtags.filter(hashtag => hashtag.includes(text));

const Hashtag = ({ children }) => <span className="Hashtag">{children}</span>;

const List = ({ children }) => <ul className="HashtagList">{children}</ul>;

const Item = ({ item, current, onClick }) => {
    let classNames = "HashtagListItem" + (current ? " current" : "");
    return (
        <li className={classNames} onClick={onClick}>
            {item}
        </li>
    );
};

const hashtag = {
    prefix: '#',
    type: 'HASHTAG',
    onMatch,
    component: Hashtag,
    listComponent: List,
    itemComponent: Item,
};

export default hashtag;

