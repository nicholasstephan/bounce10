<script>
  
  import Button from '$lib/components/forms/button.svelte';
  
  </script>
  
  <div class="splash">
    <img src="/img/values-mapping.svg" alt="Values Mapping"/>
  
    <div class="info">
      <p>
        This assessment for the whole family helps
        you identify what matters most to you and 
        gives language to call back upon as you
        work through activity modules.
      </p>
      <Button color="#fff" textColor="#333" href="/profile/values-mapping">START</Button>
    </div>
  </div>
  
  
  <style>
  
    .splash {
      display: flex;
      align-items: center;
      gap: 64px;
      padding: 80px;
      border-radius: 8px;
      background-color: var(--values-mapping-red);
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