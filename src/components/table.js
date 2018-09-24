import { capitalize } from '../utils'

export default (editor, config = {}) => {
  const domc = editor.DomComponents
  const defaultType = domc.getType('default')
  const tableType = domc.getType('table')
  const tableModel = tableType.model
  const tableView = tableType.view
  const { contexts } = config

  domc.addType('table', {
    model: tableModel.extend({
      defaults: Object.assign({}, tableModel.prototype.defaults, {
        classes: ['table'],
        traits: [].concat(
          defaultType.model.prototype.defaults.traits,
          [
            {
              type: 'select-class',
              label: 'Striped',
              options: [
                { value: '', name: 'No' },
                { value: 'table-striped', name: 'Yes' }
              ]
            },
            {
              type: 'select-class',
              label: 'Bordered',
              options: [
                { value: '', name: 'No' },
                { value: 'table-bordered', name: 'Yes' }
              ]
            },
            {
              type: 'select-class',
              label: 'Hover',
              options: [
                { value: '', name: 'No' },
                { value: 'table-hover', name: 'Yes' }
              ]
            },
            {
              type: 'select-class',
              label: 'Condensed',
              options: [
                { value: '', name: 'No' },
                { value: 'table-condensed', name: 'Yes' }
              ]
            }
          ]
        )
      })
    }),
    view: tableView
  });

  ['row', 'cell', 'thead'].forEach(type => {
    const compType = domc.getType(type);

    domc.addType(type, {
      model: compType.model.extend({
        defaults: Object.assign({}, compType.model.prototype.defaults, {
          traits: compType.model.prototype.defaults.traits.concat([
            {
              type: 'select-class',
              label: 'Context',
              options: [
                { value: 'active', name: 'Active' },
                ...contexts.filter(c => c !== 'primary').map(context => ({ value: context, name: capitalize(context) }))
              ]
            }
          ])
        })
      }),
      view: compType.view
    })
  })
}