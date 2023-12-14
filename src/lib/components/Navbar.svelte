<script>
	export let time;
	export let moveCount;
	export let isStarted;
	export let playerName;

	import ThemeSwitcher from './ThemeSwitcher.svelte';
</script>

{#key $time || $moveCount}
	<div class="navbar bg-base-300">
		<div class="navbar-start">
			<button class="btn btn-ghost text-2xl"
				>{isStarted
					? `${$moveCount > 1 ? $moveCount + ' moves' : $moveCount + ' move'}`
					: `Welcome, ${playerName}!`}</button
			>
		</div>

		<div class="navbar-end">
			{#if isStarted}
			<button class="btn btn-ghost text-2xl"
			>{`${$time > 1 ? $time + ' second' : $time + ' seconds'}`}</button
		>
			{:else}
			<ThemeSwitcher />
			{/if}
		</div>
	</div>
{/key}
