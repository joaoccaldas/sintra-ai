'use client';
import { usePathname } from 'next/navigation';
/** The private local editorial workspace loads no analytics script. */
export default function Analytics(){
 const path=usePathname();
 if(process.env.NODE_ENV!=='production'||/(^|\/)studio(?:\/|$)/.test(path))return null;
 return <script defer data-domain="joaoccaldas.github.io" src="https://plausible.io/js/script.js"/>;
}
