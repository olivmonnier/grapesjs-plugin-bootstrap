import grapesjs from 'grapesjs';
import constants from './constants';
import loadComponents from './components';
import loadBlocks from './blocks';

export default grapesjs.plugins.add('grapesjs-plugin-bootstrap', (editor, opts = {}) => {
  const options = { ...constants,  ...opts };

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
  loadBlocks(editor, options);
});
