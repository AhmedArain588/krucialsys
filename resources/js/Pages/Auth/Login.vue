<script setup>
import { Head, useForm } from '@inertiajs/vue3';

const form = useForm({ email: '', password: '', remember: false });

const submit = () => form.post('/login', { onFinish: () => form.reset('password') });
</script>

<template>
    <Head title="Admin Login" />

    <div class="wrap">
        <form class="card" @submit.prevent="submit">
            <img :src="'/logo.png'" alt="Krucial Systems" class="mark" />
            <h1 class="title">Krucial Systems</h1>
            <p class="sub">Sign in to the admin panel</p>

            <label class="field">
                <span>Email</span>
                <input v-model="form.email" type="email" autocomplete="username" autofocus required />
            </label>

            <label class="field">
                <span>Password</span>
                <input v-model="form.password" type="password" autocomplete="current-password" required />
            </label>

            <p v-if="form.errors.email" class="error">{{ form.errors.email }}</p>

            <label class="remember">
                <input v-model="form.remember" type="checkbox" />
                <span>Keep me signed in</span>
            </label>

            <button class="submit" type="submit" :disabled="form.processing">
                {{ form.processing ? 'Signing in…' : 'Sign in' }}
            </button>

            <a href="/" class="back">← Back to site</a>
        </form>
    </div>
</template>

<style scoped>
.wrap {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #05060F; padding: 24px;
    font-family: 'Inter', sans-serif;
}
.card {
    width: 100%; max-width: 380px;
    background: #0C0F1E; border: 1px solid #1D2334;
    border-radius: 16px; padding: 34px 30px;
    display: flex; flex-direction: column;
    box-shadow: 0 30px 80px #0009;
}
.mark { width: 46px; height: 46px; border-radius: 10px; background: #fff; object-fit: contain; align-self: center; }
.title { font-family: 'Space Grotesk', sans-serif; color: #EEF0FF; font-size: 21px; font-weight: 700; text-align: center; margin: 16px 0 4px; }
.sub { color: #8892AA; font-size: 13px; text-align: center; margin: 0 0 24px; }

.field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 15px; }
.field span { color: #8892AA; font-size: 12px; font-weight: 600; letter-spacing: .04em; }
.field input {
    background: #05060F; border: 1px solid #232A3D; border-radius: 9px;
    padding: 11px 13px; color: #EEF0FF; font-size: 14px;
    font-family: inherit; outline: none; transition: border-color .16s;
}
.field input:focus { border-color: #0A84FF; }

.error { color: #FF4D5E; font-size: 13px; margin: 0 0 12px; }

.remember { display: flex; align-items: center; gap: 8px; color: #8892AA; font-size: 13px; margin-bottom: 20px; cursor: pointer; }
.remember input { accent-color: #0A84FF; }

.submit {
    background: #0A84FF; color: #fff; border: none; border-radius: 9px;
    padding: 12px; font-size: 14px; font-weight: 700; cursor: pointer;
    font-family: 'Space Grotesk', sans-serif; transition: opacity .16s;
}
.submit:hover { opacity: .9; }
.submit:disabled { opacity: .55; cursor: not-allowed; }

.back { color: #8892AA; font-size: 12px; text-align: center; text-decoration: none; margin-top: 18px; }
.back:hover { color: #0A84FF; }
</style>
