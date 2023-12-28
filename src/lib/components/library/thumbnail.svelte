<script>

  import { url } from '$lib/utils/storage';

  export let item;

</script>

{#if item.type === 'vimeo'}
  <a href={item.url} target="_blank">
    <img src={url(item.thumbnail, {width:600, height:400})} alt={item.title}/>
    <h3>{item.title}</h3>
    <h4>{item.subtitle}</h4>
  </a>
{:else if item.type === 'youtube'}
  <a href={item.url} target="_blank">
    <img src={url(item.thumbnail, {width:600, height:400})} alt={item.title}/>
    <h3>{item.title}</h3>
    <h4>{item.subtitle}</h4>
  </a>
{:else if item.type === 'image'}
  <div>
    <img src={url(item.thumbnail, {width:600, height:400})} alt={item.title}/>
    <h3>{item.title}</h3>
    <h4>{item.subtitle}</h4>
  </div>
{:else if item.type === 'pdf'}
  <div>
    <img src={url(item.thumbnail, {width:600, height:400})} alt={item.title}/>
    <h3>{item.title}</h3>
    <h4>{item.subtitle}</h4>
  </div>
{:else if item.type === 'website'}
  <a href={item.url.startsWith('http') ? item.url : `https://${item.url}`} target="_blank">
    <img src={url(item.thumbnail, {width:600, height:400})} alt={item.title}/>
    <h3>{item.title}</h3>
    <h4>{item.subtitle}</h4>
  </a>
{/if}


<style>

  a {
    color: var(--grey-dark);
  }

  img {
    width: 100%;
    aspect-ratio: 6 / 4;
    border-radius: 16px;
  }

  h3 {
    padding: 0 0 0 2px;
    margin: 0;
    font-size: 18px;
    line-height: 24px;
    font-weight: normal;
  }

  h4 {
    padding: 0 0 0 2px;
    margin: 0;
    font-size: 16px;
    line-height: 24px;
    font-weight: normal;
  }

</style>
