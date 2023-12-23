<script>
  import firestore from 'fire-stream/firestore';
  import { url } from '$lib/utils/storage';

  export let user;

  $: children = firestore({
    url: 'children',
    where: [
      ['parents', 'array-contains', user.id]
    ]
  });

</script>

<a href="/users/{user.id}" class="user">
  <div class="name">{user.name}</div>
  <div class="email">{user.email}</div>
  <div class="children">
    {#each $children || [] as child (child.id)}
      <img src="{url(child.avatar, {width:80, height:80})}" alt="" class="avatar"/>
    {/each}
  </div>
</a>

<style>
  .user {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    align-items: center;
    padding: 0px 16px;
    margin: 0;

    text-align: left;
    font-weight: normal;
    font-size: 16px;
    line-height: 48px;
    text-decoration: none;
    color: var(--grey-dark);
    
    transition: box-shadow 0.2s ease-in-out;
    cursor: pointer;
  }

  .user:nth-child(odd) {
    background: rgba(0,0,0,0.05);
  }

  .user:nth-child(even) {
    background: rgba(0,0,0,0.02);
  }

  .user:hover {
    box-shadow: 4px 4px 8px rgba(0,0,0,0.2);
  }

  .email {
    color: var(--grey);
  }

  .children {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-right: 4px;
  }


</style>