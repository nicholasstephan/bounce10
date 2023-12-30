<script>
  
  import Button from '$lib/components/forms/button.svelte';
  
</script>

<div class="splash">
  <img src="/img/fish.svg" alt="FISH"/>

  <div class="info">
    <p>
      F.I.S.H.™ is an acronym the categories of capital:
      Financial, Intellectual, Social, & Human
    </p>
    <p>
      FISH helps your child understand that wealth is more
      than money; its what we know, the relationships we
      have, and the stories that make us who we are. Do a
      FISH exercise as a whole family unit.
    </p>
    <Button color="#fff" textColor="#333" href="/profile/fish/overview">START</Button>
  </div>
</div>


<style>

  .splash {
    display: flex;
    align-items: center;
    gap: 64px;
    padding: 80px;
    border-radius: 8px;
    background-color: var(--fish-blue);
  }

  .splash img {
    width: 240px;
  }

  .splash p {
    max-width: 600px;
    font-size: 28px;
    line-height: 32px;
    color: white;
  }

</style>  