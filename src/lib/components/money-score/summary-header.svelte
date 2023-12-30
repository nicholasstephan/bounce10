<script>
  
  import { Modal } from '$lib/components';

  let open = false;
  const toggleInfo = () => open = !open;

</script>


<header>
  <h3>Money$core</h3>
  <button on:click={toggleInfo}>
    <i class="fa-thin fa-circle-question"></i>
  </button>
</header>

<Modal bind:open={open}>
  <div class="modal">
    <img src="/img/money-score.svg" alt="FISH"/>
    <div class="info">
      <p>
        MoneyScore is like measuring your 
        maximum bench press before you start a 
        new workout regimen. You'll want to know
        where you started so you can celebrate your
        growth along the way.
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
    background-color: var(--money-score-green);
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
    background: var(--money-score-green);
  }

  .modal img {
    width: 40%;
    padding: 16px 0;
  }

  .modal p {
    color: white;
  }

</style>