import { SVGProps, memo } from 'react';

const Vector4Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none'
   viewBox='0 0 130 108' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      // eslint-disable-next-line max-len
      d='M129.5 0V32.75C129.5 34.9591 127.709 36.75 125.5 36.75H4C1.79086 36.75 0 38.5409 0 40.75V107.5'
      stroke='#B1B5C3'
      strokeDasharray='5 5'
    />
  </svg>
);
const Memo = memo(Vector4Icon);

export { Memo as Vector4Icon };
