<script>
	import { page } from '$app/stores';
	import firestore from 'fire-stream/firestore';
	import { Card, Input, Button } from '$lib/components';

	$: childId = $page.params.childId;
	$: child = firestore(`children/${childId}`);

	let likes = [
		'Aliens',
		'Aquariums',
		'Beaches',
		'Bears',
		'Bugs',
		'Buried Treasure',
		'Lorem Ipsum 1',
		'Lorem Ipsum 2',
		'Lorem Ipsum 3',
		'Lorem Ipsum 4',
		'Lorem Ipsum 5',
		'Lorem Ipsum 6',
	];

	function toggle(like) {
		if (!$child.likes) {
			$child.likes = [like];
		} else if ($child.likes?.includes(like)) {
			$child.likes = $child.likes.filter((l) => l != like);
		} else {
			$child.likes = [...$child.likes, like];
		}
	}
</script>

<Card>
	{#if $child}
		<h2>Check of {$child.name}'s favorite things</h2>
		<div class="likes">
			{#each likes as like}
				<button
					class="like"
					class:active={$child.likes?.includes(like)}
					on:click={() => toggle(like)}
				>
          <div>{like}</div>
				</button>
			{/each}
		</div>

    <nav>
      <Button href="avatar">Continue</Button>
    </nav>
	{/if}
</Card>

<style>
	nav {
		margin: 16px 0 0 0;
	}

  .likes {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .like {
    appearance: none;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    height: 80px;
    padding: 16px;
    border: none;
    margin: 0;
    border-radius: 8px;

    background-color: var(--grey-light);
    text-align: left;
  }

  .like.active {
    color: white;
    background-color: var(--blue);
  }

  @media (min-width: 600px) {
    .likes {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .like {
      width: 240px;
    }
  }

  

</style>
