<script>
  export let value = null;

  
  export let low = "";
  export let high = "";
  export let min = 1;
  export let max = 5;
  export let color = "var(--green)";
  
  $: if(!value) value = Math.round((max + min) / 2);

</script>

<div class="container" style="--color:{color}">
  <button class="label" on:click={() => value = min}>
    {low}
  </button>
  <div class="slider">
    <input 
      type="range" 
      min={min} 
      max={max} 
      step={1}
      bind:value={value} 
      on:change
    />
  </div>
  <button class="label" on:click={() => value = max}>
    {high}
  </button>
</div>


<style>


  .container {
    display: flex;
    align-items: center;
  }

  .slider {
    flex: 1;
    margin: 0 16px;
  }

  .label {
    appearance: none;
    background: none;
    border: none;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
  }

  input[type="range"] {
    -webkit-appearance: none;
    width: 100%; 
    height: 8px;
    background: #d3d3d3;
    outline: none;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    position: relative;
    top: -8px;

    width: 24px;
    height: 24px;
    border-radius: 12px; 
    background: var(--color);
    box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.4);
    cursor: pointer;

    transition: all 200ms ease-in-out;
  }

  input[type="range"]::-moz-range-thumb {
    -webkit-appearance: none;
    appearance: none;
    position: relative;
    top: -8px;

    width: 24px;
    height: 24px;
    border-radius: 12px; 
    background: var(--color);
    box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.4);
    cursor: pointer;

    transition: all 200ms ease-in-out;
  }

  input[type="range"]::-ms-thumb {
    -webkit-appearance: none;
    appearance: none;
    position: relative;
    top: -8px;

    width: 24px;
    height: 24px;
    border-radius: 12px; 
    background: var(--color);
    box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.4);
    cursor: pointer;

    transition: all 200ms ease-in-out;
  }

  input[type="range"]:hover::-webkit-slider-thumb {
    box-shadow: 4px 4px 8px rgba(0,0,0,0.2);
  }
  
  input[type="range"]:hover::-moz-range-thumb {
    box-shadow: 4px 4px 8px rgba(0,0,0,0.2);
  }

  input[type="range"]:hover::-ms-thumb {
    box-shadow: 4px 4px 8px rgba(0,0,0,0.2);
  }

  input[type="range"]::-webkit-slider-runnable-track {
    cursor: pointer;
    height: 8px;
    border-radius: 4px;
    background: var(--color);
  }

  input[type="range"]::-moz-range-track {
    cursor: pointer;
    height: 8px;
    border-radius: 4px;
    background: var(--color);
  }

  input[type="range"]::-ms-track {
    cursor: pointer;
    height: 8px;
    border-radius: 4px;
    background: var(--color);
  }


</style>