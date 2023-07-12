import { NextRequest, NextResponse } from 'next/server';

export const middleware = (req: NextRequest) => {
  const { cookies } = req;

  const isAuthenticated = cookies.get('token');

  if (req.nextUrl.pathname.startsWith('/api')) {
    if(!req.nextUrl.pathname.startsWith('/api/auth/')){
      if(isAuthenticated) {
        return NextResponse.next();
      } else {
        return NextResponse.rewrite(new URL('/unauthorized', req.url));
      }
    }
  }
  };
  
  export const config = {
    matcher: ['/:path*']
  };
  