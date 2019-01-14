import { capitalize } from '../utils'

export default (editor, config = {}) => {
  const domc = editor.DomComponents
  const linkType = domc.getType('link')
  const linkModel = linkType.model
  const linkView = linkType.view
  const { contexts, sizes } = config

  domc.addType('button', {
    model: linkModel.extend({
      defaults: Object.assign({}, linkModel.prototype.defaults, {
        name: 'Button',
        tagName: 'button',
        classes: ['btn'],
        traits: linkModel.prototype.defaults.traits.concat([
          {
            type: 'select',
            label: 'With link',
            name: 'tagName',
            options: [
              { value: 'button', name: 'No'},
              { value: 'a', name: 'Yes' }
            ],
            changeProp: 1
          },
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
      }),
      tagUpdated() { 
        const trt = new Traits([], this.opt);
        const tagName = this.get('tagName')
        const traits = this.get('traits')

        trt.setTarget(this);
        
        if (tagName === 'button') {
          const traitsFiltered = traits.filter(trait => trait.get('name') !== 'href')

          this.set('traits', traitsFiltered)
        } else {
          trt.add(['href'])
        }
        
        linkModel.prototype.tagUpdated.apply(this, arguments)
      }
    }, {
      isComponent (el) {
        if (el && el.classList && el.classList.contains('btn')) {
          return { type: 'button' }
        }
      }
    }),
    view: linkView
  })
}