<script>
  import { getActivity } from '$lib/stores/activities';
  import firestore from 'fire-stream/firestore';
	import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { fly } from 'svelte/transition';

  import { Button, InputSlider } from '$lib/components';

  $: childId = $page.params.childId;
  $: questionNumber = $page.params.question;

  $: activity = getActivity(childId, 'moneyscore');
  $: moneyScore = firestore(`/activity/${$activity?.[0]?.id}`);
  $: question = $moneyScore?.questions[questionNumber];

  $: sectionIndex = Object.entries($moneyScore?.questions || [])
    .filter(([index, q]) => q.section == question?.section)
    .findIndex(([index, q]) => index == questionNumber) + 1;

  $: sectionCount = Object.entries($moneyScore?.questions || [])
    .filter(([index, q]) => q.section == question?.section)
    .length;

  $: isLast = questionNumber == $moneyScore?.questions.length - 1;

  $: color = questionNumber < 5 ? "#fcb62b" : 
             questionNumber < 10 ? "#d74310" : 
             questionNumber < 15 ? "#3a86c3" : 
             questionNumber < 20 ? "#0cbaee" : 
             questionNumber < 25 ? "#f5912c" : 
             questionNumber < 30 ? "#eb4194" : 
             questionNumber < 35 ? "#90b455" : 
             questionNumber < 40 ? "#a3a0cd" : 
             questionNumber < 45 ? "#27af50" : 
             questionNumber < 50 ? "#ea1c2a" :
             "var(--grey)" 


  let answer = 3;

  function handleChange(e) {
    answer = e.target.value;
  }

  function next() {
    $moneyScore.questions[questionNumber].answer = answer;

    if (isLast) {
      $moneyScore.progress = 1;
      $moneyScore.status = "COMPLETED";
      $moneyScore.dateCompleted = new Date().toISOString();
      goto(`/profile`);
      return;
    }

    let completedQuestions = $moneyScore.questions.filter(q => q.answer != null).length;
    $moneyScore.progress = completedQuestions / $moneyScore.questions.length;
    $moneyScore.status = "ACTIVE";

    goto(`/profile/money-score/questionnaire/${childId}/${Number(questionNumber) + 1}`, {noScroll:true});
  }

</script>

<div class="wrapper">
  {#if question}
    {#key questionNumber}
      <div class="container" in:fly={{x:40}} out:fly={{x:-40}}>
        <p class="count"><em>{sectionIndex}</em> of {sectionCount}</p>
        <h3>{question.question || ""}</h3>
        <div class="answer">
          <InputSlider value={$moneyScore.questions[questionNumber].answer} on:change={handleChange} color={color}/>
        </div>
        <nav>
          <Button color="var(--money-score-green)" on:click={next}>
            {#if isLast}
              Done
            {:else}
              Next
            {/if}
          </Button>
        </nav>
      </div>
    {/key}
  {/if}
</div>


<style>

  .wrapper {
    position: relative;
  }

  .container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .count {
    padding: 0;
    margin: 0 0 24px 0;
    text-align: center;
    font-size: 13px;
    line-height: 1.2em;
  }

  .count em {
    font-weight: bold;
    font-style: normal;
  }

  h3 {
    padding: 0;
    margin: 0 0 64px 0;
    font-size: 32px;
    line-height: 40px;
    font-weight: normal;
    text-align: center;
  }

  .answer {
    max-width: 400px;
    margin: 0 auto 64px auto;
  }

  nav {
    display: flex;
    justify-content: center;
  }

</style>