<script>
	import { writable } from 'svelte/store';
	import Tile from '../lib/components/Tile.svelte';
	import Swal from 'sweetalert2';
	import Navbar from '../lib/components/Navbar.svelte';
	import Footer from '../lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	import { IconCrown, IconFlagFilled, IconPlayerPlay, IconZoomQuestion } from '@tabler/icons-svelte';
	import { browser } from '$app/environment';
	export let data;

	//game variables
	let moveCount = writable(0);
	let time = writable(0);
	let isStarted = false;
	let puzzle = [];
	let leaderboard = [];
	let currentWhiteIndex = 15;
	let playerName = 'Guest';

	//generate new puzzle array
	const newPuzzle = new Array(16)
		.fill(0)
		.map((_, i) => i + 1)
		.sort(() => Math.random() - 0.5)
		.map((value, index) => {
			return { value, index };
		});

	//game start
	const startGame = () => {
		if (isStarted) {
			Swal.fire({
				title: 'Are you sure?',
				text: 'You will lose your progress!',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#4caf50',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, give up!',
				allowEnterKey: false,
				allowEscapeKey: false,
				allowOutsideClick: false
			}).then((result) => {
				if (result.isConfirmed) {
					localStorage.clear();
					window.location.reload();
				}
			});
		} else {
			puzzle = newPuzzle;
			isStarted = true;
			setInterval(() => {
				time.update((t) => t + 1);
			}, 1000);
			currentWhiteIndex = puzzle.findIndex((item) => {
				if (item.value === 16) {
					return item.index;
				}
			});
			Swal.fire({
				text: 'Good luck!',
				showConfirmButton: false,
				timer: 1000,
				toast: true,
				position: 'bottom'
			});
		}
	};

	const savePlayerName = () => {
		if (browser) {
			localStorage.setItem('playerName', playerName);
		}
	};

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

	//move tile, game logic, update moveCount
	const moveTile = (index) => {
		return () => {
			if (isStarted) {
				let whiteIndex = currentWhiteIndex;
				let whiteRow = Math.floor(whiteIndex / 4);
				let whiteCol = whiteIndex % 4;
				let clickedRow = Math.floor(index / 4);
				let clickedCol = index % 4;
				let rowDiff = Math.abs(whiteRow - clickedRow);
				let colDiff = Math.abs(whiteCol - clickedCol);
				if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
					//swap and update currentWhiteIndex and moveCount and new index of swapped tile
					let temp = puzzle[index];
					puzzle[index] = { ...puzzle[whiteIndex], index };
					puzzle[whiteIndex] = { ...temp, index: whiteIndex };
					currentWhiteIndex = index;
					moveCount.update((m) => m + 1);
					//check if puzzle is solved
					if (puzzle.every((item, index) => item.value === index + 1)) {
						setTimeout(() => {
							fetch(encodeURI(`https://www.iamickdev.com/api/games/15puzzle?name=${playerName}&move=${$moveCount}&time=${$time}`), {
								method: 'GET'
							})
								.then((res) => res.json())
								.then((data) => {
									console.log(data);
								})
								.catch((err) => {
									console.log(err);
								}
								);
							Swal.fire({
								title: `Congratulations, ${playerName}!`,
								html: `You solved the puzzle in <b>${$moveCount}</b> moves and <b>${$time}</b> seconds!`,
								imageUrl: 'https://i.gifer.com/8i79.gif',
								confirmButtonText: 'Play again!',
								confirmButtonColor: '#4caf50',
								allowEnterKey: false,
								allowEscapeKey: false,
								allowOutsideClick: false
							}).then((result) => {
								if (result.isConfirmed) {
									window.location.reload();
								}
							});
						}, 200);
					}
				}
			}
		};
	};

	onMount(() => {
		leaderboard = data.data;
		Swal.fire({
			title: 'Hello, Who are you?',
			html: `Enter your name to start the game`,
			input: 'text',
			inputAttributes: {
				autocapitalize: 'off'
			},
			inputAutoFocus: true,
			inputPlaceholder: 'Enter your name for the leaderboard celebration!',
			showCancelButton: false,
			confirmButtonText: 'Start!',
			confirmButtonColor: '#4caf50',
			allowEnterKey: false,
			allowEscapeKey: false,
			allowOutsideClick: false,
			preConfirm: (name) => {
				if (name) {
					console.log(leaderboard);
					const isNameExist = leaderboard.some((item) => item.name === name);
					if (isNameExist) {
						Swal.showValidationMessage(`Name already exist, please enter another name`);
					} else {
						playerName = name;
						savePlayerName();
						Swal.fire({
							title: 'Welcome!',
							html: `Hello <b>${name}</b>!`,
							icon: 'success',
							showConfirmButton: false,
							timer: 1000,
							toast: true,
							position: 'top-end'
						});
					}
				} else {
					Swal.showValidationMessage(`Please enter your name`);
				}
			}
		});
	});
