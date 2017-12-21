export default function(editor, config = {}) {
  const trm = editor.TraitManager;

  trm.addType('list-items', {
    events: {
      'keyup': 'onChange'
    },

    onValueChange: function() {
      this.target.view.render();
    },

    getInputEl: function() {
      if (!this.$input) {
        const model = this.model;
        const target = this.target;
        const name = model.get('name');

        this.$input = document.createElement('textarea');

        let val = model.get("value");

        if (model.get("changeProp")) {
          val = val || target.get(name);
        }

        if (val) {
          this.$input.value = val;
        }
      }
      return this.$input;
    }
  })
}