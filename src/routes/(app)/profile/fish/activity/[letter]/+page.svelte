<script>
  import { getActivity } from '$lib/stores/activities';
  import firestore from 'fire-stream/firestore';
	import { goto } from '$app/navigation';
  import auth from '$lib/stores/auth';
  import { page } from '$app/stores';

  import { Button } from '$lib/components';

  $: letter = $page.params.letter;

  $: activity = getActivity($auth.id, 'fish');
  $: fish = firestore(`/activity/${$activity?.[0]?.id}`);

  function next() {
    letter = letter == 'f' ? 'i' 
           : letter == 'i' ? 's' 
           : letter == 's' ? 'h' 
           : null;

    if(!letter) {
      goto('/profile');
    }
    else {
      goto(`/profile/fish/activity/${letter}`, {noScroll:true});
    }
  }

</script>

<div class="container">
  <div class="description">
    {#if letter == 'f'}
      <h4>Financial Capital</h4>
      <p>Your financial resources and your ability to use them. This includes the experts and intellectual resources available (advisors, expert consultants, experience, etc.) as well as financial skills (ability to read an income statement, assess a business plan, read the business pages of the newspaper, manage a basic budget, keep a FICO score above 750, etc.).</p>
    {/if}
    {#if letter == 'i'}
      <h4>Intellectual Capital</h4>
      <p>Your financial resources and your ability to use them. This includes the experts and intellectual resources available (advisors, expert consultants, experience, etc.) as well as financial skills (ability to read an income statement, assess a business plan, read the business pages of the newspaper, manage a basic budget, keep a FICO score above 750, etc.).</p>
    {/if}
    {#if letter == 's'}
      <h4>Social Capital</h4>
      <p>Your financial resources and your ability to use them. This includes the experts and intellectual resources available (advisors, expert consultants, experience, etc.) as well as financial skills (ability to read an income statement, assess a business plan, read the business pages of the newspaper, manage a basic budget, keep a FICO score above 750, etc.).</p>
    {/if}
    {#if letter == 'h'}
      <h4>Human Capital</h4>
      <p>Your financial resources and your ability to use them. This includes the experts and intellectual resources available (advisors, expert consultants, experience, etc.) as well as financial skills (ability to read an income statement, assess a business plan, read the business pages of the newspaper, manage a basic budget, keep a FICO score above 750, etc.).</p>
    {/if}
    <Button color="var(--fish-blue)" on:click={next}>
      {#if letter == 'h'}
        Done
      {:else}
        Next
      {/if}
    </Button>
  </div>
  <div class="form">
    <h4>Type Assets here...</h4>
    {#if $fish}
      <textarea bind:value={$fish[letter]}></textarea>
    {/if}
  </div>
</div>


<style>

  .container {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    gap: 2px;
  }

  .description {
    flex: 1;
    padding: 24px;
    border-radius: 8px 0 0 8px;
    background-color: var(--grey-light);
  }

  .form {
    flex: 3;
    padding: 24px;
    border-radius: 0 8px 8px 0;
    background-color: var(--grey-light);
  }

  .form h4 {
    padding-left: 16px;
  }

  textarea {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 400px;
    resize: none;
    padding: 16px;
    border: none;
    margin: 0;
    background-color: rgba(255,255,255,0);

    font-size: 32px;
    line-height: 1.2em;
  }

  textarea:focus {
    outline: none;
    background-color: rgba(255,255,255,0.2);
  }

</style>