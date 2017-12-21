import listItems from './listItems';
import selectClass from './selectClass';

export default function(editor, config = {}) {
  listItems(editor, config)
  selectClass(editor, config);
}