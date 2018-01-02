export default function(editor, config = {}) {
  const trm = editor.TraitManager;

  trm.addType('select-class', {
    events: {
      'change': 'onChange'
    },

    onValueChange: function() {
      let classes = this.model.get('options').map(opt => opt.value);
      for(let i = 0; i < classes.length; i++) {
        if(classes[i].length > 0) {
          let classes_i_a = classes[i].split(' ');
          for(let j = 0; j < classes_i_a.length; j++) {
            if(classes_i_a[j].length > 0) {
              this.target.removeClass(classes_i_a[j]);
            }
          }
        }
      }
      const value = this.model.get('value');
      if(value.length > 0 && value != 'GJS_NO_CLASS') {
        const value_a = value.split(' ');
        for(let i = 0; i < value_a.length; i++) {
          this.target.addClass(value_a[i]);
        }
      }
      this.target.em.trigger('change:selectedComponent');
    },

    getInputEl: function() {
      if (!this.inputEl) {
        const model = this.model;
        const options = model.get("options") || [];
        const input = document.createElement("select");
        const target = this.target;
        const target_view_el = this.target.view.el;

        for (let i = 0; i < options.length; i++) {
          let name = options[i].name;
          let value = options[i].value;

          if (value == "") {
            value = "GJS_NO_CLASS";
          } 

          const option = document.createElement("option");
          option.text = name;
          option.value = value;

          if(target_view_el.classList.contains(value)) {
            option.setAttribute("selected", "selected");
          }
          input.append(option);
        }

        this.inputEl = input;
      }
      return this.inputEl;
    }
  })
}