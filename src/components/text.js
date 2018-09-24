import { capitalize } from '../utils';

export default (editor, config = {}) => {
  const domc = editor.DomComponents
  const defaultType = domc.getType('default')
  const defaultModel = defaultType.model
  const defaultView = defaultType.view
  const { alignments, textStyles } = config

  domc.addType('text', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        droppable: false,
        editable: true,
        traits: defaultModel.prototype.defaults.traits.concat([
          {
            type: 'select-class',
            label: 'Alignment',
            options: [
              ...alignments.map(align => ({ value: `text-${align}`, name: capitalize(align) })),
              { value: 'text-nowrap', name: 'No wrap' }
            ]
          },
          {
            type: 'select-class',
            label: 'Transform',
            options: [
              { value: '', name: 'None' },
              ...textStyles.map(style => ({ value: `text-${style}`, name: capitalize(style) }))
            ]
          },
          {
            type: 'select-class',
            label: 'Lead',
            options: [
              { value: '', name: 'No' },
              { value: 'lead', name: 'Yes' }
            ]
          }
        ])
      })
    }),
    view: defaultView
  })
}