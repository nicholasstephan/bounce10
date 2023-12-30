<script>
  import { createActivity, getActivity } from '$lib/stores/activities';
  import firestore from 'fire-stream/firestore';
  import auth from '$lib/stores/auth';
  
  $: activity = getActivity($auth.id, 'valuesmapping');
  $: valuesMapping = firestore(`/activity/${$activity?.[0]?.id}`);

  // If there's no value mapping, create one.
  $: if($activity?.length === 0) {
    createActivity({
      type: "valuesmapping",
      name: "Values Mapping",
      words: [],
    });
  }

  let newWord = "";

  $: options = [
    "Integrity",
    "Honesty",
    "Respect",
    "Responsibility",
    "Empathy",
    "Compassion",
    "Justice",
    "Fairness",
    "Trustworthiness",
    "Loyalty",
    "Equality",
    "Tolerance",
    "Open-mindedness",
    "Gratitude",
    "Humility",
    "Authenticity",
    "Accountability",
    "Generosity",
    "Altruism",
    "Courage",
    "Perseverance",
    "Patience",
    "Cooperation",
    "Kindness",
    "Empowerment",
    "Caring",
    "Harmony",
    "Wisdom",
    "Graciousness",
    "Citizenship",
    "Inclusiveness",
    "Diversity",
    "Flexibility",
    "Innovation",
    "Optimism",
    "Sustainability",
    "Spirituality",
    "Teamwork",
    "Excellence",
    "Ambition",
    "Adaptability",
    "Collaboration",
    "Punctuality",
    "Forgiveness",
    "Patriotism",
    "Positivity",
    "Resourcefulness",
    "Self-discipline",
    ...($valuesMapping?.words || []),
  ].reduce((acc, word) => {
    if(!acc.includes(word)) {
      acc.push(word);
    }
    return acc;
  }, [])

  function addWord() {
    if(newWord) {
      $valuesMapping.words = [...$valuesMapping.words, newWord];
      newWord = "";
    }
  
  }

</script>

<article>
  <p>Take a large piece of paper and ask your children to draw the family in a center in the middle. After, ask the whole family to select words to describe what is important to the family. Use whatever language connects with your child, or use the guide words here as examples. Simple words like happy, family, and love may emerge. The blend of participation between the adults and the children is what makes this exercise meaningful. Over time, the language of values will be introduced to your child, and you can add more words together.</p>
  <p>Take a photo of the completed project and upload it to the portal.</p>
</article>

{#if $valuesMapping}
  <div class="form">

    <form on:submit|preventDefault={addWord}>
      <input type="text" bind:value={newWord} placeholder="Add a word..."/>
      <button type="submit">Add</button>
    </form>

    <div class="words">
      {#each options as word}
        <label class="word">
          <input type="checkbox" name={word} value={word} bind:group={$valuesMapping.words}/>
          {word}
        </label>
      {/each}
    </div>
  </div>
{/if}

<style>

  article {
    margin: 0 0 40px 0;
  }

  p {
    padding: 0;
    margin: 24px 0;
    font-size: 24px;
  }

  form {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 0 32px 0;
  }

  form input {
    display: block;
    box-sizing: border-box;
    width: 240px;
    height: 40px;
    padding: 8px 16px;
    border: none;
    margin: 0 16px 0 0;
    background-color: var(--grey-light);
    font-size: 18px;
    line-height: 24px;
  }

  form button {
    appearance: none;
    display: block;
    box-sizing: border-box;
    padding: 8px 32px;
    border: none;
    border-radius: 20px;
    background: var(--values-mapping-red);
    color: white;
    font-size: 18px;
    line-height: 24px;
    text-transform: uppercase;
    cursor: pointer;
  }

  .word {
    display: inline-block;
    padding: 8px 16px;
    margin: 0 8px 8px 0;
    border-radius: 20px;
    background: var(--grey-light);
    font-size: 18px;
    line-height: 24px;
    text-transform: uppercase;
    cursor: pointer;
  }
  
  .word:has(input:checked) {
    background: var(--values-mapping-red);
    color: white;
  }

  .word input {
    display: none; 
  }
  
</style>