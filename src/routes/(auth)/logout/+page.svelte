<script>
  import { logout } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
  import { Loading } from '$lib/components';
	import { onMount } from 'svelte';

  onMount(async () => {
    await logout();
    goto('/');
  });

</script>

<div>
  <Loading message="Logging you out..."/>
</div>

<style>

  div {
    padding: 240px 0;
  }

</style>
