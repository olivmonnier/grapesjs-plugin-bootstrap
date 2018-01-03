export default (editor, config = {}) => {
  const domc = editor.DomComponents; 
  let defaultType = domc.getType("default");
  let defaultModel = defaultType.model;
  let defaultView = defaultType.view;
  let textType = domc.getType('text');
  let textModel = textType.model;
  let textView = textType.view;
  let imgType = domc.getType('image');
  let imgModel = imgType.model;
  let imgView = imgType.view;
  let linkType = domc.getType('link');
  let linkModel = linkType.model;
  let linkView = linkType.view;

  const contexts = ["primary", "success", "info", "warning", "danger"];
  const alignments = ["left", "center", "right", "justify"];
  const textStyles = ["lowercase", "uppercase", "capitalize"];
  const imgShapes = ["rounded", "circle", "thumbnail"];
  const viewports = ['xs', 'sm', 'md', 'lg'];

  domc.addType('default', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        traits: defaultModel.prototype.defaults.traits.concat([
          {
            type: 'select-class',
            label: 'Float',
            options: [
              { value: '', name: 'none' },
              { value: 'pull-left', name: 'left' },
              { value: 'pull-right', name: 'right' }
            ]
          },
          {
            type: "select-class",
            label: "Color",
            options: [
              { value: '', name: 'none' },
              ... ["muted"].concat(contexts).map(context => ({ value: `text-${context}`, name: context })) 
            ]
          },
          {
            type: "select-class",
            label: "Background",
            options: [
              { value: '', name: 'none' },
              ... contexts.map(context => ({ value: `bg-${context}`, name: context })) 
            ]
          }
        ])
      })
    }),
    view: defaultView
  })
  defaultType = domc.getType('default');
  defaultModel = defaultType.model;
  defaultView = defaultType.view;

  domc.addType('image', {
    model: defaultModel.extend({
      defaults: Object.assign({}, imgModel.prototype.defaults, {
        'custom-name': 'Image',
        tagName: 'img',
        resizable: 1,
        attributes: {
          src: 'https://dummyimage.com/450x250/999/222'
        },
        traits: defaultModel.prototype.defaults.traits.concat([
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
              { value: '', name: 'no' },
              { value: 'img-responsive', name: 'yes' }
            ]
          },
          {
            type: 'select-class',
            label: 'Shape',
            options: [
              { value: '', name: 'none' },
              ... imgShapes.map(shape => ({ value: `img-${shape}`, name: shape }))
            ]
          }
        ])
      })
    }, {
      isComponent(el) {
        if (el && el.tagName && el.tagName == 'IMG') {
          return { type: 'image' }
        }
      }
    }),
    view: imgView
  })

  domc.addType("text", {
    model: defaultModel.extend({
      defaults: Object.assign({}, textModel.prototype.defaults, {
        traits: defaultModel.prototype.defaults.traits.concat([
          {
            type: "select-class",
            label: "Alignment",
            options: [
              ... alignments.map(align => ({ value: `text-${align}`, name: align })),
              { value: "text-nowrap", name: "no wrap" }
            ]
          },
          {
            type: "select-class",
            label: "Transform",
            options: [
              { value: "", name: "none" },
              ... textStyles.map(style => ({ value: `text-${style}`, name: style }))
            ]
          }
        ])
      })
    }),
    view: textView
  });
  textType = domc.getType('text');
  textModel = textType.model;
  textView = textType.view;

  domc.addType("header", {
    model: textModel.extend(
      {
        defaults: Object.assign({}, textModel.prototype.defaults, {
          "custom-name": "Header",
          tagName: "h1",
          traits: textModel.prototype.defaults.traits.concat([
            {
              type: "select",
              options: [
                { value: "h1", name: "One (largest)" },
                { value: "h2", name: "Two" },
                { value: "h3", name: "Three" },
                { value: "h4", name: "Four" },
                { value: "h5", name: "Five" },
                { value: "h6", name: "Six (smallest)" }
              ],
              label: "Size",
              name: "tagName",
              changeProp: 1
            }
          ])
        })
      },
      {
        isComponent(el) {
          if (
            el &&
            el.tagName &&
            ["H1", "H2", "H3", "H4", "H5", "H6"].includes(el.tagName)
          ) {
            return { type: "header" };
          }
        }
      }
    ),
    view: textView
  });

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
              {value: '', name: 'none'},
              {value: 'button', name: 'self'},
              {value: 'collapse', name: 'collapse'},
              {value: 'dropdown', name: 'dropdown'}
            ],
            changeProp: 1
          }
        ])
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
              { value: 'ul', name: 'unordered' },
              { value: 'ol', name: 'ordered' }
            ],
            changeProp: 1
          },
          {
            type: 'select-class',
            label: 'Style',
            options: [
              { value: '', name: 'none' },
              { value: 'list-unstyled', name: 'unstyled' },
              { value: 'list-inline', name: 'inline' },
            ]
          }
        ])
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
        droppable: true
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

  domc.addType('paragraph', {
    model: textModel.extend({
      defaults: Object.assign({}, textModel.prototype.defaults, {
        'custom-name': 'Paragraph',
        tagName: 'p',
        droppable: true,
        traits: textModel.prototype.defaults.traits.concat([
          {
            type: 'select-class',
            label: 'Lead',
            options: [
              { value: '', name: 'no' },
              { value: 'lead', name: 'yes'}
            ]
          }
        ])
      })
    }, {
      isComponent(el) {
        if (el && el.tagName && el.tagName == 'P') {
          return { type: 'paragraph' }
        }
      }
    }),
    view: textView
  })
}