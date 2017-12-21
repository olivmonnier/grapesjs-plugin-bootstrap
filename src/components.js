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
          label: 'Size',
          name: 'size',
          options: [
            { value: '', name: 'default' },
            { value: 'well-sm', name: 'small' },
            { value: 'well-lg', name: 'Large' }
          ],
          changeProp: 1
        }],
      }),
      init() {
        this.listenTo(this, 'change:size', this.changeSize)
      },
      changeSize() {
        const size = this.get('size')
        const classes = this.get('classes');
        const sm = this.sm.get('SelectorManager');

        const size_classes = ['well-sm', 'well-lg']
        classes.forEach(element => {
          if(size_classes.includes(element.id)) {
            classes.remove(element);
          }
        })
        
        if (size && size !== '') {
          const class_obj = sm.add(size);
          classes.add(class_obj)
        }
        this.em.trigger('change:selectedComponent');
      },
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
