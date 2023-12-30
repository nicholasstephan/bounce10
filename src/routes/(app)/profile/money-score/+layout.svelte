<script>
	import { Tab } from '$lib/components';
</script>

<section>
	<article>
		<header>
			<h1>
        <img src="/img/money-score.svg" alt="money score"/>
      </h1>
			<h3>
				MoneyScore is like measuring your maximum bench press before you start a new workout
				regimen. You'll want to know where you started so you can celebrate your growth along the
				way.
			</h3>
		</header>

		<nav class="tabs">
			<Tab color="var(--money-score-green)" href="/profile/money-score/overview">
        Understanding MoneyScore
      </Tab>
			<Tab color="var(--money-score-green)" href="/profile/money-score/questionnaire">
        Doing MoneyScore
      </Tab>
			<Tab color="var(--money-score-green)" href="/profile/money-score/continuing">
        Continuing MoneyScore
      </Tab>
		</nav>

    <div class="parallax">
      <img class="number" src="/img/one.svg" alt=""/>
      <img class="number" src="/img/two.svg" alt=""/>
      <img class="number" src="/img/four.svg" alt=""/>
      <img class="number" src="/img/seven.svg" alt=""/>
    </div>

    <article>
      <slot></slot>
    </article>

	</article>
</section>

<style>
	section {
    max-width: 1200px;
    min-height: 2000px;
		padding: 16px 16px 16px 16px;
		margin: 120px auto 0;
    background-color: white;
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
		background-color: var(--money-score-green);

		text-align: center;
		font-size: 40px;
		line-height: 40px;
		color: white;
	}

  h1 img {
    width: 60%;
  }

	h3 {
		color: var(--money-score-green);
	}

  .tabs {
    margin-bottom: 32px;
  }


  .parallax {
    position: relative;
    display: grid;
    grid-template-areas: "stack";
    z-index: 0;
  }

  .parallax img {
    position: absolute;
    grid-area: stack;
    animation: parallax linear;
    animation-timeline: scroll();
  }

  .parallax img:nth-child(1) {
    --size: 2.5;
    top: 18vh;
    left: -13%;
    width: calc(var(--size) * 10%);
  }

  .parallax img:nth-child(2) {
    --size: 3.5;
    top: 20vh;
    right: -20%;
    width: calc(var(--size) * 10%);
  }

  .parallax img:nth-child(3) {
    --size: 1.5;
    top: 50vh;
    left: 5%;
    width: calc(var(--size) * 10%);
  }

  .parallax img:nth-child(4) {
    --size: 5;
    top: 60vh;
    right: 0%;
    width: calc(var(--size) * 10%);
  }

  @keyframes parallax {
    to {
      transform: translateY( calc( (6 - var(--size)) * 40px) );
    }
  }


  article {
    position: relative;
    z-index: 1;
  }

</style>
