import panel from './panel';
import well from './well';

export default (editor, config = {}) => {
  panel(editor, config);
  well(editor, config);
}