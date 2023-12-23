<script>
  import auth from '$lib/stores/auth';
  import { Loading } from '$lib/components';
</script>


{#if !$auth?.permissions?.adminUsers}

  <div>
    <Loading message="You do not have permission to access this page."/>
  </div>

{:else}

  <slot></slot>

{/if}

<style>

  div {
    padding: 240px 0;
  }

</style>