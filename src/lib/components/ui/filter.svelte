<script>
  
  import FilterOption from './filter-option.svelte';

  export let placeholder = "Filter...";
  export let options = [];
  export let value = null;

</script>

<select {placeholder} on:change={event => value = event.target.value}>
  <option value={null} default>{placeholder}</option>
  {#each options as option}
    <FilterOption {option} active={value}/>
  {/each}
</select>


<style>

  select {
    position: relative;
    appearance: none;
    display: inline-block;
    padding: 8px 16px;
    border: 1px solid var(--grey);
    border-radius: 4px;
    background-color: var(--grey-light);
    color: var(--grey-dark);
    font-size: 14px;
    line-height: 16px;
    text-decoration: none;
    transition: box-shadow 0.2s ease-in-out;
  }

  @media (hover:hover) {
    select:hover {
      box-shadow: 4px 4px 8px rgba(0,0,0,0.2);
      cursor: pointer;
    }
  }

  select:focus {
    outline: none;
  }

</style>