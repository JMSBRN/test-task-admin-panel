import { NextRequest, NextResponse } from 'next/server';

export const middleware = (req: NextRequest) => {
    const data = req.headers.get('Authorization');

    console.log('authorization', data);
    return NextResponse.next();
  };
  
  export const config = {
    matcher: ['/api/:path*']
  };
  