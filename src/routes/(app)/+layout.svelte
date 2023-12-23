<script>
  import auth from '$lib/stores/auth';
  import { page } from '$app/stores';
  import { login, isLoggedIn } from '$lib/stores/auth';
	import { onMount } from 'svelte';
  import { Loading } from '$lib/components';

  $: path = $page.url.pathname.split('/')[1];

  onMount(login);

  let isNavbarOpen = false;
  
  function hideNavbar() {
    isNavbarOpen = false;
  }
  
  async function showNavbar() {
    isNavbarOpen = true;
    setTimeout(() => {
      document.addEventListener('click', hideNavbar, { once:true });
    }, 0);
  }

</script>

<main>
  {#if $isLoggedIn === true}
    <slot></slot>
  {:else if $isLoggedIn === false}
    <div>You aren't logged in. <a href="/login">Log in here.</a></div>
  {:else}
    <Loading/>
  {/if}
</main>

<div class="navbar" class:is-open={isNavbarOpen}>
  <img src="/img/logo-white.svg" alt="Bounce 10" class="logo"/>

  <nav>
    {#if $auth?.permissions?.manageChildren}
      <a href="/discover" class:active={path == 'discover'}>
        <i class="fa-solid fa-fw fa-house"></i> 
        <span>Discover</span>
      </a>
      <a href="/profile" class:active={path == 'profile'}>
        <i class="fa-solid fa-fw fa-piggy-bank"></i> 
        <span>My Family Profile</span>
      </a>
      <a href="/activities" class:active={path == 'activities'}>
        <i class="fa-solid fa-fw fa-map"></i>
        <span>Activities</span>
      </a>
    {/if}
    <a href="/library" class:active={path == 'library'}>
      <i class="fa-solid fa-fw fa-book-blank"></i>
      <span>Library</span>
    </a>
    <a href="/community" class:active={path == 'community'}>
      <i class="fa-solid fa-fw fa-users"></i>
      <span>Community</span>
    </a>
    {#if $auth?.permissions?.adminUsers}
      <a href="/users" class:active={path == 'users'}>
        <i class="fa-solid fa-user"></i>
        <span>Users</span>
      </a>
    {/if}
    {#if $auth?.permissions?.manageChildren}
      <a href="/reading" class:active={path == 'reading'}>
        <i class="fa-solid fa-fw fa-bookmark"></i>
        <span>Reading List</span>
      </a>
    {/if}
    <a href="/about" class:active={path == 'about'}>
      <i class="fa-kit fa-fw fa-icon"></i>
      <span>About B10</span>
    </a>
    
  </nav>

  {#if $auth?.permissions?.manageChildren}
    <div class="navigator">
      <div class="avatar">
        <i class="fa-solid fa-user"></i>
      </div>
      <div class="label">My Navigator:</div>
      <div class="name">Jesse R.</div>
    </div>
  {/if}
</div>

<button class="hamburger" on:click={showNavbar}>
  <i class="fa-solid fa-bars"></i>
</button>


<a href="/account" class="account">
  <div class="name">{$auth?.name || ""}</div>
  <div class="avatar">
    <i class="fa-solid fa-user"></i>
  </div>
</a>


<style>

  h3 {
    padding: 0 0 4px 2px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    margin: 40px 0 0 0;
    color: var(--grey);
    text-transform: uppercase;
    font-size: 11px;
  }

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    width: 240px;
    padding: 32px;
    background-color: var(--grey-dark);
    box-shadow: 0 0 12px rgba(0,0,0,0.5);
    z-index: 20;
  }
  

  .navbar .logo {
    display: block;
    width: 140px;
    margin: 0 0 96px;
  }

  .navbar nav {
    margin-bottom: 80px;
  }

  .navbar a {
    display: grid;
    grid-template-columns: 40px 1fr;
    align-items: center;
    padding: 8px 0;
    color: var(--grey);
    font-size: 18px;
  }

  .navbar a.active {
    color: white;
  }

  .navigator {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .navigator .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    margin: 0 0 16px;
    border-radius: 50%;
    font-size: 64px;
    color: var(--grey-dark);
    background-color: var(--grey)
  }

  .navigator .label {
    font-size: 11px;
    color: var(--grey-light);
  }

  .navigator .name {
    font-size: 20px;
    color: var(--grey-light);
  }

  .hamburger {
    display: none;
  }

  .account {
    position: absolute;
    top: 0;
    right: 0;
    box-sizing: border-box;
    padding: 32px;
    display: flex;
    align-items: center;
    font-size: 16px;
  }

  .account .name {
    margin-right: 16px;
    color: var(--grey-dark);
  }

  .account .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 13px;
    color: var(--grey-dark);
    background-color: var(--grey);
    border-radius: 50%;
  }

  main {
    padding: 32px 32px 32px 280px;
  }


  @media (max-width: 800px) {
    .navbar {
      left: calc(-240px - 32px - 16px);
      width: calc(240px + 32px);
      padding-left: calc(32px + 32px);
      transition: left 0.2s ease-in;
    }

    .navbar.is-open {
      left: -32px;
      transition: left 0.4s cubic-bezier(0.3, 0.2, 0.2, 1.4);
    }

    .hamburger {
      appearance: none;
      display: block;
      position: absolute; 
      top: 0;
      left: 0;
      padding: 16px;
      border: none;
      font-size: 24px;
      color: var(--grey-dark);
      background: none;
      z-index: 10;
    }

    .account {
      padding: 16px;
    }

    .account .name {
      display: none;
    }

    main {
      padding: 64px 16px;
    }
  }


</style>