import alert from './alert'
import button from './button'
import blockquote from './blockquote'
import header from './header';
import basic from './basic'
import container from './container'
import component from './default'
import dropdown from './dropdown'
import grid from './grid'
import image from './image'
import label from './label'
import link from './link'
import media from './media'
import panel from './panel'
import table from './table'
import thumbnail from './thumbnail'
import text from './text'
import well from './well'

export default (editor, config = {}) => {
  component(editor, config)
  text(editor, config)
  image(editor, config)
  link(editor, config)
  header(editor, config)
  table(editor, config)
  blockquote(editor, config)
  button(editor, config)
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
