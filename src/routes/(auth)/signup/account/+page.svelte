<script>

  import auth, { isLoggedIn, register, logout } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
  import { Card, Input, Button, Loading } from '$lib/components';

  let name = "";
  let email = "";
  let phone = "";
  let password = "";
  let confirmPassword = "";

  let loading = false;
  let error = "";

  async function join() {
    if(loading) {
      return;
    }

    if(!name) {
      error = "Please enter your full name.";
      return;
    }

    if(!email) {
      error = "Please enter your email address.";
      return;
    }

    if(!phone) {
      error = "Please enter your phone number.";
      return;
    }

    if(!password) {
      error = "Please choose a password.";
      return;
    }

    if(password != confirmPassword) {
      error = "Your passwords don't match.";
      return;
    }

    error = "";
    loading = true;

    try {
      await register(email, password, {name, email, phone});
    }
    catch(e) {
      error = e.message;
      loading = false;
      return;
    }
    goto("/signup/family");
  }

</script>

<Card>
  
  {#if $isLoggedIn === false}

    <h2>Create an Account</h2>
      
    <Input placeholder="Name" bind:value={name}/>
    <Input placeholder="Email" bind:value={email}/>
    <Input placeholder="Phone" bind:value={phone}/>
    <Input placeholder="Password" bind:value={password}/>
    <Input placeholder="Confirm Password" bind:value={confirmPassword}/>

    <div style="flex:1"/>
    
    <p class="error">{error}</p>

    <nav>
      <Button on:click={join} {loading} {error}>Continue</Button>
    </nav>

  {:else if $isLoggedIn === true}

    <h2>Logged in as</h2>
    <p>{$auth.name}</p>
    <p>{$auth.email}</p>

    <div style="flex:1"/>

    <nav>
      <Button href="/signup/family">Continue</Button>
      <Button on:click={logout}>Log Out</Button>
    </nav>

  {:else}

    <Loading/>

  {/if}
</Card>


<style>

  .error {
    padding: 0;
    margin: 16px 0;
    line-height: 16px;
    min-height: 16px;
    text-align: center;
    color: var(--red);
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


