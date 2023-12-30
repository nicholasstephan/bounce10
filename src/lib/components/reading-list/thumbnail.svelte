<script>
  import auth from '$lib/stores/auth';
  import { url } from '$lib/utils/storage';
  import firestore from 'fire-stream/firestore';
  import { remove } from '$lib/utils/storage';

  import FormModal from '$lib/components/reading-list/form-modal.svelte';
  import { Tab } from '$lib/components';

  export let item;

  let isEditing = false;
  const toggleEditing = () => isEditing = !isEditing;

  function saveItem(update) {
    console.log('saving', `reading-list/${item.id}`, update)
    firestore(`reading-list/${item.id}`).update(update);
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
    firestore(`reading-list/${item.id}`).remove();
  }

</script>

<a href={item.url.startsWith('http') ? item.url : `https://${item.url}`} target="_blank">
  <img src={url(item.thumbnail, {width:400, height:600})} alt={item.title}/>
  <h3>{item.title}</h3>
  <h4>{item.subtitle}</h4>
  {#if $auth?.permissions?.adminLibrary}
    <button class="actions" on:click|stopPropagation|preventDefault>
      <Tab on:click={toggleEditing}>Edit</Tab>
    </button>
  {/if}
</a>

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
    aspect-ratio: 4 / 6;
    border-radius: 4px;
    box-shadow: 4px 4px 8px rgba(0,0,0,0.2);
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
