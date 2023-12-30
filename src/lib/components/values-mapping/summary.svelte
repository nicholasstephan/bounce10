<script>

	import auth from '$lib/stores/auth';
	import { getActivity } from '$lib/stores/activities';

	import Splash from '$lib/components/values-mapping/splash.svelte';
	import SummaryHeader from '$lib/components/values-mapping/summary-header.svelte';
  import Button from '$lib/components/forms/button.svelte';

  $: activity = getActivity($auth.id, 'valuesmapping');
  $: words = $activity?.[0]?.words || [];

</script>

{#if !words.length}

	<Splash/>

{:else}

	<div class="container">

		<SummaryHeader/>

    <div class="list">
      {#each words as word}
        <p>{word}</p>
      {/each}
    </div>

    <div class="nav">
      <Button color="var(--values-mapping-red)" href="/profile/values-mapping/overview">
        Update
      </Button>
    </div>

	</div>

{/if}


<style>

  .list {
    columns: 3;
    gap: 32px;

    padding: 32px 40px;
    background-color: white;
  }

  .list p {
    padding: 0;
    margin: 0;

    font-size: 18px;
    line-height: 32px;
    font-weight: bold;
    color: var(--values-mapping-red);
  }

  .nav {
    padding: 0 40px 40px;
    background: white;
  }


</style>