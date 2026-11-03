import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MarketsPage from '@/components/MarketsPage';
import { USE_CASES_COUNT } from '@/lib/useCasesCount.generated';
export const metadata:Metadata={title:'Markets & Economy — Sintra AI',description:'Interactive currency histories and macroeconomic indicators for Sweden, Brazil, the US and the euro area.',alternates:{canonical:'https://joaoccaldas.github.io/sintra-ai/markets/'}};
export default function Page(){return <><Header total={USE_CASES_COUNT}/><main id="main-content"><MarketsPage/></main><Footer/></>;}