</script>

<div class="min-h-screen w-screen">
	<Navbar {time} {moveCount} {isStarted} {playerName} />

	<main
		class="container min-h-[90vh] max-w-md mx-auto flex flex-col justify-center items-center text-center pt-4 pb-12"
	>
		<div class="text-center m-12 mb-2" id="title-section">
			<h1 class="text-4xl font-bold">15 Puzzle Game</h1>
			{#if isStarted}
				<p class="text-sm mt-2">Move the tiles to arrange them in ascending order</p>
			{:else}
				<p class="text-xl">
					Made by <a href="https://www.iamickdev.com" class="link-primary hover:link-hover"
						>Arnon Sang-ngern</a
					>
				</p>
				<img src="https://i.gifer.com/PYh.gif" alt="nyan cat running" class="h-72" />
			{/if}
		</div>

		<div class="grid grid-cols-4 min-w-full px-10 md:px-4" id="board-section">
			{#if isStarted}
				{#key currentWhiteIndex}
					{#each newPuzzle as { value, index }}
						<Tile {value} {index} {moveTile} />
					{/each}
				{/key}
			{/if}
		</div>

		<div class="min-w-full px-10 md:px-4" id="control-section">
			<button
				on:click={startGame}
				class={`my-2 mt-4 min-w-full btn  ${isStarted ? 'btn-warning' : 'btn-success'}`}
			>
				{#if isStarted}<IconFlagFilled /> Give up!{:else}<IconPlayerPlay /> Start{/if}
			</button>
			{#if !isStarted}
			<a href="/rank" class="my-2 min-w-full btn btn-secondary"><IconCrown /> Leaderboard</a>
			{/if}
			<button on:click={howToPlay} class="my-2 min-w-full btn btn-info"><IconZoomQuestion /> How to play? </button>
		</div>
	</main>
	<Footer />
</div>

<svelte:head>
	<title>15 Puzzle Game | Made by ICKDEV</title>
	<meta name="description" content="15 Puzzle Game | Made by ICKDEV" />
	<meta property="og:title" content="15 Puzzle Game | Made by ICKDEV" />
	<meta property="og:description" content="15 Puzzle Game | Made by ICKDEV" />
	<meta property="og:image" content="https://i.gifer.com/2Vo1.gif" />
	<meta property="og:url" content="https://15puzzle.games.iamickdev.com/" />
	<meta name="twitter:title" content="15 Puzzle Game | Made by ICKDEV" />
	<meta name="twitter:description" content="15 Puzzle Game | Made by ICKDEV" />
	<meta name="twitter:image" content="https://i.gifer.com/2Vo1.gif" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@arnon_sng" />
	<meta name="twitter:site" content="@arnon_sng" />
	<meta name="twitter:domain" content="https://15puzzle.games.iamickdev.com/" />
	<meta name="twitter:image:alt" content="15 Puzzle Game | Made by ICKDEV" />
	<meta name="twitter:image:alt" content="15 Puzzle Game | Made by ICKDEV" />
</svelte:head>
