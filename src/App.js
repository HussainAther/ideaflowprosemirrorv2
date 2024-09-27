// src/App.js
import React, { useEffect, useRef } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from 'prosemirror-schema-basic';
import autocompletePlugin from './plugins/autocomplete'; // Import your autocomplete plugin
import './App.css';

const App = () => {
    const editorRef = useRef(null);
    const [editorView, setEditorView] = React.useState(null);

    useEffect(() => {
        const state = EditorState.create({
            schema,
            plugins: [autocompletePlugin],
        });

        const view = new EditorView(editorRef.current, {
            state,
        });
        setEditorView(view);

        return () => {
            view.destroy();
        };
    }, []);

    return <div ref={editorRef} className="editor" />;
};

export default App;

