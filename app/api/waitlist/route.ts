import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
    try {
        const { name, email, language } = await request.json()

        // 1. Add to Supabase
        const { error: supabaseError } = await supabase
            .from('waitlist')
            .insert([{ name, email }])

        if (supabaseError) {
            console.error('Supabase error:', supabaseError)
            return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
        }

        // 2. Send Email via Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        })

        let subject = 'Welcome to Luggy! 📦'
        let htmlContent = `
        <h1>📦 Yo ${name}, welcome to Luggy!</h1>
        <br>
        <p>You’re officially on the waitlist 🎉</p>
        <br>
        <p>We’ll hit you up when we launch.</p>
        <br>
        <p>Thanks for being early—this is gonna be lit 💙</p>
        <br>
        <p>—Team Luggy</p>
      `

        if (language === 'ko') {
            subject = `📦 안녕 ${name}, Luggy에 온 걸 환영해!`
            htmlContent = `
        <h1>📦 안녕 ${name}, Luggy에 온 걸 환영해!</h1>
        <p>넌 이제 공식적으로 웨이트리스트에 등록됐어 🎉</p>
        <br>
        <p>런칭할 때 바로 알려줄게.</p>
        <br>
        <p>일찍 참여해줘서 고마워—완전 꿀잼 될 거야 💙</p>
        <br>
        <p>—Team Luggy</p>
      `
        }

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: subject,
            html: htmlContent,
        }

        console.log('Sending email to:', email)
        await transporter.sendMail(mailOptions)
        console.log('Email sent successfully')

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Server error:', error)
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
    }
}
