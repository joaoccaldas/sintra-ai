import type { Metadata } from 'next';
import Header from '@/components/Header';
import { USE_CASES_COUNT } from '@/lib/useCasesCount.generated';
import Studio from './studio';
export const metadata:Metadata={title:'Studio — Sintra AI',description:'A local evidence-first editorial workspace.',robots:{index:false,follow:false}};
export default function Page(){return <><Header total={USE_CASES_COUNT}/><main id="main-content" className="pt-20"><Studio/></main></>}
