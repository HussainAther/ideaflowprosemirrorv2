import React, { Component } from 'react';
import './App.css';
import { Editor, EditorState } from 'draft-js';
import Autocomplete from 'draft-js-autocomplete';

import 'draft-js/dist/Draft.css';

import mention from './autocompletes/mention';
import hashtag from './autocompletes/hashtag';
import relation from './autocompletes/relation'; // Ensure relation is imported

import './autocompletes/mention.css';
import './autocompletes/hashtag.css';
import './autocompletes/relation.css';


class App extends Component {

  autocompletes = [
    mention,
    hashtag,
    relation // Add relation to the autocompletes array
  ];

  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  onChange = (editorState) => {
    this.setState({ editorState })
  };

  render() {
    const { editorState } = this.state;

    return (
      <React.Fragment>
        <h1 className="Title">Ideaflow app</h1>
        <div className="Editor">
          <Autocomplete editorState={editorState} onChange={this.onChange} autocompletes={this.autocompletes}>
            <Editor />
          </Autocomplete>
        </div>
      </React.Fragment>
    );
  }
}

export default App;

