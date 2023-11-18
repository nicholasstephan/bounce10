<script>
  import { Loading } from '$lib/components';
  import { page } from '$app/stores';

  $: message = $page.status == 404 ? "Oops! We couldn't find that page."
             : $page.error.message;

</script>

<div>
  <Loading {message}/>
</div>

<style>

  div {
    padding: 240px 0;
  }

</style>
