import { FC, SVGProps } from 'react';

export const Logo: FC<SVGProps<SVGSVGElement>> = props => (
    <svg
        viewBox='0 0 1024 1024'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}>
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M285.571 466.75V376.25C285.571 316.245 309.427 258.697 351.891 216.267C394.354 173.837 451.947 150 512 150C572.053 150 629.646 173.837 672.109 216.267C714.573 258.697 738.429 316.245 738.429 376.25V466.75C762.45 466.75 785.487 476.285 802.472 493.257C819.458 510.229 829 533.248 829 557.25V783.5C829 807.502 819.458 830.521 802.472 847.493C785.487 864.465 762.45 874 738.429 874H285.571C261.55 874 238.513 864.465 221.528 847.493C204.542 830.521 195 807.502 195 783.5V557.25C195 533.248 204.542 510.229 221.528 493.257C238.513 476.285 261.55 466.75 285.571 466.75V466.75ZM647.857 376.25V466.75H376.143V376.25C376.143 340.247 390.456 305.718 415.934 280.26C441.413 254.802 475.968 240.5 512 240.5C548.032 240.5 582.587 254.802 608.066 280.26C633.544 305.718 647.857 340.247 647.857 376.25V376.25Z'
            fill='currentColor'
        />
    </svg>
);
