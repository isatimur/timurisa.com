import type { ReactNode } from 'react';
import { TopologyDiagram, type TopologyNode, type TopologyEdge } from '@/src/components/case-study/TopologyDiagram';
import { StatFunnel } from '@/src/components/case-study/StatFunnel';
import { BeforeAfter } from '@/src/components/case-study/BeforeAfter';
import { GoldenHourGrid } from '@/src/components/case-study/GoldenHourGrid';
import { IdsWorldLazy } from '@/src/components/case-study/IdsWorldLazy';

const GLORIFY_NODES: TopologyNode[] = [
    { id: 'drivewealth', x: 10, y: 80, w: 160, h: 64, title: 'DriveWealth', subtitle: 'Brokerage API' },
    { id: 'sqs', x: 200, y: 80, w: 140, h: 64, title: 'AWS SQS', subtitle: 'Event Queue' },
    { id: 'kafka', x: 380, y: 80, w: 140, h: 64, title: 'Kafka', subtitle: 'Event Bus' },
    { id: 'notification', x: 560, y: 80, w: 190, h: 64, title: 'Notification Service', subtitle: 'Azure Cloud' },
    { id: 'updates', x: 790, y: 80, w: 160, h: 64, title: 'Real-Time Updates', subtitle: 'Trade Activity' },
];

const GLORIFY_EDGES: TopologyEdge[] = [
    { from: 'drivewealth', to: 'sqs', path: 'M 170 112 L 200 112' },
    { from: 'sqs', to: 'kafka', path: 'M 340 112 L 380 112' },
    { from: 'kafka', to: 'notification', path: 'M 520 112 L 560 112' },
    { from: 'notification', to: 'updates', path: 'M 750 112 L 790 112' },
];

type Centerpiece = {
    heading: string;
    render: (accent: string) => ReactNode;
};

const PROJECT_CENTERPIECES: Record<string, Centerpiece> = {
    'IDS Reactive Billing Platform': {
        heading: 'The Topology',
        render: (accent) => <IdsWorldLazy accent={accent} />,
    },
    'Glorify Bank Brokerage Integration': {
        heading: 'The Event Path',
        render: (accent) => (
            <TopologyDiagram
                accent={accent}
                nodes={GLORIFY_NODES}
                edges={GLORIFY_EDGES}
                viewBox="0 0 960 220"
                ariaLabel="Architecture: DriveWealth brokerage events flow into AWS SQS, bridged into Kafka, consumed by a Notification Service on Azure Cloud, producing real-time trade updates."
            />
        ),
    },
    'From Copilot to Colleague': {
        heading: 'By the Numbers',
        render: (accent) => (
            <StatFunnel
                accent={accent}
                stages={[
                    { value: 881, label: 'Conference Talks Reviewed' },
                    { value: 199, label: 'Source Anchors' },
                    { value: 54, label: 'Claims Published' },
                ]}
            />
        ),
    },
    'Legacy Java Modernization': {
        heading: 'The Migration',
        render: (accent) => (
            <BeforeAfter
                accent={accent}
                before={{
                    eyebrow: 'Before',
                    title: 'Struts + JSP',
                    subtitle: 'Java 1.6-era codebase',
                    chips: ['Struts', 'JSP'],
                }}
                after={{
                    eyebrow: 'After',
                    title: 'Google Web Toolkit',
                    subtitle: 'Modernized front end',
                    chips: ['GWT', 'Java'],
                }}
                preserved={{
                    label: 'Preserved Throughout the Rewrite',
                    chips: ['Oracle', 'XSLT', 'XML'],
                }}
            />
        ),
    },
    Zonelyte: {
        heading: 'The Golden Hour',
        render: (accent) => <GoldenHourGrid accent={accent} />,
    },
};

export function getProjectCenterpiece(
    projectName: string,
    accent: string,
): { heading: string; node: ReactNode } | null {
    const centerpiece = PROJECT_CENTERPIECES[projectName];
    return centerpiece ? { heading: centerpiece.heading, node: centerpiece.render(accent) } : null;
}
