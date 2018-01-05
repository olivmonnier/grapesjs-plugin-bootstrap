import basics from './basics'
import components from './components'
import layout from './layout'

export default (editor, config = {}) => {
  basics(editor, config)
  components(editor, config)
  layout(editor, config)
}
