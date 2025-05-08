<script lang="ts">
let email;
let password;

</script>


<section class="bg-base-100 p-1 min-w-[400px] w-[50vw] flex flex-col overflow-y-auto">

<form class="flex flex-col w-full justify-between h-full space-y-4" action="#">
    <h1 class="text-2xl font-bold mb-6">사용자 로그인</h1>
    
    <div class="card bg-base-300 p-6 flex flex-col w-full space-y-4">
    <div class="flex flex-col w-full space-y-2 justify-between items-start">
        <label for="email" class="login-label">이메일 : </label>
        <input type="email" name="email" id="email" class="login-input" placeholder="name@company.com" required>
    </div>
    <div class="flex flex-col w-full space-y-2 justify-between items-start">
        <label for="password" class="login-label">비밀번호 : </label>
        <input type="password" name="password" id="password" class="login-input" placeholder="••••••••" required>
    </div>

</div>

    <div class="flex flex-col w-full space-y-4">
        <div class="flex flex-row justify-between w-full space-x-4">
            <p class="text-sm font-bold text-base-400">아직 회원가입을 하지 않았습니까?</p>
            <a href="/users/signup" class="text-sm font-bold text-primary hover:text-primary-focus">회원가입</a>
        </div>

        <button type="submit" class="flex btn btn-primary w-full">로그인</button>
    </div>
</form>
</section>

<style lang="postcss">
@reference  'tailwindcss';
@plugin "daisyui" { themes: light --default, dark --prefersdark; }

.login-label {
    @apply text-sm font-bold;
    text-align: left;
}

.login-input {
    @apply input input-md;
    width: 100%;
}


</style>