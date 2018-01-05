export default (editor, config = {}) => {
  const domc = editor.DomComponents
  const defaultType = domc.getType('default')
  const defaultModel = defaultType.model
  const defaultView = defaultType.view
  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  domc.addType('row', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'Row',
        tagName: 'div',
        draggable: '.container, .container-fluid',
        droppable: '[class*="col-xs"], [class*="col-sm"], [class*="col-md"], [class*="col-lg"]'
      })
    }, {
      isComponent (el) {
        if (el && el.classList && el.classList.contains('row')) {
          return { type: 'row' }
        }
      }
    }),
    view: defaultView
  })

  domc.addType('column', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'Column',
        draggable: '.row',
        droppable: true,
        traits: defaultModel.prototype.defaults.traits.concat([{
          type: 'select-class',
          options: [
            {value: '', name: 'None'},
            ...cols.map((i) => ({ value: `col-xs-${i}`, name: `${i}/12` }))
          ],
          label: 'XS size'
        }, {
          type: 'select-class',
          options: [
            {value: '', name: 'None'},
            ...cols.map((i) => ({ value: `col-sm-${i}`, name: `${i}/12` }))
          ],
          label: 'SM size'
        }, {
          type: 'select-class',
          options: [
            {value: '', name: 'None'},
            ...cols.map((i) => ({ value: `col-md-${i}`, name: `${i}/12` }))
          ],
          label: 'MD size'
        }, {
          type: 'select-class',
          options: [
            {value: '', name: 'None'},
            ...cols.map((i) => ({ value: `col-lg-${i}`, name: `${i}/12` }))
          ],
          label: 'LG size'
        }, {
          type: 'select-class',
          options: [
            {value: '', name: 'None'},
            ...cols.map((i) => ({ value: `col-xs-offset-${i}`, name: `${i}/12` }))
          ],
          label: 'XS offset'
        }, {
          type: 'select-class',
          options: [
            {value: '', name: 'None'},
            ...cols.map((i) => ({ value: `col-sm-offset-${i}`, name: `${i}/12` }))
          ],
          label: 'SM offset'
        }, {
          type: 'select-class',
          options: [
            {value: '', name: 'None'},
            ...cols.map((i) => ({ value: `col-md-offset-${i}`, name: `${i}/12` }))
          ],
          label: 'MD offset'
        }, {
          type: 'select-class',
          options: [
            {value: '', name: 'None'},
            ...cols.map((i) => ({ value: `col-lg-offset-${i}`, name: `${i}/12` }))
          ],
          label: 'LG offset'
        }])
      })
    }, {
      isComponent (el) {
        if (el && el.className && el.className.match(/col-(xs|sm|md|lg)-\d+/)) {
          return { type: 'column' }
        }
      }
    }),
    view: defaultView
  })
}
