<script>
  
  import { page } from '$app/stores';

  export let href = "";
  export let color = 'var(--red)';
  export let active = null;

  $: isActive = active === null ? $page.url.pathname.includes(href) : active;
  $: tag = href ? "a" : "button";

</script>

<svelte:element
  this={tag}
  {href}
  on:click
  role="button"
  tabindex="0"
  class="button"
  class:active={isActive}
  style="--color:{color}"
  data-sveltekit-noscroll
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
    padding: 8px 16px;
    border: 0;
    border-radius: 4px;
    background-color: var(--grey-light);
    color: var(--grey-dark);
    font-size: 14px;
    line-height: 16px;
    text-decoration: none;
    transition: box-shadow 0.2s ease-in-out;
  }

  @media (hover:hover) {
    .button:hover {
      box-shadow: 4px 4px 8px rgba(0,0,0,0.2);
      cursor: pointer;
    }
  }

  .button:focus {
    outline: none;
  }

  .button.active {
    background-color: var(--color);
    color: white;
  }

</style>