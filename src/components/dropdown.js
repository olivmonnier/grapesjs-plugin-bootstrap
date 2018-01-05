export default (editor, config = {}) => {
  const domc = editor.DomComponents
  const defaultType = domc.getType('default')
  const defaultModel = defaultType.model
  const defaultView = defaultType.view
  const textType = domc.getType('text')
  const textModel = textType.model
  const textView = textType.view
  const linkType = domc.getType('link')
  const linkModel = linkType.model
  const listItemType = domc.getType('list-item')
  const listItemModel = listItemType.model
  const listItemView = listItemType.view

  domc.addType('dropdown', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'Dropdown',
        droppable: 'a, button, .dropdown-menu',
        traits: defaultModel.prototype.defaults.traits.concat([
          {
            type: 'select-class',
            label: 'State',
            options: [
              { value: '', name: 'Closed' },
              { value: 'open', name: 'Open' }
            ]
          }
        ])
      })
    }, {
      isComponent (el) {
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
            type: 'checkbox',
            name: 'aria-haspopup',
            label: 'Popup'
          },
          {
            type: 'checkbox',
            name: 'aria-expanded',
            label: 'Expanded'
          },
          {
            type: 'select',
            label: 'Type',
            name: 'tagName',
            options: [
              { value: 'button', name: 'Button' },
              { value: 'a', name: 'Link' }
            ],
            changeProp: 1
          }
        ]
      }),
      init () {
        this.listenTo(this, 'change:tagName', this.changeTag)
      },
      changeTag (el) {
        const attrs = this.get('attributes')
        const traits = this.get('traits')
        const traitsToKeep = ['tagName', 'aria-haspopup', 'aria-expanded']

        traits.models = traits.models.filter(model => traitsToKeep.indexOf(model.get('name')) >= 0)

        if (this.get('tagName') === 'a') {
          traits.add(linkModel.prototype.defaults.traits)
        } else {
          if (attrs.href) delete attrs.href
        }

        this.set('attributes', Object.assign({}, attrs))
        this.sm.trigger('change:selectedComponent')
      }
    }, {
      isComponent (el) {
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
        draggable: '.dropdown, .btn-group',
        droppable: 'li'
      })
    }, {
      isComponent (el) {
        if (el && el.classList && el.classList.contains('dropdown-menu')) {
          return { type: 'dropdown-menu' }
        }
      }
    }),
    view: defaultView
  })

  domc.addType('dropdown-item', {
    model: listItemModel.extend({
      defaults: Object.assign({}, listItemModel.prototype.defaults, {
        'custom-name': 'Dropdown Item',
        draggable: '.dropdown-menu'
      })
    }, {
      isComponent (el) {
        const parent = el.parentNode
        if (parent && parent.classList && parent.classList.contains('dropdown-menu')) {
          return { type: 'dropdown-item' }
        }
      }
    }),
    view: listItemView
  })
}
