<script>
  import auth from '$lib/stores/auth';
  import { Loading } from '$lib/components';

  import NextSteps from '$lib/components/activities/next-steps.svelte';
  import MoneyScore from '$lib/components/activities/money-score.svelte';
	import firestore from 'fire-stream/firestore';

  $: children = firestore({
    url: 'children',
    where: [
      ['parents', 'array-contains', $auth?.id]
    ]
  });

</script>

<header>
  <h1>Welcome {$auth?.name || ""}!</h1>
  <p>
    Fill in the top part and then go over the list below with your 
    little one. Click off as many interests as you want! We want to 
    know what lights up your child, what brings them out of their shell, 
    and most of all, what they find FUN.
  </p>
</header>

<section>
  <NextSteps/>
</section>

<section>
  <h3>Our Children</h3>

  {#each $children || [] as child (child.id)}
    <div class="money-score">
      <MoneyScore childId={child.id}/>
    </div>
  {/each}
</section>

<style>
  header {
    padding: 64px 0 32px;
  }

  header p {
    max-width: 600px;
  }

  section {
    margin: 0 0 32px 0;
  }

  .money-score {
    margin: 0 0 32px 0;
  }

</style>
