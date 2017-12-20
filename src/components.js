export default (editor, config = {}) => {
  const domc = editor.DomComponents;
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('well', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'Well',
        traits: [{
          type: 'select',
          label: 'Well size',
          name: 'well-size',
          options: [
            { value: 'well ', name: 'default' },
            { value: 'well well-sm', name: 'small' },
            { value: 'well well-lg', name: 'Large' }
          ]
        }],
        changeProp: 1
      }),
      init() {
        this.listenTo(this, 'change:well-size', this.changeSize)
      },
      changeSize() {
        //this.em.trigger("change:selectedComponent");
      }
    }, {
      isComponent(el) {
        if (el && el.classList && el.classList.contains('well')) {
          return { type: 'well' }
        }
      }
    }),
    view: defaultView
  })
}
