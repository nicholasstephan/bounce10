<script>
  export let message = "Loading...";
</script>

<div>
  <img src="/img/loading.svg" alt=""/>
  <p>{message}</p>
</div>


<style>
  
  div {
    text-align: center;
  }

  img {
    height: 60px 
  }

  p {
    color: #333;
    font-size: 14px;
    color: var(--grey-dark);
    font-weight: bold;
  }

</style>