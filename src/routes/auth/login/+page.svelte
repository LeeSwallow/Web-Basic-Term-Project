<script lang="ts">
import { goto } from '$app/navigation';
import { onMount } from 'svelte';
import * as auth from '$lib/client/auth';
import { validateLoginForm } from '$lib/client/validate';
import type { LoginForm, InputError } from '$lib/client/validate';

let loginForm = $state({ email: '', password: '' } as LoginForm);
let errors: InputError[] = $state([]);
type InputStyle = 'input-neutral' | 'input-error';
let changeInputStyle : (input: HTMLInputElement, style: InputStyle) => void;
let resetLoginForm : () => void;
let validate: () => boolean;
let onLogin : () => Promise<void>;

onMount(() => {
    const inputHtmlForms : { email: HTMLInputElement, password: HTMLInputElement } = {
        email: document.getElementById('email') as HTMLInputElement,
        password: document.getElementById('password') as HTMLInputElement,
    };

    changeInputStyle = (input: HTMLInputElement, style: InputStyle) => {
        if (style === 'input-neutral') input.classList.remove('input-error');
        else input.classList.remove('input-neutral');
        input.classList.add(style);
    };

    resetLoginForm = () => {
        errors = [];
        for (const input of Object.values(inputHtmlForms)) {
            changeInputStyle(input, 'input-neutral');
        }
    };

    validate = () => {
        errors = validateLoginForm(loginForm);
        if (errors.length > 0) {
            errors.forEach(error => changeInputStyle(inputHtmlForms[error.field as keyof typeof inputHtmlForms], 'input-error'));
        }
        return errors.length === 0;
    };

    onLogin = async () => {
        resetLoginForm();
        if (!validate()) return;
        const hashedPassword = await auth.hashPassword(loginForm.password);
        errors = [];
        fetch('/api/sessions', {
            method: 'POST',
            body: JSON.stringify({
                email: loginForm.email,
                password: hashedPassword
            })
        }).then(res => {
            if (res.ok) {
                console.log('로그인 성공');
                res.json().then(data => {
                    auth.setSessionTokenCookie(data.token);
                    goto('/');
                });

            } else {
                console.log('로그인 실패');
                errors.push({ field: 'password', message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
            }
        }).catch(err => {
            console.log('로그인 실패');
            errors.push({ field: 'password', message: '이메일 또는 비밀번호가 올바르지 않습니다.'});
        });
    }
});
</script>

<section class="card-section">
    <form class="form-section" action="#">
        
        <h1 class="text-2xl font-bold mb-6">사용자 로그인</h1>
        
        {#if errors.length > 0}
        <div role="alert" class="alert alert-error alert-soft">
            <p class="text-sm">{errors[0].message}</p>
        </div>
        {/if}

        <div class="input-section">

            <div class="flex flex-col w-full space-y-2 justify-between items-start">
                <label for="email" class="text-sm font-bold">이메일 : </label>
                <input type="email" name="email" id="email" class="w-full input input-neutral" bind:value={loginForm.email} placeholder="name@company.com" required>
            </div>
            <div class="flex flex-col w-full space-y-2 justify-between items-start">
            <label for="password" class="text-sm font-bold">비밀번호 : </label>
                <input type="password" name="password" id="password" class="w-full input input-neutral" bind:value={loginForm.password} placeholder="••••••••" required>
            </div>
        </div>

        <div class="submit-section">
            <div class="flex flex-row justify-between w-full space-x-4">
                <p class="text-sm font-bold text-base-400">아직 회원가입을 하지 않았습니까?</p>
                <a href="/users/signup" class="text-sm font-bold text-primary hover:text-primary-focus">회원가입</a>
            </div>
            <button type="button" class="flex btn btn-primary w-full" onclick={()=>onLogin()}>로그인</button>
        </div>

    </form>

</section>

<style lang="postcss">
@import '../form.postcss';
</style>
