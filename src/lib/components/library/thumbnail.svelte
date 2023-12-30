<script>
  import auth from '$lib/stores/auth';
  import { url } from '$lib/utils/storage';
  import firestore from 'fire-stream/firestore';
  import { remove } from '$lib/utils/storage';

  import FormModal from '$lib/components/library/form-modal.svelte';
  import { Tab } from '$lib/components';

  export let item;

  let isEditing = false;
  const toggleEditing = () => isEditing = !isEditing;

  function saveItem(update) {
    console.log('saving', `library/${item.id}`, update)
    firestore(`library/${item.id}`).update(update);
    isEditing = false;
  }

  function removeItem() {
    isEditing = false;
    if(item.thumbnail) {
      remove(item.thumbnail);
    }
    if(item.file) {
      remove(item.file);
    }
    firestore(`library/${item.id}`).remove();
  }

</script>

{#if item.type === 'vimeo'}
  <a href={item.url} target="_blank">
    <img src={url(item.thumbnail, {width:600, height:400})} alt={item.title}/>
    <h3>{item.title}</h3>
    <h4>{item.subtitle}</h4>
    {#if $auth?.permissions?.adminLibrary}
      <button class="actions" on:click|stopPropagation|preventDefault>
        <Tab on:click={toggleEditing}>Edit</Tab>
      </button>
    {/if}
  </a>
{:else if item.type === 'youtube'}
  <a href={item.url} target="_blank">
    <img src={url(item.thumbnail, {width:600, height:400})} alt={item.title}/>
    <h3>{item.title}</h3>
    <h4>{item.subtitle}</h4>
    {#if $auth?.permissions?.adminLibrary}
      <button class="actions" on:click|stopPropagation|preventDefault>
        <Tab on:click={toggleEditing}>Edit</Tab>
      </button>
    {/if}
  </a>
{:else if item.type === 'image'}
  <div>
    <img src={url(item.thumbnail, {width:600, height:400})} alt={item.title}/>
    <h3>{item.title}</h3>
    <h4>{item.subtitle}</h4>
    {#if $auth?.permissions?.adminLibrary}
      <button class="actions" on:click|stopPropagation|preventDefault>
        <Tab on:click={toggleEditing}>Edit</Tab>
      </button>
    {/if}
  </div>
{:else if item.type === 'pdf'}
  <div>
    <img src={url(item.thumbnail, {width:600, height:400})} alt={item.title}/>
    <h3>{item.title}</h3>
    <h4>{item.subtitle}</h4>
    {#if $auth?.permissions?.adminLibrary}
      <button class="actions" on:click|stopPropagation|preventDefault>
        <Tab on:click={toggleEditing}>Edit</Tab>
      </button>
    {/if}
  </div>
{:else if item.type === 'website'}
  <a href={item.url.startsWith('http') ? item.url : `https://${item.url}`} target="_blank">
    <img src={url(item.thumbnail, {width:600, height:400})} alt={item.title}/>
    <h3>{item.title}</h3>
    <h4>{item.subtitle}</h4>
    {#if $auth?.permissions?.adminLibrary}
      <button class="actions" on:click|stopPropagation|preventDefault>
        <Tab on:click={toggleEditing}>Edit</Tab>
      </button>
    {/if}
  </a>
{/if}

{#if isEditing}
  <FormModal 
    on:close={toggleEditing} {item} 
    on:save={e => saveItem(e.detail)}
    on:remove={e => removeItem()}
  />
{/if}


<style>

  a {
    position: relative;
    color: var(--grey-dark);
  }

  img {
    width: 100%;
    aspect-ratio: 6 / 4;
    border-radius: 16px;
  }

  h3 {
    padding: 0 0 0 2px;
    margin: 0;
    font-size: 18px;
    line-height: 24px;
    font-weight: normal;
  }

  h4 {
    padding: 0 0 0 2px;
    margin: 0;
    font-size: 16px;
    line-height: 24px;
    font-weight: normal;
  }

  .actions {
    appearance: none;
    padding: 0;
    border: 0;
    background: none;

    position: absolute;
    top: 0;
    right: 0;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

</style>
