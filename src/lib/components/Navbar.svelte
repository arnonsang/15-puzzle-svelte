<script>
	export let time;
	export let moveCount;
	export let isStarted;
	export let playerName;

	import { IconClockHour12 } from '@tabler/icons-svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';

	const timerColor = () => {
		if ($time < 60) {
			return 'text-success';
		} else if ($time < 120) {
			return 'text-warning';
		} else {
			return 'text-error';
		}
	};

	const moveColor = () => {
		if ($moveCount < 100) {
			return 'text-success';
		} else if ($moveCount < 250) {
			return 'text-warning';
		} else {
			return 'text-error';
		}
	};
</script>

<div class="navbar bg-base-300">
	<div class="navbar-start">
		{#key $moveCount}
			<button class={'btn btn-base-200 text-2xl font-bold stroke-black ' + moveColor()}
				>{isStarted
					? `${$moveCount > 1 ? $moveCount + ' moves' : $moveCount + ' move'}`
					: `Welcome, ${playerName}!`}</button
			>
		{/key}
	</div>

	{#if isStarted}
		<div class="navbar-center">
			<ThemeSwitcher />
		</div>
	{/if}

	<div class="navbar-end pr-4">
		{#if isStarted}
			{#key $time}
				<button class={'btn btn-base-200 flex text-2xl font-bold drop-shadow-2xl ' + timerColor()}
					><IconClockHour12 class="animate-spin" />{`${$time}s`}</button
				>
			{/key}
		{:else}
			<ThemeSwitcher />
		{/if}
	</div>
</div>
