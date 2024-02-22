import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cm = (...classes: ClassValue[]) => twMerge(clsx(classes));

export default cm;
