export default (editor, config = {}) => {
  const domc = editor.DomComponents
  const defaultType = domc.getType('default')
  const defaultModel = defaultType.model
  const defaultView = defaultType.view

  domc.addType('container', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'Container',
        tagName: 'div',
        droppable: true,
        traits: defaultModel.prototype.defaults.traits.concat([
          {
            type: 'select-class',
            label: 'Type',
            options: [
              { value: 'container', name: 'Fixed' },
              { value: 'container-fluid', name: 'Fluid' }
            ]
          }
        ])
      })
    }, {
      isComponent (el) {
        if (el && el.classList && (el.classList.contains('container') || el.classList.contains('container-fluid'))) {
          return { type: 'container' }
        }
      }
    }),
    view: defaultView
  })
}
