<script>
  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { remove } from '$lib/utils/storage';

  import { Button, Input, InputImage, InputRadio } from '$lib/components';
  
  const dispatch = createEventDispatcher();

  export let item = null;

  let title = item?.title || "";
  let subtitle = item?.subtitle || "";
  let thumbnail = item?.thumbnail || "";
  let url = item?.url || "";

  function close() {
    if(!item || thumbnail != item?.thumbnail) {
      remove(thumbnail);
    }
    dispatch('close');
  }

  function save() {
    const newItem = {
      dateCreated: (new Date()).toISOString(),
      title,
      subtitle,
      thumbnail,
      url
    }
    dispatch('save', newItem);
  }
</script>

<button class="overlay" on:click={close} transition:fade>
  <button class="form" on:click|stopPropagation transition:fly={{y:40}}>
    <header>
      <h3>
        {#if item}
          Edit Item
        {:else}
          Add Item
        {/if}
      </h3>
    </header>

    <Input placeholder="Title" bind:value={title}/>

    <Input placeholder="Subtitle" bind:value={subtitle}/>

    <InputImage 
      folder="reading-list-thumbnails" 
      width={400}
      height={600}
      placeholder="Thumbnail" 
      bind:value={thumbnail}
    />
    
    <Input placeholder="URL" bind:value={url}/>
  
    <nav>
      <Button on:click={save}>Save</Button>
      <Button on:click={close} color="var(--grey-light)" textColor="var(--grey-dark)">
        Cancel
      </Button>
    </nav>

  </button>
</button>


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

  .form {
    appearance: none;
    position: relative;
    width: 100%;
    max-width: 600px;
    padding: 32px;
    border: none;
    border-radius: 16px;

    text-align: left;

    background-color: white;
    box-shadow: 8px 8px 32px rgba(0,0,0,0.5);
  }

  nav {
    display: flex;
    flex-direction: row-reverse;
    gap: 16px;
    margin: 16px 0 0 0;
  }


</style>