import { capitalize } from '../utils'

export default (editor, config = {}) => {
  const domc = editor.DomComponents
  const textType = domc.getType('text')
  const textModel = textType.model
  const textView = textType.view
  const contexts = ['default', 'primary', 'success', 'info', 'warning', 'danger']

  domc.addType('label', {
    model: textModel.extend({
      defaults: Object.assign({}, textModel.prototype.defaults, {
        'custom-name': 'Label',
        classes: ['label'],
        traits: [
          {
            type: 'select-class',
            label: 'Context',
            options: contexts.map(context => ({ value: `label-${context}`, name: capitalize(context) }))
          }
        ]
      })
    }, {
      isComponent (el) {
        if (el && el.classList && el.classList.contains('label')) {
          return { type: 'label' }
        }
      }
    }),
    view: textView
  })
}
