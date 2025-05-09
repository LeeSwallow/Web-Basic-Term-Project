
export type LoginForm = { email: string, password: string };
export type SignupForm = { name: string, email: string, password: string, password2: string };
export type InputError = { field: string, message: string };

export function validateLoginForm(loginForm: LoginForm): InputError[] {
    const errors: InputError[] = [];
    const emailError = validateEmail(loginForm.email);
    const passwordError = validatePassword(loginForm.password);
    if (emailError) errors.push(emailError);
    if (passwordError) errors.push(passwordError);

    return errors;
}
export function validateSignupForm(signupForm: SignupForm): InputError[] {
    const errors: InputError[] = [];
    const nameError = validateName(signupForm.name);
    const emailError = validateEmail(signupForm.email);
    const passwordError = validatePassword(signupForm.password);
    const password2Error = validatePassword2(signupForm.password, signupForm.password2);

    if (nameError) errors.push(nameError);
    if (emailError) errors.push(emailError);
    if (passwordError) errors.push(passwordError);
    if (password2Error) errors.push(password2Error);

    return errors;
}

function validateName(name: string): InputError | null {
    if (name === '') {
        return { field: 'name', message: '이름을 입력해주세요.' };
    } else if (name.length < 5) {
        return { field: 'name', message: '이름은 5자 이상이어야 합니다.' };
    }
    return null;
}

function validateEmail(email: string): InputError | null {
    if (email === '') {
        return { field: 'email', message: '이메일을 입력해주세요.' };
    } else if (!email.includes('@')) {
        return { field: 'email', message: '이메일 형식이 올바르지 않습니다.' };
    } else if (email.length < 5 && email.length > 255) {
        return { field: 'email', message: '이메일은 5자 이상 255자 이하여야 합니다.' };
    }
    return null;
}

function validatePassword(password: string): InputError | null {
    if (password === '') {
        return { field: 'password', message: '비밀번호를 입력해주세요.' };
    } else if (password.length < 8 && password.length > 255) {
        return { field: 'password', message: '비밀번호는 8자 이상 255자 이하여야 합니다.' };
    }
    return null;
}

function validatePassword2(password: string, password2: string): InputError | null {
    if (password !== password2) {
        return { field: 'password2', message: '비밀번호가 일치하지 않습니다.' };
    }
    return null;
}
