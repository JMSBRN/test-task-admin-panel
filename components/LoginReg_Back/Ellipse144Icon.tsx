import { SVGProps, memo } from 'react';

const Ellipse144Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg 
  preserveAspectRatio='none'
   viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <circle cx={4} cy={4} r={4} fill='white' stroke='#151515' />
  </svg>
);
const Memo = memo(Ellipse144Icon);

export { Memo as Ellipse144Icon };
