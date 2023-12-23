<script>
  import auth from '$lib/stores/auth';

  import { Button } from '$lib/components';
  import AddModal from '$lib/components/library/form-modal.svelte';
	import firestore from 'fire-stream/firestore';

  let isAdding = false;
  const toggleAdding = () => isAdding = !isAdding;

  function createItem(item) {
    firestore('library').add(item);
    isAdding = false;
  }

</script>

<header>
  <h1>Resource Library</h1>
</header>

<nav>

  {#if $auth?.permissions?.adminLibrary}
    <Button on:click={toggleAdding}>
      Add Item
    </Button>
  {/if}

</nav>


{#if isAdding}
  <AddModal on:close={toggleAdding} on:save={e => createItem(e.detail)}/>
{/if}


<style>

  header {
    padding: 64px 0 32px;
  }

  h1 {
    color: var(--grey-dark);
    font-size: 18px;
    line-height: 24px;
    font-weight: normal;
    text-transform: uppercase;
  }

</style>
