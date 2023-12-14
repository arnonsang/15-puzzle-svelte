<!-- theme-switcher.svelte -->
<script> 
    import { IconMoonFilled, IconSunFilled } from '@tabler/icons-svelte'
    let darkMode = false;
    let animating = false;
    let themeButton;
    // Check if the user has a preference for dark mode

    function toggleTheme() {
      if (!animating) {
        animating = true;
        darkMode = !darkMode;
        //change body data-theme
        document.body.dataset.theme = darkMode ? 'dark' : 'light';
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
        //change button animation
        themeButton.animate(
          [
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(360deg)' }
          ],
          {
            duration: 500,
            fill: 'forwards'
          }
        );
        // Add a small delay to allow the animation to complete
        setTimeout(() => {
          animating = false;
        }, 300); // Adjust the delay time as needed
      }
    }

  </script>
  
  <button
    class="px-4 py-2 rounded-lg text-whit outline-none transition-transform duration-1000"
    class:opacity-50={animating}
    on:click={toggleTheme}
    bind:this={themeButton}
  >
    <svelte:component this={darkMode ? IconSunFilled : IconMoonFilled} size={25} />
  </button>
  