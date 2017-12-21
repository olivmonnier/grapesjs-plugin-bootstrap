export default function(attr, classList) {
  const val = this.get(attr)
  const classes = this.get('classes');
  const sm = this.sm.get('SelectorManager');

  classes.forEach(element => {
    if (classList.includes(element.id)) {
      classes.remove(element);
    }
  })

  if (val && val !== '') {
    const class_obj = sm.add(val);
    classes.add(class_obj);
  }

  this.em.trigger("change:selectedComponent");
}