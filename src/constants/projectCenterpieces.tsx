import type { ReactNode } from 'react';
import { TopologyDiagram } from '@/src/components/case-study/TopologyDiagram';

const PROJECT_CENTERPIECES: Record<string, (accent: string) => ReactNode> = {
    'IDS Reactive Billing Platform': (accent) => <TopologyDiagram accent={accent} />,
};

export function getProjectCenterpiece(projectName: string, accent: string): ReactNode | null {
    const render = PROJECT_CENTERPIECES[projectName];
    return render ? render(accent) : null;
}
