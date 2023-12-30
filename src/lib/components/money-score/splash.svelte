<script>
  import Button from '$lib/components/forms/button.svelte';
</script>


<div class="splash">
  <img src="/img/money-score.svg" alt="Money Score"/>

  <div class="info">
    <p>
      MoneyScore is like measuring your 
      maximum bench press before you start a 
      new workout regimen. You'll want to know
      where you started so you can celebrate your
      growth along the way.
    </p>
    <Button color="#fff" textColor="#333" href="/profile/money-score">START</Button>
  </div>
</div>


<style>

	.splash {
		display: flex;
		align-items: center;
		gap: 64px;
		padding: 80px;
		border-radius: 8px;
		background-color: var(--money-score-green);
	}

	.splash img {
		width: 240px;
	}

	.splash p {
		max-width: 600px;
		font-size: 28px;
		line-height: 32px;
		color: white;
	}

</style>