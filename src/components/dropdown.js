export default (editor, config = {}) => {
  const domc = editor.DomComponents;
  const defaultType = domc.getType("default");
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('dropdown', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'Dropdown'
      })
    }, {
        isComponent(el) {
          if (el && el.classList && el.classList.contains('dropdown')) {
            return { type: 'dropdown' }
          }
        }
    }),
    view: defaultView
  })

  domc.addType('dropdown-menu', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'DropdownMenu',
        traits: [{
          type: 'list-items',
          label: 'Items',
          name: 'items'
        }]
      })
    }, {
        isComponent(el) {
          if (el && el.classList && el.classList.contains('dropdown-menu')) {
            return { type: 'dropdown-menu' }
          }
        }
    }),
    view: defaultView
  })
}