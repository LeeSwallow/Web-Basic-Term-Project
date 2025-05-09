<script lang="ts">
    import { hashPassword } from '$lib/client/auth';
    import { validateSignupForm } from '$lib/client/validate';
    import type { SignupForm, InputError } from '$lib/client/validate';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    type InputStyle = 'input-neutral' | 'input-error';
    let signupForm = $state({ name: '', email: '', password: '', password2: '' } as SignupForm);
    let errors: InputError[] = $state([]);;
    let inputHtmlForms : { name: HTMLInputElement, email: HTMLInputElement, password: HTMLInputElement, password2: HTMLInputElement };

    let changeInputStyle : (input: HTMLInputElement, style: InputStyle) => void;
    let resetSignupForm : () => void;
    let validate: () => boolean;
    let onSignup : () => Promise<void>;
    
    onMount(() => {
        inputHtmlForms = {
            name: document.getElementById('name') as HTMLInputElement,
            email: document.getElementById('email') as HTMLInputElement,
            password: document.getElementById('password') as HTMLInputElement,
            password2: document.getElementById('password2') as HTMLInputElement,
        };

        changeInputStyle = (input: HTMLInputElement, style: InputStyle) => {
            if (style === 'input-neutral') input.classList.remove('input-error');
            else input.classList.remove('input-neutral');
            input.classList.add(style);
        };

        resetSignupForm = () => {
            errors = [];
            changeInputStyle(inputHtmlForms.name, 'input-neutral');
            changeInputStyle(inputHtmlForms.email, 'input-neutral');
            changeInputStyle(inputHtmlForms.password, 'input-neutral');
            changeInputStyle(inputHtmlForms.password2, 'input-neutral');
        };

        validate = () => {
            errors = validateSignupForm(signupForm);
            if (errors.length > 0) {
                errors.forEach(error => changeInputStyle(inputHtmlForms[error.field as keyof typeof inputHtmlForms], 'input-error'));
            }
            return errors.length === 0;
        };

        onSignup = async () => {
            if (!validate()) return;
            const hashedPassword = await hashPassword(signupForm.password);

            const response = await fetch('/api/users', {   
                method: 'POST',
                body: JSON.stringify({
                    name: signupForm.name,
                    email: signupForm.email,
                    password: hashedPassword,
                }),
            });

            if (response.ok) {
                goto('/auth/login');
            } else {
                errors.push({ field: 'all', message: '회원가입에 실패했습니다.' });
            }
        };
    });
</script>


<section class="card-section">

    <form class="form-section" action="#">
        
        <h1 class="text-2xl font-bold mb-6">사용자 회원가입</h1>
        
        {#if errors.length > 0}
        <div class="alert alert-error alert-soft">
            <p class="text-sm">{errors[0].message}</p>
        </div>
        {/if}

        <div class="input-section">
            <div class="item">
                <label for="name" class="label">닉네임: </label>
                <input type="text" name="name" id="name" class="w-full input input-neutral" bind:value={signupForm.name} required>
            </div>

            <div class="item">
                <label for="email" class="label">이메일 : </label>
                <input type="email" name="email" id="email" class="w-full input input-neutral" bind:value={signupForm.email} placeholder="name@company.com" required>
            </div>
            
            <div class="item">
                <label for="password" class="label">비밀번호 : </label>
                <input type="password" name="password" id="password" class="w-full input input-neutral" bind:value={signupForm.password} placeholder="••••••••" required>
            </div>
            <div class="item">
                <label for="password2" class="label">비밀번호 확인 : </label>
                <input type="password" name="password2" id="password2" class="w-full input input-neutral" bind:value={signupForm.password2} placeholder="••••••••" required>
            </div>
        </div>
    
        <div class="submit-section">
            <button class="flex btn btn-primary w-full" type="button" onclick={onSignup}>회원가입</button>
        </div>
    </form>
</section>
    
<style lang="postcss">
    @import '../form.postcss';
</style>