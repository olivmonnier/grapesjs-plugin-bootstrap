import grapesjs from 'grapesjs';
import constants from './constants';
import loadComponents from './components';
import loadBlocks from './blocks';
import loadTraits from './traits';

export default grapesjs.plugins.add('grapesjs-plugin-bootstrap', (editor, opts = {}) => {
  const options = { ...constants,  ...opts };

  if (options.addBasicStyle) {
    editor.addComponents(`
      <style>
        .container, .container-fluid, .row, .row > [class*="col-"] {
          min-height: 50px;
        }
      </style>
    `)
  }

  // Add components
  loadComponents(editor, options);

  // Add traits
  loadTraits(editor, options);

  // Add blocks
  loadBlocks(editor, options);
});
