<script>
  import { page } from '$app/stores';
	import firestore from 'fire-stream/firestore';
  import { url, remove, upload } from '$lib/utils/storage';
  import { Card, Button } from '$lib/components';

  let fileInput;

  $: childId = $page.params.childId;
  $: child = firestore(`children/${childId}`);
  $: file = firestore(`storage/${$child?.avatar}`);
  $: imageUrl = url($child?.avatar, {width:600, height:600});

  async function handleFileChange(e) {
    if($child?.avatar) {
      await remove($child?.avatar);
    }
    $child.avatar = await upload('avatars', e);
  }

</script>

<Card>
  {#if $child}
    <h2>Upload {$child.name || "Child"}'s profile photo</h2>
    <button class="avatar" on:click={() => fileInput.click()}>
      {#if $file && $file.uploadProgress < 1}
        <div class="progress">{Math.round($file.uploadProgress * 100)}%</div>
      {:else if imageUrl}
        <img src="{imageUrl}" alt="avatar"/>
      {:else}
        <div class="icon">
          <i class="fa-solid fa-user"></i>
        </div>
      {/if}
    </button>

    <nav>
      <Button href="/signup/family">Continue</Button>
    </nav>
  {/if}
</Card>

<input type="file" accept="image" bind:this={fileInput} style="display:none" on:change={handleFileChange}/>


<style>

  .avatar {
    position: relative;
    appearance: none;
    border: none;
    border-radius: 50%;
    width: 400px;
    aspect-ratio: 1 / 1;
    max-width: calc(100vw - 48px);
    background: #e5e5e5;
    overflow: hidden;
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .avatar .icon {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 360px;
    color: #bdbdbd;
    z-index: 1;
  }

  .avatar .progress {
    font-size: 16px;
    color: var(--grey-dark);
  }

  nav {
    margin: 16px 0 0 0;
  }
</style>