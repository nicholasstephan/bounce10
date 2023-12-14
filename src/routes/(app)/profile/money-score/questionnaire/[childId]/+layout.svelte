<script>
  import { page } from '$app/stores';
  import firestore from 'fire-stream/firestore';
  import { goto } from '$app/navigation';
  import { getActivity } from '$lib/stores/activities';

  $: childId = $page.params.childId;
  $: question = $page.params.question;
  $: activity = getActivity(childId, 'moneyscore');
  $: moneyScore = firestore(`activity/${$activity?.[0]?.id}`);
  $: activeSection = $moneyScore?.questions[question]?.section;

  $: sections = Object.entries($moneyScore?.questions || [])
    .map(([index, q]) => q.section)
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((name, index) => {
      let complete = !$moneyScore.questions.filter(q => q.section == name && q.answer == null).length;
      let active = name == activeSection;
      return {index, active, name, complete };
    });
  
  const gotoSection = (section) => () => {
    for(let [index, question] of Object.entries($moneyScore.questions || [])) {
      if (question.section == section && question.answer == null) {
        goto(`/profile/money-score/questionnaire/${childId}/${index}`, {noScroll:true});
        return;
      }
    }
  }
</script>


<nav class="sections">
  {#each sections as section}
    <button class="section" class:active={section.active} on:click={gotoSection(section.name)}>
      {#if section.complete}
        <div class="check">
          <i class="fa-solid fa-check"></i>
        </div>
      {:else}
        <div class="number">
          {section.index + 1}
        </div>
      {/if}
      <div class="text">{section.name}</div>
    </button>
  {/each}
</nav>

<slot></slot>


<style>
  .sections {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 8px;
    width: 100%;
    margin: 0 0 24px 0;
  }

  .section {
    appearance: none;
    background: none;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 24px 0;
    border-radius: 8px;
    cursor: pointer;
  }

  .section.active {
    background: var(--grey-light);
  }

  .section .check {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    margin-bottom: 4px;
    border-radius: 14px;
    font-size: 13px;
    background-color: var(--grey);
    color: white;
  }

  .section .number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    margin-bottom: 4px;
    border-radius: 14px;
    font-size: 13px;
    color: white;
  }

  .section .text {
    color: var(--grey-dark);
    font-size: 9px;
    text-transform: uppercase;
  }

  .section:nth-child(1) .number {
    background-color: #fcb62b;
  }
  .section:nth-child(2) .number {
    background-color: #d74310;
  }
  .section:nth-child(3) .number {
    background-color: #3a86c3;
  }
  .section:nth-child(4) .number {
    background-color: #0cbaee;
  }
  .section:nth-child(5) .number {
    background-color: #f5912c;
  }
  .section:nth-child(6) .number {
    background-color: #eb4194;
  }
  .section:nth-child(7) .number {
    background-color: #90b455;
  }
  .section:nth-child(8) .number {
    background-color: #a3a0cd;
  }
  .section:nth-child(9) .number {
    background-color: #27af50;
  }
  .section:nth-child(10) .number {
    background-color: #ea1c2a;
  }

  
</style>