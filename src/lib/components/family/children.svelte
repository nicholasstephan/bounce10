<script>
  import firestore from 'fire-stream/firestore';
  import auth from '$lib/stores/auth';
  import { url } from '$lib/utils/storage';

  let loading = false;

  $: children = firestore({
    url: '/children',
    where: [['parents', 'array-contains', $auth?.id]],
  });

  async function addChild() {
    if(loading) {
      return;
    }
    loading = true;

    let doc = await firestore('children').add({
      parents: [$auth?.id],
      status: "ACTIVE"
    });
  }

</script>

{#if $children?.length == 0}

  <button on:click={addChild} class="new-button">
    <i class="fa-thin fa-plus"></i>
  </button>

{:else if $children?.length > 0}

  <div class="children">
    {#each $children as child}
      <a class="child" href="/signup/family/{child.id}/info">
        <img src="{url(child.avatar)}" alt="" class="avatar"/>
        <p class="name">{child.name || ""}</p>
      </a>
    {/each}
    <button on:click={addChild} class="new-button">
      <i class="fa-thin fa-plus"></i>
    </button>
  </div>

{/if}


<style>


  .new-button {
    appearance: none;
    border: none;
    background: none;

    width: 300px;
    height: 300px;
    font-size: 120px;
    color: var(--grey);
    cursor: pointer;
  }

  @media (hover:hover) {
    .new-button:hover {
      color: var(--red);
    }
  }

  .children {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (min-width: 600px) {
    .children {
      grid-template-columns: 1fr 1fr;
    }
  }

  .child {
    display: flex; 
    flex-direction: column;
    align-items: center;
    text-decoration: none;
  }

  .child img {
    width: 320px;
    height: 320px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center center;
    margin: 0 0 16px 0;
    background-color: var(--grey-light);
  }

  .child .name {
    padding: 0;
    margin: 0;
    font-size: 32px;
    color: var(--grey-dark);
  }
  
</style>