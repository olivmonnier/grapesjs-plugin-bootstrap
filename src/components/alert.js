import { capitalize } from '../utils'

export default (editor, config = {}) => {
  const domc = editor.DomComponents
  const textType = domc.getType('text')
  const textModel = textType.model
  const textView = textType.view
  const contexts = ['success', 'info', 'warning', 'danger']

  domc.addType('alert', {
    model: textModel.extend({
      defaults: Object.assign({}, textModel.prototype.defaults, {
        'custom-name': 'Alert',
        attributes: {
          role: 'alert'
        },
        classes: ['alert'],
        traits: textModel.prototype.defaults.traits.concat([
          {
            type: 'select-class',
            label: 'Context',
            options: contexts.map(context => ({ value: `alert-${context}`, name: capitalize(context) }))
          }
        ])
      })
    }, {
      isComponent (el) {
        if (el && el.classList && el.classList.contains('alert')) {
          return { type: 'alert' }
        }
      }
    }),
    view: textView
  })
}
