import { ImageResponse } from 'next/og';
export const alt = 'Timur Isachenko — AI engineering and solution architecture';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: '#141615', color: '#f0eee7' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28 }}><span>Timur Isachenko</span><span style={{ color: '#ff7b42' }}>ti.</span></div>
    <div style={{ display: 'flex', flexDirection: 'column', fontSize: 78, letterSpacing: -4, lineHeight: 1.05 }}><span>Complex systems.</span><span style={{ color: '#ff7b42' }}>Clear thinking.</span><span>Real impact.</span></div>
    <div style={{ fontSize: 24, color: '#a7aaa2' }}>AI CTO · Principal Solution Architect · Author</div>
  </div>, size);
}
