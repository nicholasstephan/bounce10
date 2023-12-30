<script>

  import { Button } from '$lib/components';

</script>


<section>
  <h2>Complete your Family Profile</h2>
  <p>Get started with the data gathering portion, then move on to any of the three assessments: FISH, MoneyScore, or Values Mapping.</p>

  <div class="activities">
    <div class="fish activity">
      <img src="/img/fish.svg" alt="Money Score"/>
      <Button color="rgba(255,255,255,0.2)" href="/profile/fish">Start</Button>
    </div>
    <div class="values-mapping activity">
      <img src="/img/values-mapping.svg" alt="Money Score"/>
      <Button color="rgba(255,255,255,0.2)" href="/profile/values-mapping">Start</Button>
    </div>
    <div class="money-score activity">
      <img src="/img/money-score.svg" alt="Money Score"/>
      <Button color="rgba(255,255,255,0.2)" href="/profile/money-score">Start</Button>
    </div>
  </div>

</section>


<style>

  section {
    background-color: white;
    padding: 16px;
  }

  p {
    max-width: 500px;
  }

  .activities {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 32px;
  }

  .activity {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;
    width: 100%;
    aspect-ratio: 1/1;
    padding: 24px 0 0 0;

    border-radius: 50%;
    background-color: var(--grey-light);
  }

  .activity img {
    display: block;
    height: 30%;
    margin: 0 0 24px 0;
  }

  .fish {
    background-color: var(--fish-blue);
  }

  .values-mapping {
    background-color: var(--values-mapping-red);
  }

  .money-score {
    background-color: var(--money-score-green);
  }
  
</style>