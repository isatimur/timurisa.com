import { BookOpen } from 'lucide-react';
import type { CaseStudyBookTieIn } from '@/src/constants/caseStudies';

export function BookTieIn({ tieIn }: { tieIn: CaseStudyBookTieIn }) {
    return (
        <a
            href={tieIn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="case-card mt-6 flex items-center gap-3 rounded-xl border px-4 py-3.5 text-sm text-slate-300 hover:text-white transition-colors"
        >
            <BookOpen className="w-4 h-4 shrink-0" style={{ color: 'var(--case-accent)' }} />
            <span>
                Cited in <span className="font-semibold text-white">From Copilot to Colleague</span> — &ldquo;{tieIn.chapterTitle}&rdquo;
            </span>
        </a>
    );
}
