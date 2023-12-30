<script>
  
  import { fade, fly } from 'svelte/transition';
  export let open = false;

  function close() {
    open = false;
  }

</script>


{#if open}
  <button class="overlay" on:click={close} transition:fade>
    <button class="body" on:click|stopPropagation transition:fly={{y:40}}>
      <slot></slot>
    </button>
  </button>
{/if}


<style>

  .overlay {
    appearance: none;
    
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 64px 16px;
    border: none;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    
    overflow: auto;
  }

  .body {
    appearance: none;
    position: relative;
    width: 100%;
    max-width: 600px;
    padding: 0;
    border: none;
    margin: 0;

    border-radius: 16px;
    overflow: hidden;

    text-align: left;

    background-color: white;
    box-shadow: 8px 8px 32px rgba(0,0,0,0.5);
  }

</style>