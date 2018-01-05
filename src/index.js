import grapesjs from 'grapesjs'
import constants from './constants'
import loadComponents from './components'
import loadBlocks from './blocks'
import loadDevices from './devices'
import loadTraits from './traits'

export default grapesjs.plugins.add('grapesjs-plugin-bootstrap', (editor, opts = {}) => {
  const options = { ...constants, ...opts }

  if (options.addBasicStyle) {
    editor.addComponents(`
      <style>
        .gjs-dashed .container, .gjs-dashed .container-fluid, .gjs-dashed .row, .gjs-dashed .row > [class*="col-"], .gjs-dashed .dropdown-menu {
          min-height: 50px;
        }
        .gjs-dashed .dropdown-menu {
          display: block;
        }
      </style>
    `)
  }

  // Add components
  loadComponents(editor, options)

  // Add traits
  loadTraits(editor, options)

  // Add blocks
  loadBlocks(editor, options)

  // Add devices
  loadDevices(editor, options)
})
