<script>
	import { writable } from 'svelte/store';
	import Tile from '../lib/components/Tile.svelte';
	import Swal from 'sweetalert2';
	import Navbar from '../lib/components/Navbar.svelte';
	import Footer from '../lib/components/Footer.svelte';

	//game variables
	let moveCount = writable(0);
	let time = writable(0);
	let isStarted = false;
	let puzzle = [];
	let currentWhiteIndex = 15;

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
			 if(confirm("Are you sure you want to restart?")){
			     window.location.reload();
			 }
			
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
			console.log(puzzle);
			console.log(currentWhiteIndex);
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
	let moveTile = (index) => {
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
							Swal.fire({
								title: 'Congratulations!',
								html: `You solved the puzzle in <b>${$time}</b> seconds and <b>${$moveCount}</b> moves!`,
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
</script>

<div class="container min-h-screen min-w-full">
	<Navbar {time} {moveCount} {isStarted} />
	<main
		class="container min-h-[90vh] max-w-md mx-auto flex flex-col justify-center items-center text-center"
	>
		<div class="text-center m-12" id="title-section">
			<h1 class="font-bold text-2xl">15 Puzzle Game</h1>
			<div class="text-xl mt-4">
				<p>Time : {$time}</p>
				<p>Move : {$moveCount}</p>
			</div>
		</div>

		<div class="grid grid-cols-4 min-w-full" id="board-section">
			{#if isStarted}
				{#key currentWhiteIndex}
					{#each newPuzzle as { value, index }}
						<Tile {value} {index} {moveTile} />
					{/each}
				{/key}
			{/if}
		</div>

		<div class="min-w-full" id="control-section">
			<button
				on:click={startGame}
				class={`my-2 min-w-full btn  ${isStarted ? 'btn-warning' : 'btn-success'}`}
			>
				{isStarted ? 'Restart' : 'Start'}
			</button>

			<button on:click={howToPlay} class="my-2 min-w-full btn btn-info"> How to play? </button>
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