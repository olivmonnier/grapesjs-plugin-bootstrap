export default (editor, config = {}) => {
  const domc = editor.DomComponents;
  const defaultType = domc.getType("default");
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  const textType = domc.getType('text');
  const textModel = textType.model;
  const textView = textType.view;
  const linkType = domc.getType('link');
  const linkModel = linkType.model;
  const linkView = linkType.view;

  domc.addType('dropdown', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'Dropdown',
        droppable: 'a, button, .dropdown-menu'
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

  domc.addType('dropdown-toggle', {
    model: textModel.extend({
      defaults: Object.assign({}, textModel.prototype.defaults, {
        'custom-name': 'Dropdown Toggle',
        draggable: '.dropdown',
        droppable: true,
        traits: [
          {
            type: 'select',
            label: 'Type',
            name: 'tagName',
            options: [
              { value: 'button', name: 'button' },
              { value: 'a', name: 'link' }
            ],
            changeProp: 1
          }
        ]
      }),
      init() {
        this.listenTo(this, 'change:tagName', this.changeTag)
      },
      changeTag(el) {
        const attr = this.attributes;
        const { traits } = attr;

        traits.models = traits.models.filter(model => model.attributes.name === 'tagName');

        if (attr.tagName === 'a') {
          traits.add(linkModel.prototype.defaults.traits)
        }
        this.sm.trigger("change:selectedComponent");
      }
    }, {
      isComponent(el) {
        if (el && el.classList && el.classList.contains('dropdown-toggle')) {
          return { type: 'dropdown-toggle' }
        }
      }
    }),
    view: textView
  })

  domc.addType('dropdown-menu', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'Dropdown Menu',
        draggable: '.dropdown',
        droppable: true
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