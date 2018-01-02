import container from './container';
import dropdown from './dropdown';
import grid from './grid';
import panel from './panel';
import well from './well';

export default (editor, config = {}) => {
  container(editor, config);
  dropdown(editor, config);
  grid(editor, config);
  panel(editor, config);
  well(editor, config);
}