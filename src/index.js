import grapesjs from 'grapesjs';
import loadComponents from './components';
import loadLayoutBlocks from './layout';

export default grapesjs.plugins.add('grapesjs-plugin-bootstrap', (editor, opts = {}) => {
  const options = { ...{
    // default options
    blocks: ['container', 'columns-2', 'columns-3', 'columns-4', 'columns-4-8', 'columns-8-4', 'well'],
    addBasicStyle: true
  },  ...opts };

  if (options.addBasicStyle) {
    editor.addComponents(`
      <style>
        .container, .row, .well {
          padding: 10px;
        }
        .container, .row, .cell, .well {
          min-height: 50px;
        }
      </style>
    `)
  }

  // Add components
  loadComponents(editor, options);

  // Add layout blocks
  loadLayoutBlocks(editor, options);
});
