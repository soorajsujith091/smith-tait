import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    let isAuthenticated = false;

    // Check users.json first
    try {
      const fs = require('fs');
      const path = require('path');
      const usersPath = path.join(process.cwd(), 'src', 'data', 'users.json');
      if (fs.existsSync(usersPath)) {
        const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
        const userMatch = users.find((u: any) => u.email === email && u.password === password);
        if (userMatch) isAuthenticated = true;
      }
    } catch (err) {
      console.error("Failed reading users.json", err);
    }

    // Fallback to ENV
    if (!isAuthenticated && email === adminEmail && password === adminPassword) {
      isAuthenticated = true;
    }

    if (isAuthenticated) {
      // Create response
      const response = NextResponse.json(
        { success: true, message: 'Logged in successfully' },
        { status: 200 }
      );

      // Set auth cookies
      const secret = process.env.SESSION_SECRET || 'fallback-secret';
      
      response.cookies.set({
        name: 'admin_session',
        value: secret,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      response.cookies.set({
        name: 'admin_email',
        value: email,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
