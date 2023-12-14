<script>
	import { Tab } from '$lib/components';
</script>

<section>
	<article>
		<header>
      <h1>
			  <img src="/img/fish.svg" alt="fish"/>
      </h1>
			<h3>
				FISH helps your child understand that wealth is more than money; 
        its what we know, the relationships we have, and the stories that 
        make us who we are. Do a FISH exercise as a whole family unit.
			</h3>
		</header>

		<nav class="tabs">
			<Tab color="var(--fish-blue)" href="/profile/fish/overview">
        Understanding FISH
      </Tab>
			<Tab color="var(--fish-blue)" href="/profile/fish/activity">
        Doing FISH
      </Tab>
			<Tab color="var(--fish-blue)" href="/profile/fish/continuing">
        Continuing FISH
      </Tab>
		</nav>

    <div class="anim">
      <img class="number" src="/img/fish-1.svg" alt=""/>
      <img class="number" src="/img/fish-3.svg" alt=""/>
      <img class="number" src="/img/fish-2.svg" alt=""/>
    </div>

    <article>
      <slot></slot>
    </article>

	</article>
</section>

<style>
	section {
    background-color: white;
    min-height: 2000px;
		padding: 16px 16px 16px 16px;
		margin: 120px 0 0 0;
	}

	article {
		max-width: 800px;
		margin: 0 auto;
	}

	header {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: 32px;
    margin: 0 0 24px 0;
	}

	h1 {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 240px;
		height: 240px;
		margin-top: -80px;
		border-radius: 120px;
		background-color: var(--fish-blue);

		text-align: center;
		font-size: 40px;
		line-height: 40px;
		color: white;
	}

  h1 img {
    width: 60%;
  }

	h3 {
		color: var(--fish-blue);
	}

  .tabs {
    margin-bottom: 32px;
  }
  

  .anim {
    position: relative;
    display: grid;
    grid-template-areas: "stack";
    z-index: 0;
  }

  .anim img {
    position: absolute;
    grid-area: stack;
  }

  .anim img:nth-child(1) {
    --size: 2.5;
    top: 18vh;
    left: -13%;
    width: calc(var(--size) * 10%);
    animation: anim-left linear;
    animation-timeline: scroll();
  }

  .anim img:nth-child(2) {
    --size: 2;
    top: 60vh;
    right: -20%;
    width: calc(var(--size) * 10%);
    animation: anim-left linear;
    animation-timeline: scroll();
  }

  .anim img:nth-child(3) {
    --size: 1.5;
    top: -10vh;
    right: 5%;
    width: calc(var(--size) * 10%);
    animation: anim-right linear;
    animation-timeline: scroll();
  }

  @keyframes anim-right {
    to {
      transform: translateX( calc( (6 - var(--size)) * 40px) );
    }
  }

  @keyframes anim-left {
    to {
      transform: translateX( calc( (6 - var(--size)) * -40px) );
    }
  }


  article {
    position: relative;
    z-index: 1;
  }

</style>
