export default (editor, config = {}) => {
  const bm = editor.BlockManager
  const { blocks, category } = config
  const { basics } = category
  const addBlock = (name = '', attr = {}) => (blocks.indexOf(name) >= 0) ? bm.add(name, attr) : null

  // Address
  addBlock('address', {
    label: 'Address',
    category: basics,
    attributes: { class: 'fa fa-location-arrow' },
    content: `
      <address>
        <strong>Twitter, Inc.</strong><br>
        1355 Market Street, Suite 900<br>
        San Francisco, CA 94103<br>
        Phone: (123) 456-7890
      </address>
    `
  })

  addBlock('blockquote', {
    label: 'Blockquote',
    category: basics,
    attributes: { class: 'fa fa-quote-left' },
    content: `
      <blockquote>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
        <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
      </blockquote>
    `
  })

  // Button
  addBlock('button', {
    label: 'Button',
    category: basics,
    attributes: { class: 'fa fa-link' },
    content: {
      type: 'button',
      content: 'Button'
    }
  })

  // Header
  addBlock('header', {
    label: 'Header',
    category: basics,
    attributes: { class: 'fa fa-header' },
    content: {
      type: 'header',
      content: 'Insert your header text here'
    }
  })

  addBlock('image', {
    label: 'Image',
    category: basics,
    attributes: { class: 'fa fa-picture-o' },
    content: {
      type: 'image'
    }
  })

  addBlock('link', {
    label: 'Link',
    category: basics,
    attributes: { class: 'fa fa-link' },
    content: {
      type: 'link',
      content: 'Link'
    }
  })

  addBlock('list', {
    label: 'List',
    category: basics,
    attributes: { class: 'fa fa-list' },
    content: `
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    `
  })

  addBlock('paragraph', {
    label: 'Paragraph',
    category: basics,
    attributes: { class: 'fa fa-align-left' },
    content: {
      type: 'paragraph',
      content:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
    }
  })
}
