import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { CaseStudy } from '@/src/constants/caseStudies';

export function CaseFileHeader({ caseStudy }: { caseStudy: CaseStudy }) {
    const logId = caseStudy.slug.toUpperCase();

    return (
        <header className="max-w-[740px] mx-auto px-4 pt-28 pb-10">
            <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors mb-8"
            >
                <ArrowLeft className="w-3.5 h-3.5" />
                All Projects
            </Link>

            <div className="case-eyebrow mb-4">CASE_FILE // {logId}.LOG</div>

            <h1 className="case-title text-4xl md:text-5xl font-bold leading-tight mb-4">
                {caseStudy.projectRef}
            </h1>

            <p className="text-sm font-mono text-slate-400 mb-6">
                {caseStudy.role} · {caseStudy.company} · {caseStudy.timeframe}
                {caseStudy.awards ? ` · ${caseStudy.awards}` : ''}
            </p>

            <p className="text-lg text-slate-300 font-light leading-relaxed">
                {caseStudy.hook}
            </p>
        </header>
    );
}
