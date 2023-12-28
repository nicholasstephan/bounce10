<script>
  import { Loading, Button } from '$lib/components';
  import Children from '$lib/components/family/children.svelte';
</script>

<header>
  <h1>Account</h1>
</header>

<nav>
  <Button href="/logout">Log out</Button>
</nav>

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
