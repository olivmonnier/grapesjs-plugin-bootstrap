export default (editor, config = {}) => {
  const domc = editor.DomComponents;
  const defaultType = domc.getType("default");
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('row', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'Row',
        droppable: ':not(.row)',
        draggable: ':not(.row)'
      })
    }, {
      isComponent(el) {
        if (el && el.classList && el.classList.contains('row')) {
          return { type: 'row' }
        }
      }
    }),
    view: defaultView
  })

  domc.addType("column", {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        "custom-name": "Column",
        droppable: ':not([class*="col-"])',
        draggable: '.row',
        traits: [{
          type: 'select',
          label: 'Viewport',
          name: 'viewport',
          options: ['xs', 'sm', 'md', 'lg'],
          changeProp: 1
        }, {
          type: 'select',
          label: 'Width Column',
          name: 'width-column',
          options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          changeProp: 1
        }],  
      }),
      init() {
        this.listenTo(this, 'change:width-column', this.changeWidth);
        this.listenTo(this, 'change:viewport', this.changeWidth);
      },
      changeWidth() {
        const width = this.get("width-column") || '12';
        const viewPort = this.get('viewport') || 'md';
        const classes = this.get('classes');
        const sm = this.sm.get("SelectorManager");

        classes.forEach(className => {
          if (className.id.match(/col-(xs|sm|md|lg)-\d+/)) {
            classes.remove(className)
          }
        })

        const class_obj = sm.add(`col-${viewPort}-${width}`);
        classes.add(class_obj);

        this.em.trigger("change:selectedComponent");
      }
    }, {
      isComponent(el) {
        if (el && el.className && el.className.match(/col-(xs|sm|md|lg)-\d+/)) {
          return { type: "column" };
        }
      }
    }),
    view: defaultView
  });
}