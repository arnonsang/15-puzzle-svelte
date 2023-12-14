<script>
	export let time;
	export let moveCount;
	export let isStarted;
</script>

{#key $time || $moveCount}
	<div class="navbar bg-base-300">
		<div class="navbar-start">
			<button class="btn btn-ghost text-xl"
				>{isStarted
					? `${$moveCount} ${$moveCount > 1 ? 'moves' : 'move'}`
					: '15 Puzzle Game'}</button
			>
		</div>
		<div class="navbar-end">
			<button class="btn btn-ghost text-xl">{isStarted ? `${$time > 1 ? $time + ' second' : $time + " seconds"}` : ``}</button>
		</div>
	</div>
{/key}
