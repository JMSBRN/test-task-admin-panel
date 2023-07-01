import { SVGProps, memo } from 'react';

const Vector6Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none'
   viewBox='0 0 104 236' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      // eslint-disable-next-line max-len
      d='M34.5 236V114.5C34.5 112.291 36.2909 110.5 38.5 110.5H80.5M0 0H100C102.209 0 104 1.79086 104 4V86.5'
      stroke='#B1B5C3'
      strokeDasharray='5 5'
    />
  </svg>
);
const Memo = memo(Vector6Icon);

export { Memo as Vector6Icon };
