export default (editor, config = {}) => {
  const domc = editor.DomComponents
  const textType = domc.getType('text');
  const textModel = textType.model;
  const textView = textType.view;

  domc.addType('header', {
    model: textModel.extend(
      {
        defaults: Object.assign({}, textModel.prototype.defaults, {
          name: 'Header',
          tagName: 'h1',
          traits: textModel.prototype.defaults.traits.concat([
            {
              type: 'select',
              options: [
                { value: 'h1', name: 'One (largest)' },
                { value: 'h2', name: 'Two' },
                { value: 'h3', name: 'Three' },
                { value: 'h4', name: 'Four' },
                { value: 'h5', name: 'Five' },
                { value: 'h6', name: 'Six (smallest)' }
              ],
              label: 'Size',
              name: 'tagName',
              changeProp: 1
            }
          ])
        })
      },
      {
        isComponent (el) {
          if (
            el &&
            el.tagName &&
            ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(el.tagName)
          ) {
            return { type: 'header' }
          }
        }
      }
    ),
    view: textView
  })
}