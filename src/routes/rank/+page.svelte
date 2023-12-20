<script>
	import { browser } from '$app/environment';
	import Swal from 'sweetalert2';
	import { IconArrowNarrowDown, IconArrowNarrowUp, IconAward, IconPlayerPlay, IconZoomQuestion } from '@tabler/icons-svelte';
	import Footer from '../../lib/components/Footer.svelte';
	import Navbar from '../../lib/components/Navbar.svelte';

	export let data;
	let playerName = 'Guest';

	let sorter = 'time';
	const howToPlay = () => {
		Swal.fire({
			title: 'How to play?',
			html: `Click on the tiles to move them to the empty space. Arrange the tiles in ascending order to win!`,
			imageUrl: 'https://i.gifer.com/2Vo1.gif',
			imageHeight: 200,
			imageWidth: 200,
			imageAlt: 'How to play',
			confirmButtonText: 'Got it!',
			confirmButtonColor: '#4caf50',
			allowEnterKey: false,
			allowEscapeKey: false,
			allowOutsideClick: false
		});
	};

	const sortByTime = (arr) => {
		return arr.sort((a, b) => {
			return a.time - b.time;
		});
	};
	const sortByMove = (arr) => {
		return arr.sort((a, b) => {
			return a.move - b.move;
		});
	};
	const sortByDate = (arr) => {
		return arr.sort((a, b) => {
			return new Date(b.created_at) - new Date(a.created_at);
		});
	};

	const sortData = (arr) => {
		if (sorter === 'time') {
			return sortByTime(arr);
		} else if (sorter === 'move') {
			return sortByMove(arr);
		} else if (sorter === 'date') {
			return sortByDate(arr);
		}
	};

	console.log();
	const loadPlayerName = () => {
		if (browser) {
			if (localStorage.getItem('playerName')) {
				playerName = localStorage.getItem('playerName');
			}
		}
	};

	$: loadPlayerName();
</script>

<div class="min-h-screen w-screen">
	<Navbar {playerName} />
	<main
		class="container min-h-[90vh] max-w-md mx-auto flex flex-col justify-center items-center text-center pt-4 pb-12"
	>
		<div class="text-center m-12 mb-2" id="title-section">
			<h2 class="text-4xl font-bold flex flex-row">
				<span><IconAward size="50" stroke="0.5" /></span> Leaderboard
				<span><IconAward size="50" stroke="0.5" /></span>
			</h2>
		</div>
		<div class="flex flex-col max-h-[35rem] overflow-x-auto" id="board-section">
			
			{#key sorter}
				<div class="overflow-x-auto">
					<table class="table table-primary table-lg table-pin-rows table-pin-cols">
						<thead>
							<tr class="text-lg font-bold">
								<th></th>
								<td><button>Name</button></td>
								<td><button on:click={() => sorter = "move"} class="flex flex-row">Move <span>{#if sorter == "move"}<IconArrowNarrowDown size=15 stroke=1 />{:else}<IconArrowNarrowUp size=15 stroke=1/>{/if}</span></button></td>
								<td><button on:click={() => sorter = "time"} class="flex flex-row">Time <span>{#if sorter == "time"}<IconArrowNarrowDown size=15 stroke=1 />{:else}<IconArrowNarrowUp size=15 stroke=1/>{/if}</span></button></td>
								<td><button on:click={() => sorter = "date"} class="flex flex-row">Played at <span>{#if sorter == "date"}<IconArrowNarrowDown size=15 stroke=1 />{:else}<IconArrowNarrowUp size=15 stroke=1/>{/if}</span></button></td>
								<th></th>
							</tr>
						</thead>
						<tbody class="text-md">
							{#each sortData(data.data) as player, i}
								<tr class={`${i == 0 ? "text-xl font-extrabold" : ""} ${i == 1 ? "text-lg font-bold" : ""} ${i == 2 ? "text-md font-semibold" : ""}`}>
									<th>{i + 1}{#if i == 0 }st{:else if i == 1}nd{:else if i == 2}rd{:else}th{/if}</th>
									<td>{player.name}</td>
									<td>{player.move}</td>
									<td>{player.time}s</td>
									<td>{new Date(player.created_at).toLocaleDateString() + " " +new Date(player.created_at).toLocaleTimeString()}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/key}

			<div class="min-w-full px-10 md:px-4" id="control-section">
				<a href="/"
					
					class="my-2 mt-4 min-w-full btn btn-success"
				>
					<IconPlayerPlay /> Let's play now
				</a>
				<button on:click={howToPlay} class="my-2 min-w-full btn btn-info"><IconZoomQuestion /> How to play? </button>
			</div>
		</div>
	</main>
	<Footer />
</div>

<svelte:head>
	<title>Leaderboard | 15 Puzzle Game | Made by ICKDEV</title>
	<meta name="description" content="Leaderboard | 15 Puzzle Game | Made by ICKDEV" />
	<meta property="og:title" content="Leaderboard | 15 Puzzle Game | Made by ICKDEV" />
	<meta property="og:description" content="Leaderboard | 15 Puzzle Game | Made by ICKDEV" />
	<meta property="og:image" content="https://i.gifer.com/2Vo1.gif" />
	<meta property="og:url" content="https://15puzzle.games.iamickdev.com/rank" />
	<meta name="twitter:title" content="Leaderboard | 15 Puzzle Game | Made by ICKDEV" />
	<meta name="twitter:description" content="Leaderboard | 15 Puzzle Game | Made by ICKDEV" />
	<meta name="twitter:image" content="https://i.gifer.com/2Vo1.gif" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@arnon_sng" />
	<meta name="twitter:site" content="@arnon_sng" />
	<meta name="twitter:domain" content="https://15puzzle.games.iamickdev.com/rank" />
	<meta name="twitter:image:alt" content="Leaderboard | 15 Puzzle Game | Made by ICKDEV" />
	<meta name="twitter:image:alt" content="Leaderboard | 15 Puzzle Game | Made by ICKDEV" />
</svelte:head>