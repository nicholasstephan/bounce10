<script>
  
  import { Modal } from '$lib/components';

  let open = false;
  const toggleInfo = () => open = !open;

</script>


<header>
  <h3>F.I.S.H.</h3>
  <button on:click={toggleInfo}>
    <i class="fa-thin fa-circle-question"></i>
  </button>
</header>

<Modal bind:open={open}>
  <div class="modal">
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
    </div>
  </div>
</Modal>


<style>

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    border-radius: 8px 8px 0 0;
    background-color: var(--fish-blue);
  }

  header h3 {
    padding: 0;
    margin: 0;
    font-size: 30px;
    line-height: 80px;
    color: white;
  }

  button {
    border: 0;
    background: none;
    color: white;
    font-size: 40px;
    line-height: 80px;
    cursor: pointer;
  }

  .modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    background: var(--fish-blue);
  }

  .modal img {
    width: 40%;
    padding: 16px 0;
  }

  .modal p {
    color: white;
  }

</style>