import { capitalize } from '../utils'

export default (editor, config = {}) => {
  const domc = editor.DomComponents
  const defaultType = domc.getType('default')
  const defaultModel = defaultType.model
  const defaultView = defaultType.view
  const headerType = domc.getType('header')
  const headerModel = headerType.model
  const headerView = headerType.view
  const sides = ['left', 'right']
  const positions = ['top', 'middle', 'bottom']

  domc.addType('media', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'Media',
        classes: ['media'],
        droppable: '.media-left, .media-right, .media-body'
      })
    }, {
      isComponent (el) {
        if (el && el.classList && el.classList.contains('media')) {
          return { type: 'media' }
        }
      }
    }),
    view: defaultView
  })

  domc.addType('media-side', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'Media Side',
        draggable: '.media',
        traits: [
          {
            type: 'select-class',
            label: 'Side',
            options: sides.map(side => ({ value: `media-${side}`, name: capitalize(side) }))
          },
          {
            type: 'select-class',
            label: 'Position',
            options: positions.map(position => ({ value: `media-${position}`, name: capitalize(position) }))
          }
        ]
      })
    }, {
      isComponent (el) {
        if (el && el.className && el.className.match(/media-(left|right)/)) {
          return { type: 'media-side' }
        }
      }
    }),
    view: defaultView
  })

  domc.addType('media-body', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'Media Body',
        draggable: '.media'
      })
    }, {
      isComponent (el) {
        if (el && el.classList && el.classList.contains('media-body')) {
          return { type: 'media-body' }
        }
      }
    }),
    view: defaultView
  })

  domc.addType('media-heading', {
    model: headerModel.extend({
      defaults: Object.assign({}, headerModel.prototype.defaults, {
        'custom-name': 'Media Heading',
        draggable: '.media-body'
      })
    }, {
      isComponent (el) {
        if (el && el.classList && el.classList.contains('media-heading')) {
          return { type: 'media-heading' }
        }
      }
    }),
    view: headerView
  })
}
