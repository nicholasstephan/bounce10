<script>

  import { page } from '$app/stores';
  import firestore from 'fire-stream/firestore';

  $: userId = $page.params.userId;
  $: user = firestore(`/users/${userId}`);
  $: children = firestore({
    url: 'children',
    where: [
      ['parents', 'array-contains', userId]
    ]
  });

</script>


{#if $user}

  <header>
    <h1>{$user?.name || ""}</h1>
  </header>

  <h3>Permissions</h3>

  <div class="permissions">
    <label class="permission">
      <input type="checkbox" class="checkbox" bind:checked={$user.permissions.adminUsers} />
      <div>
        <h4>Admin. Users</h4>
        <p>Can view and edit all users</p>
      </div>
    </label>

    <label class="permission">
      <input type="checkbox" class="checkbox" bind:checked={$user.permissions.adminLibrary} />
      <div>
        <h4>Admin. Library</h4>
        <p>Can view and edit library</p>
      </div>
    </label>

    <label class="permission">
      <input type="checkbox" class="checkbox" bind:checked={$user.permissions.manageChildren} />
      <div>
        <h4>Manage Children</h4>
        <p>Can manage children</p>
      </div>
    </label>
  </div>

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

  .permissions {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }

  .permission {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16px;
  }

  .permission .checkbox {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-right: 16px;
  }

  .permission h4 {
    padding: 0;
    margin: 0;
  }

  .permission p {
    padding: 0;
    margin: 0;
    color: var(--grey);
    font-size: 14px;
    line-height: 16px;
  }



</style>