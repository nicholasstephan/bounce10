<script>
  import auth, { isLoggedIn, login, logout } from '$lib/stores/auth';
  import { Card, Input, Button, Loading } from '$lib/components';
	import { goto } from '$app/navigation';

  let email = "";
  let password = "";
  let loading = false;
  let error = "";

  async function handleLogin() {
    if(loading) {
      return;
    }

    error = "";
    loading = true;

    try {
      await login(email, password);
    }
    catch(e) {
      if(e.code == "auth/invalid-email") {
        error = "Please enter a valid email address.";
      }
      else if(e.code == "auth/user-not-found") {
        error = "No account found with that email address.";
      }
      else if(e.code == "auth/wrong-password") {
        error = "Incorrect password.";
      }
      else if(e.code == "auth/missing-password") {
        error = "Please enter your password.";
      }
      else {
        error = e.message;
      }
      loading = false;
      return;
    }
    goto('/discover');
  }

</script>

<header>
  <img src="/img/logo.svg" alt="Bounce10" class="logo"/>
</header>

<main>

  <Card>
    {#if $isLoggedIn === false}

      <h2>Log In to Bounce 10</h2>
      <Input placeholder="Email Address" bind:value={email}/>
      <Input placeholder="Password" bind:value={password}/>

      <div style="flex:1"/>
    
      <p class="error">{error}</p>

      <nav>
        <Button on:click={handleLogin} {error} {loading}>Login</Button>
      </nav>

      <a href="/forgot-password">Forgot your password?</a>

      <hr/>

      <p>Dont have an account? <a href="/signup/account">Sign up here.</a></p>

    {:else if $isLoggedIn === true}

      <h2>Logged in as</h2>
      <p>{$auth.name}</p>
      <p>{$auth.email}</p>

      <div style="flex:1"/>

      <nav>
        <Button href="/discover">Continue</Button>
        <Button on:click={logout}>Log Out</Button>
      </nav>

    {:else}

      <Loading/>

    {/if}
  </Card>
</main>

<style>

  header {
    padding: 16px;
  }

  @media (min-width: 600px) {
    header {
      padding: 32px;
    }
  }

  .logo {
    height: 32px;
    margin-bottom: 8px;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 240px);
  }

  .error {
    padding: 0;
    margin: 16px 0;
    line-height: 16px;
    min-height: 16px;
    text-align: center;
    color: var(--red);
  }

  nav {
    margin-bottom: 16px;
  }

  hr {
    width: 100%;
    height: 1px;
    padding: 0;
    border: 0;
    margin: 24px 0;
    background-color: var(--grey-dark);
  }

  p {
    width: 100%;
    padding: 0;
    margin: 0;
    text-align: left;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 16px;
  }

</style>