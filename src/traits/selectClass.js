export default function(editor, config = {}) {
  const trm = editor.TraitManager;

  trm.addType('select-class', {
    events: {
      'change': 'onChange'
    },

    onValueChange: function() {
      const model = this.model;
      const target = this.target;
      const val = model.get('value');
      const classList = model.get('options').map(opt => opt.value || opt);
      const classes = target.get('classes');
      const sm = target.sm.get('SelectorManager');

      classes.forEach(element => {
        if (classList.includes(element.id)) {
          classes.remove(element);
        }
      })

      if (val && val !== '') {
        const class_obj = sm.add(val);
        classes.add(class_obj);
      }
      target.em.trigger("change:selectedComponent");
    },

    getInputEl: function() {
      if (!this.$input) {
        const model = this.model;
        const opts = model.get('options') || [];
        this.$input = document.createElement('select');

        if (opts.length) {
          opts.forEach(opt => {
            const $opt = document.createElement('option');

            $opt.setAttribute('value', opt.value || opt);
            $opt.textContent = opt.name || opt;

            this.$input.append($opt)
          })
        }

        let val = model.get('value');
        const target = this.target;
        const name = model.get('name');

        if (model.get('changeProp')) {
          val = val || target.get(name);
        } else {
          const attrs = target.get('attributes');
          val = attrs[name];
        }

        if (val) {
          this.$input.value = val;
        }
      }

      return this.$input;
    }
  })
}