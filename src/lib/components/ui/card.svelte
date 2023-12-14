<section>
  <slot></slot>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-width: min( 400px, calc(100% - 32px) );
    max-width: calc(100% - 32px);
    min-height: 300px;
    padding: 32px;
    border-radius: 24px;
    background-color: white;
    box-shadow: 8px 8px 16px rgba(0,0,0,0.2);
  }
</style>