<script>
	import { getActivity } from '$lib/stores/activities';
	import firestore from 'fire-stream/firestore';
	import { url } from '$lib/utils/storage';
	import { age } from '$lib/utils/dates';

	export let childId;

	$: activity = getActivity(childId, 'moneyscore');
	$: moneyScore = firestore(`/activity/${$activity?.[0]?.id}`);
	$: child = firestore(`/children/${childId}`);

	$: sections = Object.entries($moneyScore?.questions || [])
		.map(([index, q]) => q.section)
		.filter((value, index, self) => self.indexOf(value) === index);

	$: progress = sections.reduce((res, section) => {
		let count = $moneyScore.questions.reduce((res, q) => {
			if (q.section == section) {
				res += Number(q.answer) || 0;
			}
			return res;
		}, 0);

		let total = $moneyScore.questions.filter((q) => q.section == section).length;
		let average = Math.round(count / total);
		let score = average / 5;

		return { ...res, [section]: { count, total, average, score } };
	}, {});

	$: console.log(progress);
</script>

<div class="container">
	<div class="child">
		{#if $child}
			<img src={url($child.avatar)} alt="headshot" class="headshot" />
			<p class="name">{$child.name}</p>
			<p class="age">Age {age($child.dob)}</p>
		{/if}
	</div>

	<div class="moneyscore">
		{#if $moneyScore}
			<div class="bars">
				{#each sections as section}
					<div class="bar">
						<div class="track">
							<div class="fill" style="height:{progress[section].score * 200}px"></div>
							<div class="value">{progress[section].count}</div>
						</div>
						<div class="label">{section}</div>
					</div>
				{/each}
			</div>
		{:else}
			<p>Incomplete</p>
		{/if}
	</div>
</div>

<style>
	.container {
		padding: 32px 16px;
		border-radius: 8px;
		background-color: white;

		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: 16px;
	}

	.child {
		flex: 1;

		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.moneyscore {
		flex: 3;
	}

	.headshot {
		width: 120px;
		aspect-ratio: 1/1;
		padding: 0 0 16px;
		border-radius: 50%;
	}

	.name {
		padding: 0;
		margin: 0;
		font-size: 18px;
		line-height: 24px;
	}

	.age {
		padding: 0;
		margin: 0;
		font-size: 11px;
		line-height: 1.2em;
	}

	.bars {
		display: flex;
		flex-direction: row;
		align-items: stretch;
	}

	.bar {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.bar .track {
		position: relative;
		width: 24px;
		height: 200px;
		margin: 0 0 8px;
		background-color: var(--grey-light);
		border-radius: 12px;
		overflow: hidden;
	}

	.bar .value {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
    
		text-align: center;
		color: white;
		font-size: 13px;
		line-height: 24px;
	}

	.bar .fill {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: var(--grey);
		border-radius: 12px;
	}

  .bar:nth-child(1) .fill {
    background-color: #fcb62b;
  }
  .bar:nth-child(2) .fill {
    background-color: #d74310;
  }
  .bar:nth-child(3) .fill {
    background-color: #3a86c3;
  }
  .bar:nth-child(4) .fill {
    background-color: #0cbaee;
  }
  .bar:nth-child(5) .fill {
    background-color: #f5912c;
  }
  .bar:nth-child(6) .fill {
    background-color: #eb4194;
  }
  .bar:nth-child(7) .fill {
    background-color: #90b455;
  }
  .bar:nth-child(8) .fill {
    background-color: #a3a0cd;
  }
  .bar:nth-child(9) .fill {
    background-color: #27af50;
  }
  .bar:nth-child(10) .fill {
    background-color: #ea1c2a;
  }

	.bar .label {
		font-size: 11px;
		line-height: 1.2em;
		text-align: center;
	}
</style>
