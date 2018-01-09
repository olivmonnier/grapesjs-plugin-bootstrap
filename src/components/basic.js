import { capitalize, getModel, getView } from '../utils'

export default (editor, config = {}) => {
  const domc = editor.DomComponents
  let defaultModel = getModel(editor, 'default')
  let defaultView = getView(editor, 'default')
  let textModel = getModel(editor, 'text')
  let textView = getView(editor, 'text')
  let imgModel = getModel(editor, 'image')
  let imgView = getView(editor, 'image')
  let linkModel = getModel(editor, 'link')
  let linkView = getView(editor, 'link')

  const contexts = ['primary', 'success', 'info', 'warning', 'danger']
  const alignments = ['left', 'center', 'right', 'justify']
  const textStyles = ['lowercase', 'uppercase', 'capitalize']
  const imgShapes = ['rounded', 'circle', 'thumbnail']
  const sizes = [
    ['lg', 'large'],
    ['sm', 'small'],
    ['xs', 'extra small']
  ]

  domc.addType('default', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        traits: defaultModel.prototype.defaults.traits.concat([
          {
            type: 'select-class',
            label: 'Float',
            options: [
              { value: '', name: 'None' },
              { value: 'pull-left', name: 'Left' },
              { value: 'pull-right', name: 'Right' }
            ]
          },
          {
            type: 'select-class',
            label: 'Color',
            options: [
              { value: '', name: 'None' },
              ...['muted'].concat(contexts).map(context => ({ value: `text-${context}`, name: capitalize(context) }))
            ]
          },
          {
            type: 'select-class',
            label: 'Background',
            options: [
              { value: '', name: 'None' },
              ...contexts.map(context => ({ value: `bg-${context}`, name: capitalize(context) }))
            ]
          }
        ])
      })
    }),
    view: defaultView
  })

  defaultModel = getModel(editor, 'default')
  defaultView = getView(editor, 'default')

  domc.addType('image', {
    model: imgModel.extend({
      defaults: Object.assign({}, imgModel.prototype.defaults, {
        'custom-name': 'Image',
        attributes: {
          src: 'https://dummyimage.com/450x250/999/222'
        },
        traits: [
          {
            type: 'text',
            label: 'Source (URL)',
            name: 'src'
          },
          {
            type: 'text',
            label: 'Alternate text',
            name: 'alt'
          },
          {
            type: 'select-class',
            label: 'Responsive',
            options: [
              { value: '', name: 'No' },
              { value: 'img-responsive', name: 'Yes' }
            ]
          },
          {
            type: 'select-class',
            label: 'Shape',
            options: [
              { value: '', name: 'none' },
              ...imgShapes.map(shape => ({ value: `img-${shape}`, name: capitalize(shape) }))
            ]
          }
        ]
      })
    }, {
      isComponent (el) {
        if (el && el.tagName && el.tagName === 'IMG') {
          return { type: 'image' }
        }
      }
    }),
    view: imgView
  })

  domc.addType('text', {
    model: defaultModel.extend({
      defaults: Object.assign({}, textModel.prototype.defaults, {
        droppable: true,
        traits: defaultModel.prototype.defaults.traits.concat([
          {
            type: 'select-class',
            label: 'Alignment',
            options: [
              ...alignments.map(align => ({ value: `text-${align}`, name: capitalize(align) })),
              { value: 'text-nowrap', name: 'No wrap' }
            ]
          },
          {
            type: 'select-class',
            label: 'Transform',
            options: [
              { value: '', name: 'None' },
              ...textStyles.map(style => ({ value: `text-${style}`, name: capitalize(style) }))
            ]
          }
        ])
      })
    }),
    view: textView
  })

  textModel = getModel(editor, 'text')
  textView = getView(editor, 'text')

  domc.addType('header', {
    model: textModel.extend(
      {
        defaults: Object.assign({}, textModel.prototype.defaults, {
          'custom-name': 'Header',
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

  domc.addType('link', {
    model: linkModel.extend({
      defaults: Object.assign({}, linkModel.prototype.defaults, {
        traits: [
          {
            type: 'text',
            name: 'id',
            label: 'Id',
            placeholder: 'eg. Text here'
          }].concat(linkModel.prototype.defaults.traits, [
            {
              type: 'select',
              label: 'Toggles',
              name: 'data-toggle',
              options: [
              {value: '', name: 'None'},
              {value: 'button', name: 'Self'},
              {value: 'collapse', name: 'Collapse'},
              {value: 'dropdown', name: 'Dropdown'}
              ],
              changeProp: 1
            }
          ])
      })
    }),
    view: linkView
  })

  linkModel = getModel(editor, 'link')
  linkView = getView(editor, 'link')

  domc.addType('button', {
    model: linkModel.extend({
      defaults: Object.assign({}, linkModel.prototype.defaults, {
        'custom-name': 'Button',
        attributes: {
          role: 'button'
        },
        classes: ['btn'],
        traits: linkModel.prototype.defaults.traits.concat([
          {
            type: 'select-class',
            label: 'Context',
            options: [
              { value: 'btn-default', name: 'Default' },
              ...contexts.map(context => ({ value: `btn-${context}`, name: capitalize(context) }))
            ]
          },
          {
            type: 'select-class',
            label: 'Size',
            options: [
              { value: '', name: 'Default' },
              ...sizes.map(size => ({ value: `btn-${size[0]}`, name: capitalize(size[1]) }))
            ]
          },
          {
            type: 'select-class',
            label: 'Width',
            options: [
              { value: '', name: 'Inline' },
              { value: 'btn-block', name: 'Block' }
            ]
          }
        ])
      }, {
        isComponent (el) {
          if (el && el.classList && el.classList.contains('btn')) {
            return { type: 'button' }
          }
        }
      })
    }),
    view: linkView
  })

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

  domc.addType('paragraph', {
    model: textModel.extend({
      defaults: Object.assign({}, textModel.prototype.defaults, {
        'custom-name': 'Paragraph',
        tagName: 'p',
        traits: textModel.prototype.defaults.traits.concat([
          {
            type: 'select-class',
            label: 'Lead',
            options: [
              { value: '', name: 'No' },
              { value: 'lead', name: 'Yes' }
            ]
          }
        ])
      })
    }, {
      isComponent (el) {
        if (el && el.tagName && el.tagName === 'P') {
          return { type: 'paragraph' }
        }
      }
    }),
    view: textView
  })

  domc.addType('blockquote', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        tagName: 'blockquote',
        traits: defaultModel.prototype.defaults.traits.concat([
          {
            type: 'select-class',
            label: 'Reversed',
            options: [
              { value: '', name: 'No' },
              { value: 'blockquote-reverse', name: 'Yes' }
            ]
          }
        ])
      })
    }, {
      isComponent (el) {
        if (el && el.tagName && el.tagName === 'BLOCKQUOTE') {
          return { type: 'blockquote' }
        }
      }
    }),
    view: defaultView
  })
}
