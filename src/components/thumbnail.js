export default (editor, config = {}) => {
  const domc = editor.DomComponents
  const defaultType = domc.getType('default')
  const defaultModel = defaultType.model
  const defaultView = defaultType.view

  domc.addType('thumbnail', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'Thumbnail',
        droppable: 'img, .caption'
      })
    }, {
      isComponent (el) {
        if (el && el.classList && el.classList.contains('thumbnail')) {
          return { type: 'thumbnail' }
        }
      }
    }),
    view: defaultView
  })

  domc.addType('thumbnail-caption', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'Thumbnail Caption',
        draggable: '.thumbnail'
      })
    }, {
      isComponent (el) {
        if (el && el.classList && el.classList.contains('caption') && el.parentNode.classList.contains('thumbnail')) {
          return { type: 'thumbnail-caption' }
        }
      }
    }),
    view: defaultView
  })
}
