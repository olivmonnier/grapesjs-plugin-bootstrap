export default (editor, config = {}) => {
  const domc = editor.DomComponents;
  const defaultType = domc.getType("default");
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  const textType = domc.getType('text');
  const textModel = textType.model;
  const textView = textType.view;

  domc.addType('list', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'List',
        droppable: true
      })
    }, {
      isComponent(el) {
        if (el && el.tagName && (el.tagName == 'UL' || el.tagName == 'OL')) {
          return { type: 'list' }
        }
      }
    }),
    view: defaultView
  })

  domc.addType('list-item', {
    model: textModel.extend({
      defaults: Object.assign({}, textModel.prototype.defaults, {
        'custom-name': 'Item',
        tagName: 'li',
        draggable: 'ul, ol',
        droppable: true,
        editable: true
      })
    }, {
      isComponent(el) {
        if (el && el.tagName && el.tagName == 'LI') {
          return { type: 'list-item' }
        }
      }
    }),
    view: textView
  })
}