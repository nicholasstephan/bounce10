<script>
  import { url, remove, upload } from '$lib/utils/storage';

  export let value = "";
  export let placeholder = "";
  export let folder = "media";
  export let width = 400;
  export let height = 400;

  let fileInput;

  async function handleFileChange(e) {
    if(value) {
      await remove(value);
    }
    value = await upload(folder, e);
  }

</script>

<button class="input" on:click={() => fileInput.click()}>
  {#if value} 
    <img class="image" src="{url(value, {width, height})}" alt=""/>
  {:else}
    <div class="placeholder">
      <div>{placeholder}</div>
      <div><i class="fa-regular fa-image"></i></div>
    </div>
  {/if}

  <input type="file" accept="image" bind:this={fileInput} style="display:none" on:change={handleFileChange}/>
</button>

<style>

  .input {
    appearance: none;
    background: none;

    display: flex;
    justify-content: stretch;
    align-items: stretch;
    box-sizing: border-box;
    width: 100%;
    padding: 0;
    border: 1px solid var(--grey);

    font-family: inherit;
    font-size: 14px;
    line-height: 16px;
    color: var(--grey-dark);

    transition: box-shadow 0.2s ease-in-out;
    cursor: pointer;
  }

  :global(input) + .input,
  :global(.input) + .input {
    margin-top: 16px;
  }

  .input:focus {
    box-shadow: 4px 4px 8px rgba(0,0,0,0.2);
  }

  .placeholder {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 16px 14px;
    color: var(--grey);
  }

  .image {
    width: 100%;
  }


</style>