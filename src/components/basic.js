import { capitalize, getModel, getView } from '../utils'

export default (editor, config = {}) => {
  const domc = editor.DomComponents
  let defaultModel = getModel(editor, 'default')
  let defaultView = getView(editor, 'default')
  let textModel = getModel(editor, 'text')
  let textView = getView(editor, 'text')
  let linkModel = getModel(editor, 'link')
  let linkView = getView(editor, 'link')
  const { contexts, sizes } = config

  // domc.addType('button', {
  //   model: linkModel.extend({
  //     defaults: Object.assign({}, linkModel.prototype.defaults, {
  //       'custom-name': 'Button',
  //       attributes: {
  //         role: 'button'
  //       },
  //       classes: ['btn'],
  //       traits: linkModel.prototype.defaults.traits.concat([
  //         {
  //           type: 'select-class',
  //           label: 'Context',
  //           options: [
  //             { value: 'btn-default', name: 'Default' },
  //             ...contexts.map(context => ({ value: `btn-${context}`, name: capitalize(context) }))
  //           ]
  //         },
  //         {
  //           type: 'select-class',
  //           label: 'Size',
  //           options: [
  //             { value: '', name: 'Default' },
  //             ...sizes.map(size => ({ value: `btn-${size[0]}`, name: capitalize(size[1]) }))
  //           ]
  //         },
  //         {
  //           type: 'select-class',
  //           label: 'Width',
  //           options: [
  //             { value: '', name: 'Inline' },
  //             { value: 'btn-block', name: 'Block' }
  //           ]
  //         }
  //       ])
  //     }, {
  //       isComponent (el) {
  //         if (el && el.classList && el.classList.contains('btn')) {
  //           return { type: 'button' }
  //         }
  //       }
  //     })
  //   }),
  //   view: linkView
  // })

  domc.addType('list', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'List',
        droppable: true,
        traits: defaultModel.prototype.defaults.traits.concat([
          {
            type: 'select',
            label: 'Type',
            name: 'tagName',
            options: [
              { value: 'ul', name: 'Unordered' },
              { value: 'ol', name: 'Ordered' }
            ],
            changeProp: 1
          },
          {
            type: 'select-class',
            label: 'Style',
            options: [
              { value: '', name: 'none' },
              { value: 'list-unstyled', name: 'Unstyled' },
              { value: 'list-inline', name: 'Inline' }
            ]
          }
        ])
      })
    }, {
      isComponent (el) {
        if (el && el.tagName && (el.tagName === 'UL' || el.tagName === 'OL')) {
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
        draggable: 'ul, ol'
      })
    }, {
      isComponent (el) {
        if (el && el.tagName && el.tagName === 'LI') {
          return { type: 'list-item' }
        }
      }
    }),
    view: textView
  })
}
