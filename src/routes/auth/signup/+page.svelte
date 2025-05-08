<script lang="ts">
    import { hashPassword } from '$lib/client/auth';
    import { onMount } from 'svelte';
    let loginForm : {
        name: string,
        email: string,
        password: string,
        password2: string,
    } = {
        name: "",
        email: "",
        password: "",
        password2: "",
    };
    let errors: string[] = [];

    type InputStyle = 'input-neutral' | 'input-error';

    function changeInputStyle(input: HTMLInputElement, style: InputStyle) {
        if (style === 'input-neutral') input.classList.add('input-neutral');
        else input.classList.remove('input-neutral');
        
        if (style === 'input-error') input.classList.add('input-error');
        else input.classList.remove('input-error');
    }

    function resetForm() {
        errors = [];
        changeInputStyle(document.getElementById('name') as HTMLInputElement, 'input-neutral');
        changeInputStyle(document.getElementById('email') as HTMLInputElement, 'input-neutral');
        changeInputStyle(document.getElementById('password') as HTMLInputElement, 'input-neutral');
        changeInputStyle(document.getElementById('password2') as HTMLInputElement, 'input-neutral');
    }
    
    function validate() {
        if (!loginForm.name) {
            errors.push('닉네임을 입력해주세요.');
            changeInputStyle(document.getElementById('name') as HTMLInputElement, 'input-error');
        }
        
        if (!loginForm.email) {
            errors.push('이메일을 입력해주세요.');
            changeInputStyle(document.getElementById('email') as HTMLInputElement, 'input-error');
        } else if (!loginForm.email.includes('@')) {
            errors.push('이메일 형식이 올바르지 않습니다.');
            changeInputStyle(document.getElementById('email') as HTMLInputElement, 'input-error');
        }

        if (!loginForm.password) {
            errors.push('비밀번호를 입력해주세요.');
            changeInputStyle(document.getElementById('password') as HTMLInputElement, 'input-error');
        }
        if (loginForm.password !== loginForm.password2) {
            errors.push('비밀번호가 일치하지 않습니다.');
            changeInputStyle(document.getElementById('password2') as HTMLInputElement, 'input-error');
        }
        return errors.length === 0;
    }

    async function signup() {
        resetForm();
        if (!validate()) return;
        const hashedPassword = await hashPassword(loginForm.password);

        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                name: loginForm.name,
                email: loginForm.email,
                password: hashedPassword,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            errors.push('회원가입에 실패했습니다.');
        }
    }

    onMount(() => {
        resetForm();
        loginForm = { name : "", email : "", password : "", password2 : "" };
        errors = [];
    });
</script>


<section class="bg-base-100 p-5 w-[50vw] max-h-[100vh] flex flex-col overflow-y-auto">
    {#if errors.length > 0}
        <div class="alert alert-error">
            <p>{errors[0]}</p>
        </div>
    {/if}
    <form class="flex flex-col w-full justify-between h-full space-y-4" action="#">
        <h1 class="text-2xl font-bold mb-6">사용자 회원가입</h1>
        
        <div class="card bg-base-300 p-6 flex flex-col w-full space-y-4">
            <div class="flex flex-col w-full space-y-2 justify-between items-start">
                <label for="name" class="signup-label">닉네임: </label>
                <input type="text" name="name" id="name" class="w-full input input-neutral" bind:value={loginForm.name} required>
            </div>

            <div class="flex flex-col w-full space-y-2 justify-between items-start">
                <label for="email" class="signup-label">이메일 : </label>
                <input type="email" name="email" id="email" class="w-full input input-neutral" bind:value={loginForm.email} placeholder="name@company.com" required>
            </div>
            <div class="flex flex-col w-full space-y-2 justify-between items-start">
                <label for="password" class="signup-label">비밀번호 : </label>
                <input type="password" name="password" id="password" class="w-full input input-neutral" bind:value={loginForm.password} placeholder="••••••••" required>
            </div>
            <div class="flex flex-col w-full space-y-2 justify-between items-start">
                <label for="password2" class="signup-label">비밀번호 확인 : </label>
                <input type="password" name="password2" id="password2" class="w-full input input-neutral" bind:value={loginForm.password2} placeholder="••••••••" required>
            </div>
        </div>
    
        <div class="flex flex-col w-full space-y-4">
            <button type="submit" class="flex btn btn-primary w-full" onclick={() => signup()}>회원가입</button>
        </div>
    </form>
    </section>
    
    <style lang="postcss">
    @reference  'tailwindcss';
    @plugin "daisyui" { themes: light --default, dark --prefersdark; }
    
    .signup-label {
        @apply text-sm font-bold;
        text-align: left;
    }
</style>