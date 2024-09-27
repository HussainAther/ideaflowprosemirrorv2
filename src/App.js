// src/App.js
import React, { useEffect, useRef, useState } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from 'prosemirror-schema-basic';
import autocompletePlugin from './plugins/autocomplete';
import SuggestionsDropdown from './components/SuggestionsDropdown';
import './App.css';

const App = () => {
    const editorRef = useRef(null);
    const [view, setView] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const HASHTAGS = ['#react', '#typescript', '#julia'];
    const PEOPLE = ['@john', '@jane', '@jacob'];
    const RELATIONS = ['<>idea', '<>project', '<>task'];

    useEffect(() => {
        const state = EditorState.create({
            schema,
            doc: schema.node('doc', null, [schema.node('paragraph', null, schema.text('Type #, @, or <> to start autocomplete'))]),
            plugins: [autocompletePlugin],
        });

        const editorView = new EditorView(editorRef.current, {
            state,
            dispatchTransaction(transaction) {
                const newState = editorView.state.apply(transaction);
                editorView.updateState(newState);

                // Get the current text up to the cursor position
                const { from } = newState.selection;
                const text = newState.doc.textBetween(Math.max(0, from - 20), from, '\n', ' ');
                
                // Check if a trigger character is detected
                let match = null;
                let type = null;

                if (text.endsWith('#')) {
                    match = '';
                    type = 'hashtag';
                } else if (text.endsWith('@')) {
                    match = '';
                    type = 'person';
                } else if (text.endsWith('<>')) {
                    match = '';
                    type = 'relation';
                } else if (showSuggestions) {
                    match = text.match(/[#@<>]\w*$/);
                }

                if (match !== null || (type && showSuggestions)) {
                    const suggestions = getSuggestions(type || match[0][0]);
                    setSuggestions(suggestions);
                    setShowSuggestions(true);
                    setActiveIndex(0);

                    // Calculate position for dropdown
                    const coords = editorView.coordsAtPos(from);
                    setPosition({ top: coords.bottom + window.scrollY, left: coords.left + window.scrollX });
                } else {
                    setShowSuggestions(false);
                }
            }
        });

        setView(editorView);
    }, []);

    const getSuggestions = (type) => {
        switch (type) {
            case '#': return HASHTAGS;
            case '@': return PEOPLE;
            case '<>': return RELATIONS;
            default: return [];
        }
    };

    const handleSelect = (suggestion) => {
        // Insert the selected suggestion into the editor
        if (view) {
            const { state, dispatch } = view;
            const { from, to } = state.selection;

            // Create a transaction to replace the text with the selected suggestion
            const transaction = state.tr.replaceWith(from - 1, to, schema.text(suggestion));
            dispatch(transaction);
            setShowSuggestions(false);
        }
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions) return;

        if (e.key === 'ArrowDown') {
            setActiveIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
            e.preventDefault();
        } else if (e.key === 'ArrowUp') {
            setActiveIndex((prevIndex) => (prevIndex - 1 + suggestions.length) % suggestions.length);
            e.preventDefault();
        } else if (e.key === 'Enter' || e.key === 'Tab') {
            handleSelect(suggestions[activeIndex]);
            e.preventDefault();
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
            e.preventDefault();
        }
    };

    return (
        <div className="editor-container" onKeyDown={handleKeyDown}>
            <div ref={editorRef} className="editor" style={{ border: '1px solid black', minHeight: '300px' }} />
            {showSuggestions && (
                <SuggestionsDropdown
                    suggestions={suggestions}
                    position={position}
                    onSelect={handleSelect}
                    activeIndex={activeIndex}
                />
            )}
        </div>
    );
};

export default App;

