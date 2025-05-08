<script lang="ts">
import { goto } from '$app/navigation';
import { onMount } from 'svelte';
import * as auth from '$lib/client/auth';

let loginForm = $state({
    email: '',
    password: ''
});
let errors : string[] = $state([]);

type InputStyle = 'input-neutral' | 'input-error';

function changeInputStyle(input: HTMLInputElement, style: InputStyle) {
    if (style === 'input-neutral') {
        input.classList.remove('input-error');
    } else {
        input.classList.remove('input-neutral');
    }
    input.classList.add(style);
}

function resetLoginForm() {
    changeInputStyle(document.getElementById('email') as HTMLInputElement, 'input-neutral');
    changeInputStyle(document.getElementById('password') as HTMLInputElement, 'input-neutral');
}

function validate() {
    errors = [];
    if (loginForm.email === '') {
        changeInputStyle(document.getElementById('email') as HTMLInputElement, 'input-error');
        errors.push('이메일을 입력해주세요.');
    } else if (!loginForm.email.includes('@')) {
        changeInputStyle(document.getElementById('email') as HTMLInputElement, 'input-error');
        errors.push('이메일 형식이 올바르지 않습니다.');
    }
    if (loginForm.password === '') {
        changeInputStyle(document.getElementById('password') as HTMLInputElement, 'input-error');
        errors.push('비밀번호를 입력해주세요.');
    }
    return errors.length === 0;
}

async function onLogin() {
    resetLoginForm();
    if (!validate()) return;
    const hashedPassword = await auth.hashPassword(loginForm.password);
    errors = [];
    fetch('/api/sessions', {
        method: 'POST',
        body: JSON.stringify({ email: loginForm.email, password: hashedPassword })
    }).then(res => {
        if (res.ok) {
            console.log('로그인 성공');
            res.json().then(data => {
                auth.setSessionTokenCookie(data.token);
                goto('/');
            });

        } else {
            console.log('로그인 실패');
            errors.push('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
    }).catch(err => {
        console.log('로그인 실패');
        errors.push('이메일 또는 비밀번호가 올바르지 않습니다.');
    });
}
onMount(() => {
    resetLoginForm();
});

</script>


<section class="bg-base-100 p-5 w-[50vw] max-h-[100vh] flex flex-col overflow-y-auto">

<form class="flex flex-col w-full justify-between h-full space-y-4" action="#">
    <h1 class="text-2xl font-bold mb-6">사용자 로그인</h1>
    
    {#if errors.length > 0}
    <div class="alert alert-error">
        <p class="text-sm text-white">{errors[0]}</p>
    </div>
    {/if}

    <div class="card bg-base-300 p-6 flex flex-col w-full space-y-4">
    <div class="flex flex-col w-full space-y-2 justify-between items-start">
        <label for="email" class="login-label">이메일 : </label>
        <input type="email" name="email" id="email" class="w-full input input-neutral" bind:value={loginForm.email} placeholder="name@company.com" required>
    </div>
    <div class="flex flex-col w-full space-y-2 justify-between items-start">
        <label for="password" class="login-label">비밀번호 : </label>
        <input type="password" name="password" id="password" class="w-full input input-neutral" bind:value={loginForm.password} placeholder="••••••••" required>
    </div>

</div>

    <div class="flex flex-col w-full space-y-4">
        <div class="flex flex-row justify-between w-full space-x-4">
            <p class="text-sm font-bold text-base-400">아직 회원가입을 하지 않았습니까?</p>
            <a href="/users/signup" class="text-sm font-bold text-primary hover:text-primary-focus">회원가입</a>
        </div>

        <button type="button" class="flex btn btn-primary w-full" onclick={()=>onLogin()}>로그인</button>
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


</style>