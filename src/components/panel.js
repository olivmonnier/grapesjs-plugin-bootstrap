import handleTraitClassName from '../utils/handleTraitClassName';

export default (editor, config = {}) => {
  const domc = editor.DomComponents;
  const defaultType = domc.getType("default");
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view; 
  const contextList = ['default', 'primary', 'success', 'info', 'warning', 'danger'];

  domc.addType('panel', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'Panel',
        traits: [{
          type: 'select',
          label: 'Context',
          name: 'context',
          options: contextList.map(val => 
            ({ value: `panel-${val}`, name: val })),
          changeProp: 1
        }]
      }),
      init() {
        const panelContext = contextList.map(val => `panel-${val}`);

        this.listenTo(this, "change:context", handleTraitClassName.bind(this, 'context', panelContext));
      }
    }, {
      isComponent(el) {
        if (el && el.classList && el.classList.contains('panel')) {
          return { type: 'panel' }
        }
      }
    }),
    view: defaultView
  })
}