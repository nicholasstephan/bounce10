<script>

  import { page } from '$app/stores';
	import firestore from 'fire-stream/firestore';
  import { Card, Input, InputDate, Button } from '$lib/components';

  $: childId = $page.params.childId;
  $: child = firestore(`children/${childId}`);

</script>

<Card>
  <h2>Tell us a bit about who your are</h2>
  {#if $child}
    <Input placeholder="Name" bind:value={$child.name}/>
    <InputDate placeholder="DOB" bind:value={$child.dob}/>
  {:else}
    <Input placeholder="Name" disabled/>
    <InputDate placeholder="DOB" disabled/>
  {/if}
  <nav>
    <Button href="likes">Continue</Button>
  </nav>
</Card>


<style>
  nav {
    margin: 16px 0 0 0;
  }
</style>