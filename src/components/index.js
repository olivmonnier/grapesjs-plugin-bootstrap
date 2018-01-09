import alert from './alert'
import basic from './basic'
import container from './container'
import dropdown from './dropdown'
import grid from './grid'
import label from './label'
import media from './media'
import panel from './panel'
import thumbnail from './thumbnail'
import well from './well'

export default (editor, config = {}) => {
  alert(editor, config)
  basic(editor, config)
  container(editor, config)
  dropdown(editor, config)
  grid(editor, config)
  label(editor, config)
  media(editor, config)
  panel(editor, config)
  thumbnail(editor, config)
  well(editor, config)
}
