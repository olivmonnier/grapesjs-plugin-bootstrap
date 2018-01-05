export default (editor, config = {}) => {
  const bm = editor.BlockManager
  const { blocks, category } = config
  const { layout } = category
  const addBlock = (name = '', attr = {}) => (blocks.indexOf(name) >= 0) ? bm.add(name, attr) : null

  // Container
  addBlock('container', {
    label: 'Container',
    category: layout,
    attributes: { class: 'fa fa-square-o' },
    content: {
      type: 'container',
      classes: ['container']
    }
  })

  // Row
  addBlock('row', {
    label: 'Row',
    category: layout,
    attributes: { class: 'fa fa-minus' },
    content: {
      type: 'row',
      classes: ['row']
    }
  })

  // Column
  addBlock('column', {
    label: 'Column',
    category: layout,
    attributes: { class: 'fa fa-columns' },
    content: {
      type: 'column',
      classes: ['col-md-12']
    }
  })

  // Columns 2
  addBlock('columns-2', {
    label: '2 Columns',
    category: layout,
    attributes: { class: 'fa fa-columns' },
    content: `
      <div class="row">
        <div class="col-md-6"></div>
        <div class="col-md-6"></div>
      </div>
    `
  })

  // Columns 3
  addBlock('columns-3', {
    label: '3 Columns',
    category: layout,
    attributes: { class: 'fa fa-columns' },
    content: `
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4"></div>
        <div class="col-md-4"></div>
      </div>
    `
  })

  // Columns 4
  addBlock('columns-4', {
    label: '4 Columns',
    category: layout,
    attributes: { class: 'fa fa-columns' },
    content: `
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-3"></div>
        <div class="col-md-3"></div>
        <div class="col-md-3"></div>
      </div>
    `
  })

  // Columns 4/8
  addBlock('columns-4-8', {
    label: '2 Columns 4/8',
    category: layout,
    attributes: { class: 'fa fa-columns' },
    content: `
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-8"></div>
      </div>
    `
  })

  // Columns 8/4
  addBlock('columns-8-4', {
    label: '2 Columns 8/4',
    category: layout,
    attributes: { class: 'fa fa-columns' },
    content: `
      <div class="row">
        <div class="col-md-8"></div>
        <div class="col-md-4"></div>
      </div>
    `
  })
}
