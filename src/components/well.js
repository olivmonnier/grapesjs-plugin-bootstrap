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
          type: 'select-class',
          label: 'Size',
          name: 'size',
          options: [
            { value: '', name: 'default' },
            { value: 'well-sm', name: 'small' },
            { value: 'well-lg', name: 'large' }
          ],
          changeProp: 1
        }],
      })
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
