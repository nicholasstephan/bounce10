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
  let type = item?.type || "pdf";
  let file = item?.file || null;
  let url = item?.url || "";

  function close() {
    if(!item || thumbnail != item?.thumbnail) {
      remove(thumbnail);
    }
    if(!item || file != item?.file) {
      remove(file);
    }
    if(file && (item?.type != 'image' || item?.type != 'video')) {
      remove(file);
    }
    dispatch('close');
  }

  function saveItem() {
    const newItem = {
      title,
      subtitle,
      thumbnail,
      type,
      file,
      url
    };

    if(!item?.id) {
      newItem.dateCreated = (new Date()).toISOString();
    }

    dispatch('save', newItem);
  }

  function removeItem() {
    dispatch('remove', item);
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
      folder="library-thumbnails" 
      width={600}
      height={400}
      placeholder="Thumbnail" 
      bind:value={thumbnail}
    />

    <InputRadio 
      options={[
        {label: "Image", value: "image"},
        {label: "Video", value: "video"},
        {label: "PDF", value: "pdf"},
        {label: "Website", value: "website"},
        {label: "Vimeo", value: "vimeo"},
        {label: "Youtube", value: "youtube"},
      ]}
      bind:value={type}
    />

    {#if type == "image"}
      <InputImage 
        folder="library" 
        width={600}
        height={400}
        placeholder="Image" 
        bind:value={file}
      />
    {:else if type == "video"}
      <InputImage 
        folder="library" 
        width={600}
        height={400}
        placeholder="Video" 
        bind:value={file}
      />
    {:else if type == "pdf"}
      <InputImage 
        folder="library" 
        width={600}
        height={400}
        placeholder="PDF" 
        bind:value={file}
      />
    {:else if type == "website"}
      <Input placeholder="Website" bind:value={url}/>
    {:else if type == "vimeo"}
      <Input placeholder="Vimeo Link" bind:value={url}/>
    {:else if type == "youtube"}
      <Input placeholder="Youtube Link" bind:value={url}/>
    {/if}
  
    <nav>
      <Button on:click={saveItem}>Save</Button>
      <Button on:click={close} color="var(--grey-light)" textColor="var(--grey-dark)">
        Cancel
      </Button>
      <div style="flex:1"/>
      {#if item?.id}
        <Button on:click={removeItem} color="var(--grey-light)" textColor="var(--grey-dark)">Remove</Button>
      {/if}
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
    flex-direction: row;
    gap: 16px;
    margin: 16px 0 0 0;
  }


</style>