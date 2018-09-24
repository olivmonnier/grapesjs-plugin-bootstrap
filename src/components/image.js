import { capitalize } from '../utils'

export default (editor, config = {}) => {
  const domc = editor.DomComponents
  const defaultType = domc.getType('default')
  const imgType = domc.getType('image')
  const imgModel = imgType.model
  const imgView = imgType.view
  const { imgShapes } = config

  domc.addType('image', {
    model: imgModel.extend({
      defaults: Object.assign({}, imgModel.prototype.defaults, {
        attributes: {
          src: 'https://dummyimage.com/450x250/999/222'
        },
        traits: [].concat(
          defaultType.model.prototype.defaults.traits, 
          imgModel.prototype.defaults.traits, 
          [
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
        ])
      })
    }),
    view: imgView
  })
}