export default (editor, config = {}) => {
  const bm = editor.BlockManager
  const { blocks, category } = config
  const { components } = category
  const addBlock = (name = '', attr = {}) => (blocks.indexOf(name) >= 0) ? bm.add(name, attr) : null

  addBlock('alert', {
    label: 'Alert',
    category: components,
    attributes: { class: 'fa fa-exclamation-triangle' },
    content: `
      <div class="alert alert-success" role="alert">
        <strong>Well done!</strong> You successfully read this important alert message.
      </div>
    `
  })

  // Dropdown
  addBlock('dropdown', {
    label: 'Dropdown',
    category: components,
    attributes: { class: 'fa fa-caret-square-o-down' },
    content: `
      <div class="dropdown">
        <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span> Dropdown </span>
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu">
          <li><a href="#">Item 1</a></li>
          <li><a href="#">Item 2</a></li>
          <li><a href="#">Item 3</a></li>
        </ul>
      </div>
    `
  })

  // Media
  addBlock('media', {
    label: 'Media',
    category: components,
    content: `
      <div class="media">
        <div class="media-left media-top">
          <a href="#">
            <img class="media-object" src="https://dummyimage.com/450x250/999/222" alt="..."/>
          </a>
        </div>
        <div class="media-body">
          <h4 class="media-heading">Top aligned media</h4>
          <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
        </div>
      </div>
    `
  })

  // Panel
  addBlock('panel', {
    label: 'Panel',
    category: components,
    attributes: { class: 'fa fa-window-maximize' },
    content: `
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">Heading</h3>
        </div>
        <div class="panel-body">
          <p>Content</p>
        </div>
        <div class="panel-footer">
          <p>Footer</p>
        </div>
      </div>
    `
  })

  // Thumbnail
  addBlock('thumbnail', {
    label: 'Thumbnail',
    category: components,
    content: `
      <div class="thumbnail">
        <img src="https://dummyimage.com/450x250/999/222" alt=""/>
        <div class="caption">
          <h3>Thumbnail label</h3>
          <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
          <p><a href="#" class="btn btn-primary" role="button">Button</a></p>
        </div>
      </div>
    `
  })

  // Well
  addBlock('well', {
    label: 'Well',
    category: components,
    attributes: { class: 'fa fa-square' },
    content: `
      <div class="well">
        <p>Content</p>
      </div>
    `
  })
}
