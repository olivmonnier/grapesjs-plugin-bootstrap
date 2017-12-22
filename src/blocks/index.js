import components from './components';
import layout from './layout';

export default (editor, config = {}) => {
  components(editor, config);
  layout(editor, config);
}