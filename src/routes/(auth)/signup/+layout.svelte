<script>
  import { page } from '$app/stores';

  // expecting a url like `/signup/family/info` or `/signup/account`
  $: active = $page.url.pathname?.split('/')?.[2];

</script>

<header>
  <img src="/img/logo.svg" alt="Bounce10" class="logo"/>
  <nav>
    <a href="/signup/account" class:active={active == "account"}>Account Details</a>
    <a href="/signup/family" class:active={active == "family"}>Family</a>
  </nav>
</header>

<main>
  <slot></slot>
</main>

<style>

  header {
    padding: 16px;
  }

  @media (min-width: 600px) {
    header {
      padding: 32px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      align-items: end;
    }
  }

  .logo {
    height: 32px;
    margin-bottom: 8px;
  }

  nav {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  nav a {
    display: block;
    flex: 1;
    padding-top: 4px;
    border-top: 8px solid var(--grey-dark);
    text-decoration: none;
    color: var(--grey-dark);
    white-space: nowrap;
    font-size: 14px;
  }

  nav a.active {
    color: var(--red);
    border-color: var(--red);
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 240px);
    padding: 16px 0 40px;
  }

</style>