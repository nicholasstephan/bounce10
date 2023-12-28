<script>

  import { url } from '$lib/utils/storage';

  export let item;

</script>

<a href={item.url.startsWith('http') ? item.url : `https://${item.url}`} target="_blank">
  <img src={url(item.thumbnail, {width:400, height:600})} alt={item.title}/>
  <h3>{item.title}</h3>
  <h4>{item.subtitle}</h4>
</a>

<style>

  a {
    color: var(--grey-dark);
  }

  img {
    width: 100%;
    aspect-ratio: 4 / 6;
    border-radius: 4px;
    box-shadow: 4px 4px 8px rgba(0,0,0,0.2);
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
