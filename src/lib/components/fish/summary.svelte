<script>

	import auth from '$lib/stores/auth';
	import { getActivity } from '$lib/stores/activities';

	import Splash from '$lib/components/fish/splash.svelte';
	import SummaryHeader from '$lib/components/fish/summary-header.svelte';
  import Button from '$lib/components/forms/button.svelte';

  $: activity = getActivity($auth.id, 'fish');
  $: progress = [
    $activity?.[0]?.f, 
    $activity?.[0]?.i, 
    $activity?.[0]?.s, 
    $activity?.[0]?.h
  ].filter(x => x).length / 4 * 100;

</script>

{#if !$activity?.length}

	<Splash/>

{:else}

	<div class="container">

		<SummaryHeader/>

    <div class="lists">
      <div class="list">
        <h3>Financial Capital</h3>
        <p class="value">
          {$activity[0].f}
        </p>
      </div>
      <div class="list">
        <h3>Intellectual Capital</h3>
        <p class="value">
          {$activity[0].i}
        </p>
      </div>
      <div class="list">
        <h3>Social Capital</h3>
        <p class="value">
          {$activity[0].s}
        </p>
      </div>
      <div class="list">
        <h3>Human Capital</h3>
        <p class="value">
          {$activity[0].h}
        </p>
      </div>
    </div>

    <div class="nav">
      <Button color="var(--fish-blue)" href="/profile/fish/overview">
          Continue ({progress}% complete)
      </Button>
    </div>

	</div>

{/if}


<style>

  .lists {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 32px;

    padding: 32px 40px;
    background-color: white;
  }

  .list {
    flex: 1;
  }

  .value {
    white-space: pre-wrap;
  }

  .nav {
    padding: 0 40px 40px;
    background: white;
  }


</style>