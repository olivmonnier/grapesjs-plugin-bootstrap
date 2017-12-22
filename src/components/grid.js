export default (editor, config = {}) => {
  const domc = editor.DomComponents;
  const defaultType = domc.getType("default");
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('row', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'Row'
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
    model: defaultModel.extend(
      {
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          "custom-name": "Column"
        })
      },
      {
        isComponent(el) {
          if (el && el.className && el.className.match(/col-(xs|sm|md|lg)/)) {
            return { type: "column" };
          }
        }
      }
    ),
    view: defaultView
  });
}