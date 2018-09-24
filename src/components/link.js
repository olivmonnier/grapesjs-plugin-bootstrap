export default (editor, config = {}) => {
  const domc = editor.DomComponents
  const defaultType = domc.getType('default')
  const linkType = domc.getType('link')
  const linkModel = linkType.model
  const linkView = linkType.view

  domc.addType('link', {
    model: linkModel.extend({
      defaults: Object.assign({}, linkModel.prototype.defaults, {
        traits: [].concat(
          defaultType.model.prototype.defaults.traits,
          'href', 'target',
          [
            {
              type: 'select',
              label: 'Toggles',
              name: 'data-toggle',
              options: [
                {value: '', name: 'None'},
                {value: 'button', name: 'Self'},
                {value: 'collapse', name: 'Collapse'},
                {value: 'dropdown', name: 'Dropdown'}
              ],
              changeProp: 1
            }
        ])
      })
    }),
    view: linkView
  })
}