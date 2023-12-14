<script>
  import { getMyChildren } from '$lib/stores/children';

  import Card from '$lib/components/activities/money-score-status.svelte';

  $: children = getMyChildren();
</script>

{#each $children || [] as child (child.id)}
  <div class="child">
    <Card {child}/>
  </div>
{/each}