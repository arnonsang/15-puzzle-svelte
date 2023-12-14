<script>
	export let index;
	export let value;
    export let moveTile;
</script>

<button
	on:click={moveTile(index)}
	title={index}
	class={`border-2 border-black ${value === 16 ? 'bg-white' : 'bg-primary'} ${
		value === index + 1 && value !== 16 ? 'bg-success' : ''
	}  text-center text-primary-content font-bold p-4 `}
>
	{value === 16 ? '' : value}
</button>
