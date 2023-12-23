<script>
  export let value = "";
  export let placeholder = "";
</script>

<input bind:value={value} {placeholder}/>

<style>

  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    padding: 18px 16px 14px;
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

  input :global(+ input),
  input :global(+ .input),
  :global(.input) + input {
    margin-top: 16px;
  }

  input:focus {
    box-shadow: 4px 4px 8px rgba(0,0,0,0.2);
  }

</style>