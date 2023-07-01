import { SVGProps, memo } from 'react';

const Vector5Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none'
   viewBox='0 0 85 138' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M0 0H81C83.2091 0 85 1.79086 85 4V137.5' stroke='#B1B5C3' strokeDasharray='5 5' />
  </svg>
);
const Memo = memo(Vector5Icon);

export { Memo as Vector5Icon };
