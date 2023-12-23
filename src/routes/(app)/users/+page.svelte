<script>
  
  import firestore from 'fire-stream/firestore';

  import User from '$lib/components/admin/user-listitem.svelte';

  let limit = 100;
  let users = firestore({url: '/users', limit});

  // todo: lazy loading




</script>

<header>
  <h1>Admin. Users</h1>
</header>

<nav>

</nav>


<h3>
  <div>User Name</div>
  <div>Email</div>
  <div>Children</div>
</h3>
{#each $users || [] as user (user.id)}
  <User {user} />
{/each}




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

  h3 {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;

    padding: 0px 16px;
    margin: 0 0 8px;

    font-size: 14px;
    line-height: 16px;
    color: var(--grey);
    font-weight: normal;
  }

  

</style>
