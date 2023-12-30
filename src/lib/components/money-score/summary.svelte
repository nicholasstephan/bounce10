<script>

	import auth from '$lib/stores/auth';
	import { getActivity } from '$lib/stores/activities';
	import { getMyChildren } from '$lib/stores/children';

	import Splash from '$lib/components/money-score/splash.svelte';
	import SummaryHeader from '$lib/components/money-score/summary-header.svelte';
	import Score from '$lib/components/money-score/score.svelte';

	$: activity = getActivity($auth.id, 'moneyscore');
	$: children = getMyChildren();

</script>

{#if !$activity?.length}

	<Splash/>

{:else}

	<div class="container">

		<SummaryHeader/>

		<div class="scores">
			{#each $children as child}
				<div class="score">
					<Score {child}/>
				</div>
			{/each}
		</div>

	</div>

{/if}


<style>

	.scores {
		padding: 32px 0;
		background-color: white;
	}

	.score {
		padding: 0 0 32px; 
	}

</style>