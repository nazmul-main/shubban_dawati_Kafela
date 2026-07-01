/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useActionState } from 'react';
import Link from 'next/link';
import { ArrowLeft, KeyRound, Mail, ShieldCheck } from 'lucide-react';
import { authenticate } from '@/actions/auth';
import styles from './Login.module.css';

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <div className={styles.logoCircle}>
            <ShieldCheck color="#fff" size={32} />
          </div>
        </div>
        
        <h1 className={styles.title}>Admin Portal</h1>
        <p className={styles.subtitle}>Sign in to manage Shubban Dawah Kafela</p>

        <form action={formAction} className={styles.form}>
          {errorMessage && (
            <div className={styles.error}>
              <span>⚠️</span>
              {errorMessage}
            </div>
          )}

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">
              Email Address
            </label>
            <input
              className={styles.input}
              id="email"
              type="email"
              name="email"
              placeholder="admin@shubban.org"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.input}
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={isPending}
          >
            {isPending ? 'Authenticating...' : 'Secure Sign In'}
          </button>
        </form>

        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={16} />
          Return to Website
        </Link>
      </div>
    </div>
  );
}
