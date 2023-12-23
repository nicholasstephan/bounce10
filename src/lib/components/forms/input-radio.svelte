<script>
  export let value = "";
  export let options = [];
</script>

<div class="input">
  {#each options as option}
    <label class:active={value == option.value}>
      <input type="radio" bind:group={value} value={option.value}/>
      {option.label}
    </label>
  {/each}
</div>

<style>

  .input {
    display: inline-flex;
    box-sizing: border-box;
    padding: 0;
    border: 1px solid var(--grey);

    font-family: inherit;
    font-size: 14px;
    line-height: 16px;
    color: var(--grey-dark);

    transition: box-shadow 0.2s ease-in-out;
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    color: var(--grey);
  }

  :global(.input) + .input, 
  :global(input) + .input {
    margin-top: 16px;
  }

  .input:focus {
    box-shadow: 4px 4px 8px rgba(0,0,0,0.2);
  }
  
  label {
    padding: 18px 16px 14px;
    color: var(--grey);
    cursor: pointer;
  }

  label.active {
    color: var(--grey-dark);
    text-align: center;
    background-color: var(--grey-light);
  }

  label input {
    display: none;
  }


</style>