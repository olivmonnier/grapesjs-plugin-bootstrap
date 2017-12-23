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
        let md = this.model;
        let opts = md.get("options") || [];
        let input = document.createElement("select");
        let target = this.target;
        let target_view_el = this.target.view.el;
        for (let i = 0; i < opts.length; i++) {
          let name = opts[i].name;
          let value = opts[i].value;
          if (value == "") {
            value = "GJS_NO_CLASS";
          } // 'GJS_NO_CLASS' represents no class--empty string does not trigger value change
          let option = document.createElement("option");
          option.text = name;
          option.value = value;
          const value_a = value.split(" ");
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