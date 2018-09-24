import { capitalize } from '../utils';

export default (editor, config = {}) => {
  const domc = editor.DomComponents
  const defaultType = domc.getType('default')
  const defaultModel = defaultType.model
  const defaultView = defaultType.view
  const { contexts } = config

  domc.addType('default', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        traits: defaultModel.prototype.defaults.traits.concat([
          {
            type: 'select-class',
            label: 'Float',
            options: [
              { value: '', name: 'None' },
              { value: 'pull-left', name: 'Left' },
              { value: 'pull-right', name: 'Right' }
            ]
          },
          {
            type: 'select-class',
            label: 'Color',
            options: [
              { value: '', name: 'None' },
              ...['muted'].concat(contexts).map(context => ({ value: `text-${context}`, name: capitalize(context) }))
            ]
          },
          {
            type: 'select-class',
            label: 'Background',
            options: [
              { value: '', name: 'None' },
              ...contexts.map(context => ({ value: `bg-${context}`, name: capitalize(context) }))
            ]
          }
        ])
      })
    }),
    view: defaultView
  })
}