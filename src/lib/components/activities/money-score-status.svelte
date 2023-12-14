<script>

  import { getActivity } from '$lib/stores/activities';
  import firestore from 'fire-stream/firestore';
  import { url } from '$lib/utils/storage';
  import { age } from '$lib/utils/dates';

  import { Button } from '$lib/components';

  export let child;
  $: activity = getActivity(child.id, 'moneyscore');
  $: moneyScore = firestore(`activity/${$activity?.[0]?.id}`);
  $: progress = $moneyScore?.progress || 0;

</script>

<div class="container">
  <div class="child">
    <img src={url(child.avatar)} alt="headshot" class="headshot" />
    <p class="name">{child.name}</p>
    <p class="age">Age {age(child.dob)}</p>
  </div>
  <div class="moneyscore">
    <h4>{child.name} is at <em>Stage 1</em>.</h4>
    <h4>Calculate MoneyScore for {child.name}</h4>
    {#if !progress}
      <Button href="/profile/money-score/questionnaire/{child.id}" color="var(--money-score-green)">Begin</Button>
    {:else if progress < 1}
      <Button href="/profile/money-score/questionnaire/{child.id}" color="var(--money-score-green)">Continue ({Math.floor(progress*100)}% complete)</Button>
    {:else}
      <Button color="var(--money-score-green)">Completed</Button>
    {/if}
  </div>
</div>


<style>

  .container {
    padding: 16px;
    border-radius: 8px;
    background-color: var(--grey-light);

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 16px;
  }

  .child {
    flex: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .moneyscore {
    flex: 3;
  }

  .headshot {
    width: 120px;
    aspect-ratio: 1/1;
    padding: 0 0 16px;
    border-radius: 50%;
  }

  .name {
    padding: 0;
    margin: 0;
    font-size: 18px;
    line-height: 24px;
  }

  .age {
    padding: 0;
    margin: 0;
    font-size: 11px;
    line-height: 1.2em;
  }

  .moneyscore h4 {
    padding: 0;
    margin: 16px 0;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
  }

  .moneyscore h4 em {
    font-weight: bold;
    color: var(--money-score-green);
    font-style: normal;
  }

</style>