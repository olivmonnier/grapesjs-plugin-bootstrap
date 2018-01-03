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

  domc.addType('image', {
    model: imgModel.extend({
      defaults: Object.assign({}, imgModel.prototype.defaults, {
        'custom-name': 'Image',
        droppable: true,
        traits: imgModel.prototype.defaults.traits.concat([
          {
            type: 'select-class',
            label: 'Responsive',
            options: [
              { value: '', name: 'no' },
              { value: 'img-responsive', name: 'yes' }
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
    model: textModel.extend({
      defaults: Object.assign({}, textModel.prototype.defaults, {
        traits: [
          {
            type: "select-class",
            label: "Alignment",
            options: [
              { value: "text-left", name: "left" },
              { value: "text-center", name: "center" },
              { value: "text-right", name: "right" },
              { value: "text-justify", name: "justify" },
              { value: "text-nowrap", name: "no wrap" }
            ]
          },
          {
            type: "select-class",
            label: "Text",
            options: [
              { value: "", name: "none" },
              { value: "text-lowercase", name: "lowercase" },
              { value: "text-uppercase", name: "uppercase" },
              { value: "text-capitalize", name: "capitalize" }
            ]
          }
        ]
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

  domc.addType('list', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'List',
        droppable: true,
        traits: [
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
        ]
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