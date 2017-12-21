import grapesjs from 'grapesjs';
import constants from './constants';
import loadComponents from './components';
import loadBlocks from './blocks';

export default grapesjs.plugins.add('grapesjs-plugin-bootstrap', (editor, opts = {}) => {
  const options = { ...constants,  ...opts };

  if (options.addBasicStyle) {
    editor.addComponents(`
      <style>
        .container, .row {
          padding: 10px 0;
        }
        .container, .row, .cell {
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
