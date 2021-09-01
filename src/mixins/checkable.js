const CheckableMixin = (superclass) =>
  class extends superclass {
    constructor(args) {
      super(args);
      const { checked } = args;
      this.checked = checked || false;
    }
    isChecked() {
      return this.checked;
    }
    check() {
      this.checked = true;
    }
    uncheck() {
      this.checked = false;
    }
    toggle() {
      this.checked = !this.checked;
    }
  };

export default CheckableMixin;
