<script>
  
  export let href = "";
  export let loading = false;
  export let error = false;
  export let color = "var(--red)";
  export let textColor = "var(--grey-light)";

  $: tag = href ? "a" : "button";

</script>

<svelte:element
  this={tag}
  {href}
  on:click
  role="button"
  tabindex="0"
  class="button"
  class:loading={!!loading}
  class:error={!!error}
  style="--color: {color}; --text-color: {textColor};"
>
  <div class="content">
    <slot></slot>
  </div>
</svelte:element>


<style>

  .button {
    position: relative;
    appearance: none;
    display: inline-block;
    padding: 16px 24px;
    border: 0;
    border-radius: 4px;
    background-color: var(--color);
    color: var(--text-color);
    font-size: 14px;
    line-height: 16px;
    text-decoration: none;
    transition: box-shadow 0.2s ease-in-out;
  }

  @media (hover:hover) {
    .button {
      box-shadow: 0 0 0 rgba(0,0,0,0.2);
    }

    .button:hover {
      box-shadow: 4px 4px 8px rgba(0,0,0,0.2);
      cursor: pointer;
    }
  }

  .button:focus {
    outline: none;
    box-shadow: 4px 4px 8px rgba(0,0,0,0.2);
  }

  .button.loading .content {
    opacity: 0;
  }

  @keyframes shake {
    0% { transform: translateX(0); }
    10%, 60% { transform: translateX(-10px); }
    30%, 90% { transform: translateX(10px); }
    100% { transform: translateX(0); }
  }

  .button.error {
    animation: shake 400ms linear;
  }

</style>