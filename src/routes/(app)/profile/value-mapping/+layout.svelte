<script>
	import { Tab } from '$lib/components';
</script>

<section>
	<article>
		<header>
      <h1>
			  <img src="/img/value-mapping.svg" alt="Value Mapping"/>
      </h1>
			<h3>
				This assessment for the whole family helps you identify what matters 
        most to you and gives language to call back upon as you work through modules.
			</h3>
		</header>

		<nav class="tabs">
			<Tab color="var(--value-mapping-red)" href="/profile/value-mapping/overview">
        Understanding VM
      </Tab>
			<Tab color="var(--value-mapping-red)" href="/profile/value-mapping/activity">
        Doing VM
      </Tab>
			<Tab color="var(--value-mapping-red)" href="/profile/value-mapping/continuing">
        Continuing VM
      </Tab>
		</nav>

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
		background-color: var(--value-mapping-red);

		text-align: center;
		font-size: 40px;
		line-height: 40px;
		color: white;
	}

  h1 img {
    width: 60%;
  }

	h3 {
		color: var(--value-mapping-red);
	}

  .tabs {
    margin-bottom: 32px;
  }


  article {
    position: relative;
    z-index: 1;
  }

</style>
