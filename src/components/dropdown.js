export default (editor, config = {}) => {
  const domc = editor.DomComponents;
  const defaultType = domc.getType("default");
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('dropdown', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'curstom-name': 'Dropdown',
        traits: [{
          type: 'list-items',
          label: 'Items',
          name: 'items'
        }]
      })
    }, {
        isComponent(el) {
          if (el && el.classList && el.classList.contains('dropdown')) {
            return { type: 'dropdown' }
          }
        }
    }),
    view: defaultView.extend({
      render: function() {
        const traits = this.model.get('traits');

        defaultView.prototype.render.apply(this, arguments);

        return this;
      }
    })
  })
}