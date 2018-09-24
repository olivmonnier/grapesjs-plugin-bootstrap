export default (editor, config = {}) => {
  const domc = editor.DomComponents
  const defaultType = domc.getType('default')
  const defaultModel = defaultType.model
  const defaultView = defaultType.view

  domc.addType('blockquote', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        name: 'Blockquote',
        tagName: 'blockquote',
        traits: defaultModel.prototype.defaults.traits.concat([
          {
            type: 'select-class',
            label: 'Reversed',
            options: [
              { value: '', name: 'No' },
              { value: 'blockquote-reverse', name: 'Yes' }
            ]
          }
        ])
      })
    }, {
      isComponent(el) {
        if (el && el.tagName && el.tagName === 'BLOCKQUOTE') {
          return { type: 'blockquote' }
        }
      }
    }),
    view: defaultView
  })
}