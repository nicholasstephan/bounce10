<script>
  export let active = null;
  export let option;

  $: value = typeof option == 'string' ? option : option.value;
  $: label = typeof option == 'string' ? option : option.label;

</script>

<option value={value} selected={value == active}>{label}</option>