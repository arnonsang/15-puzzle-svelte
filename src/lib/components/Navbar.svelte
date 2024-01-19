<script>
	export let time;
	export let moveCount;
	export let isStarted = false;
	export let playerName;

	import { username } from '../../store/username';

	import { IconClockHour12 } from '@tabler/icons-svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';

	const timerColor = () => {
		if($time >= 120) {
			return 'text-error';
		}
		else if ($time < 60 && $time > 0) {
			return 'text-success';
		} else if ($time < 120 && $time > 0) {
			return 'text-warning';
		} else {
			return 'text-primary';
		}
	};

	const moveColor = () => {
		if($moveCount >= 250) {
			return 'text-error';
		}
		else if ($moveCount < 100) {
			return 'text-success';
		} else if ($moveCount < 250) {
			return 'text-warning';
		} else {
			return 'text-primary';
		}
	};
</script>

<div class="navbar bg-base-300">
	<div class="navbar-start">
		{#key $moveCount}
			<a href={isStarted ? "" : "/"} class={'btn btn-base-200 text-2xl font-bold stroke-black ' + moveColor()}
				>{isStarted
					? `${$moveCount > 1 ? $moveCount + ' moves' : $moveCount + ' move'}`
					: `Welcome, ${$username}!`}</a
			>
		{/key}
	</div>

	{#if isStarted}
		<div class="navbar-center">
			<ThemeSwitcher />
		</div>
	<!-- {:else}
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
		  <li><a href="/">Home</a></li>
		  
		  <li><a href="/rank">Leaderboard</a></li>
		</ul>
	  </div> -->
	{/if}

	<div class="navbar-end md:pr-4">
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
