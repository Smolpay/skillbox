import BaseFormField from '@/components/BaseFormField';

export default {
  props: ['title', 'error', 'placeholder', 'value'],
  components: { BaseFormField },
  computed: {
    DataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
};
