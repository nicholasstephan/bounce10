<script>
  
  import { Modal } from '$lib/components';

  let open = false;
  const toggleInfo = () => open = !open;

</script>


<header>
  <h3>Values Mapping</h3>
  <button on:click={toggleInfo}>
    <i class="fa-thin fa-circle-question"></i>
  </button>
</header>

<Modal bind:open={open}>
  <div class="modal">
    <img src="/img/values-mapping.svg" alt="Values Mapping"/>
    <div class="info">
      <p>
        This assessment for the whole family helps
        you identify what matters most to you and 
        gives language to call back upon as you
        work through activity modules.
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
    background-color: var(--values-mapping-red);
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
    background: var(--values-mapping-red);
  }

  .modal img {
    width: 40%;
    padding: 16px 0;
  }

  .modal p {
    color: white;
  }

</style>