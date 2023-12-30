<script>
  import MoneyScore from '$lib/components/money-score/summary.svelte';
  import FISH from '$lib/components/fish/summary.svelte';
  import ValuesMapping from '$lib/components/values-mapping/summary.svelte';
</script>

<header>
  <h1>My Family Profile</h1>
  <p>
    Get started with the data gathering portion, then move on 
    to any of the three assessments: FISH, MoneyScore, 
    or Value Mapping.
  </p>
</header>

<section>
  <MoneyScore/>
</section>

<section>
  <FISH/>
</section>

<section>
  <ValuesMapping/>
</section>


<style>
  header {
    padding: 128px 0 32px;
  }

  header p {
    max-width: 600px;
  }

  section {
    margin: 0 0 32px 0;
  }

</style>
