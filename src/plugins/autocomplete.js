import { Plugin, PluginKey } from 'prosemirror-state';
// Remove or comment out unused imports until they are needed
// import { Decoration, DecorationSet } from 'prosemirror-view';

// Fake data for hashtags, people, and relations
const HASHTAGS = ['#react', '#javascript', '#prosemirror'];
const PEOPLE = ['@john', '@jane', '@jacob'];
const RELATIONS = ['<>idea', '<>project', '<>task'];

const autocompletePluginKey = new PluginKey('autocomplete');

const autocompletePlugin = new Plugin({
    key: autocompletePluginKey,
    state: {
        init() {
            // Initial state, but do not define unused variables
            return { showSuggestions: false, suggestions: [], matchString: '', type: '' };
        },
        apply(tr, prev) {
            // We won't use destructuring here since those variables are not used yet
            const meta = tr.getMeta(autocompletePluginKey);
            if (meta) {
                return meta;
            }
            return prev;
        }
    },
    props: {
        handleKeyDown(view, event) {
            const { state, dispatch } = view;
            const { selection, doc } = state;
            const position = selection.from; // Remove or use 'position' if necessary

            const beforeCursor = doc.textBetween(Math.max(0, position - 20), position, '\n', ' ');
            
            // Detect if the user types a trigger character
            if (event.key === '#') {
                startAutocomplete(view, dispatch, '#');
            } else if (event.key === '@') {
                startAutocomplete(view, dispatch, '@');
            } else if (event.key === '<') {
                // Check for the full string `<>`
                if (beforeCursor.endsWith('<')) {
                    startAutocomplete(view, dispatch, '<>');
                }
            }
            return false;
        },
        // Remove or comment out unused decoration code until it's needed
        // decorations(state) {
        //     const pluginState = autocompletePluginKey.getState(state);
        //     if (!pluginState.showSuggestions) return null;
        //     return DecorationSet.empty;
        // }
    }
});

// Function to start the autocomplete process, but remove the unused 'position' parameter
function startAutocomplete(view, dispatch, type) {
    const suggestions = getSuggestions(type);
    dispatch(view.state.tr.setMeta(autocompletePluginKey, {
        showSuggestions: true,
        suggestions,
        matchString: '',
        type
    }));
}

// Function to get suggestions based on the trigger type
function getSuggestions(type) {
    switch (type) {
        case '#': return HASHTAGS;
        case '@': return PEOPLE;
        case '<>': return RELATIONS;
        default: return [];
    }
}

export default autocompletePlugin;

