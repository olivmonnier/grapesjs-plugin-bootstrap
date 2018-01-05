import { capitalize } from '../utils'

export default (editor, config = {}) => {
  const domc = editor.DomComponents
  const defaultType = domc.getType('default')
  const defaultModel = defaultType.model
  const defaultView = defaultType.view
  const headerType = domc.getType('header')
  const headerModel = headerType.model
  const headerView = headerType.view
  const contextList = ['default', 'primary', 'success', 'info', 'warning', 'danger']

  domc.addType('panel', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'Panel',
        droppable: '.panel-heading, .panel-body, .panel-footer, .table, .list-group',
        traits: defaultModel.prototype.defaults.traits.concat([{
          type: 'select-class',
          label: 'Context',
          name: 'context',
          options: contextList.map(val =>
            ({ value: `panel-${val}`, name: capitalize(val) }))
        }])
      })
    }, {
      isComponent (el) {
        if (el && el.classList && el.classList.contains('panel')) {
          return { type: 'panel' }
        }
      }
    }),
    view: defaultView
  })

  domc.addType('panel-body', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'Panel Body',
        draggable: '.panel'
      })
    }, {
      isComponent (el) {
        if (el && el.classList && el.classList.contains('panel-body')) {
          return { type: 'panel-body' }
        }
      }
    }),
    view: defaultView
  })

  domc.addType('panel-footer', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'Panel Footer',
        draggable: '.panel'
      })
    }, {
      isComponent (el) {
        if (el && el.classList && el.classList.contains('panel-footer')) {
          return { type: 'panel-footer' }
        }
      }
    }),
    view: defaultView
  })

  domc.addType('panel-heading', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'Panel Heading',
        draggable: '.panel'
      })
    }, {
      isComponent (el) {
        if (el && el.classList && el.classList.contains('panel-heading')) {
          return { type: 'panel-heading' }
        }
      }
    }),
    view: defaultView
  })

  domc.addType('panel-title', {
    model: headerModel.extend({
      defaults: Object.assign({}, headerModel.prototype.defaults, {
        'custom-name': 'Panel Title',
        draggable: '.panel-heading'
      })
    }, {
      isComponent (el) {
        if (el && el.classList && el.classList.contains('panel-title')) {
          return { type: 'panel-title' }
        }
      }
    }),
    view: headerView
  })
}
