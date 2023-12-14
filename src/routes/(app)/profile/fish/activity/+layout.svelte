<script>
  import { page } from '$app/stores';

  $: letter = $page.params.letter;
</script>

<p>After your brainstorming session in the Understanding FISH section, it is time to create your family FISH.</p>

<nav>
  <a href="/profile/fish/activity/f" data-sveltekit-noscroll class:active={letter == 'f'}>F.</a>
  <a href="/profile/fish/activity/i" data-sveltekit-noscroll class:active={letter == 'i'}>I.</a>
  <a href="/profile/fish/activity/s" data-sveltekit-noscroll class:active={letter == 's'}>S.</a>
  <a href="/profile/fish/activity/h" data-sveltekit-noscroll class:active={letter == 'h'}>H.</a>
</nav>

<slot></slot>

<style>

  p {
    padding: 0;
    margin: 24px 0;
    font-size: 24px;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
  }

  nav a {
    padding: 0 16px 0 24px;
    border-radius: 8px;
    font-size: 64px;
  }
  
  nav a.active {
    background-color: var(--grey-light);
  }

</style>