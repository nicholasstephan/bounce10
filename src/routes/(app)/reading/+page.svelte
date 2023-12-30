<script>
  
  import auth from '$lib/stores/auth';
	import firestore from 'fire-stream/firestore';

  import { Tab, Filter } from '$lib/components';
  import AddModal from '$lib/components/reading-list/form-modal.svelte';
  import Thumbnail from '$lib/components/reading-list/thumbnail.svelte';
  

  let isAdding = false;
  const toggleAdding = () => isAdding = !isAdding;

  function createItem(item) {
    firestore('reading-list').add(item);
    isAdding = false;
  }

  let sort = null;

  $: items = firestore({
    url: 'reading-list',
    orderBy: sort == "Date" ? "dateCreated" : "title",
    direction: sort == "Date" ? 'desc' : 'asc',
  });

</script>

<header>
  <h1>Reading List</h1>
</header>

<nav>

  <Filter placeholder="Sort..." options={["Date", "Title"]} bind:value={sort}/>

  {#if $auth?.permissions?.adminLibrary}
    <div class="spacer">|</div>
    <Tab on:click={toggleAdding}>
      Add Item
    </Tab>
  {/if}

</nav>

<div class="grid">

  {#each $items || [] as item}
    <Thumbnail {item}/>
  {/each}


</div>


{#if isAdding}
  <AddModal on:close={toggleAdding} on:save={e => createItem(e.detail)}/>
{/if}


<style>

  header {
    padding: 64px 0 32px;
  }

  h1 {
    color: var(--grey-dark);
    font-size: 16px;
    line-height: 24px;
    font-weight: normal;
    text-transform: uppercase;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 32px;
  }

  .spacer {
    color: var(--grey);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    grid-gap: 32px;
  }

</style>
