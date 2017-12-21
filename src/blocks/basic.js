export default (editor, config = {}) => {
  const bm = editor.BlockManager;
  const { blocks, category } = config;
  const { basic } = category;
  const addBlock = (name = '', attr = {}) => (blocks.indexOf(name) >= 0) ? bm.add(name, attr) : null;

  // Panel
  addBlock('panel', {
    label: 'Panel',
    category: basic,
    content: `
      <div class="panel panel-default">
        <div class="panel-heading" data-gjs-draggable=".panel" data-gjs-custom-name="PanelHeading">
          <h3 class="panel-title">Heading</h3>
        </div>
        <div class="panel-body" data-gjs-draggable=".panel" data-gjs-custom-name="PanelBody">
          <p>Content</p>
        </div>
        <div class="panel-footer" data-gjs-draggable=".panel" data-gjs-custom-name="PanelFooter">
          <p>Footer</p>
        </div>
      </div>
    `
  })
  // Well
  addBlock('well', {
    label: 'Well',
    category: basic,
    content: `
      <div class="well">
        <p>Content</p>
      </div>
    `
  })
}