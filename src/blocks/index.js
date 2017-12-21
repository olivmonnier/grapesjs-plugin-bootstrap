import basic from './basic';
import layout from './layout';

export default (editor, config = {}) => {
  basic(editor, config);
  layout(editor, config);
}