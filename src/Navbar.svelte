<nav class="navbar">
    <div class="flex items-center">
        <button class="btn btn-primary">로그인</button>
    </div>
    <div class="flex items-center">
        <button class="btn btn-primary">로그인</button>
    </div>
</nav>

<style>
    @reference tailwindcss;
    @plugin "daisyui" { themes: light --default, dark --prefersdark; }

    .navbar {
        @apply bg-base-100;
        min-height: 5vh;
    }
</style>

