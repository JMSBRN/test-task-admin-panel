import { SVGProps, memo } from 'react';

const Vector3Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none'
   viewBox='0 0 229 58' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M0 0V54C0 56.2091 1.79086 58 4 58H224.5C226.709 58 228.5 56.2091 228.5 54V30.5'
      stroke='#B1B5C3'
      strokeDasharray='5 5'
    />
  </svg>
);
const Memo = memo(Vector3Icon);

export { Memo as Vector3Icon };
