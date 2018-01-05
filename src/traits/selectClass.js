export default function (editor, config = {}) {
  const trm = editor.TraitManager

  trm.addType('select-class', {
    events: {
      'change': 'onChange'
    },

    onValueChange: function () {
      let classes = this.model.get('options').map(opt => opt.value)
      for (let i = 0; i < classes.length; i++) {
        if (classes[i].length > 0) {
          let classesN = classes[i].split(' ')
          for (let j = 0; j < classesN.length; j++) {
            if (classesN[j].length > 0) {
              this.target.removeClass(classesN[j])
            }
          }
        }
      }
      const value = this.model.get('value')
      if (value.length > 0 && value !== 'GJS_NO_CLASS') {
        const valueN = value.split(' ')
        for (let i = 0; i < valueN.length; i++) {
          this.target.addClass(valueN[i])
        }
      }
      this.target.em.trigger('change:selectedComponent')
    },

    getInputEl: function () {
      if (!this.inputEl) {
        const model = this.model
        const options = model.get('options') || []
        const input = document.createElement('select')
        const targetViewEl = this.target.view.el

        for (let i = 0; i < options.length; i++) {
          let name = options[i].name
          let value = options[i].value

          if (value === '') {
            value = 'GJS_NO_CLASS'
          }

          const option = document.createElement('option')
          option.text = name
          option.value = value

          if (targetViewEl.classList.contains(value)) {
            option.setAttribute('selected', 'selected')
          }
          input.append(option)
        }

        this.inputEl = input
      }
      return this.inputEl
    }
  })
}
