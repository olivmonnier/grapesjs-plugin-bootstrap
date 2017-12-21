export default (editor, config = {}) => {
  const bm = editor.BlockManager;
  const { blocks, category } = config;
  const { basic } = category;
  const addBlock = (name = '', attr = {}) => (blocks.indexOf(name) >= 0) ? bm.add(name, attr) : null;

  // Well
  addBlock('well', {
    label: 'Well',
    category: basic,
    content: `
      <div class="well"></div>
    `
  })
}