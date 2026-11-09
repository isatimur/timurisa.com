"""Check book post drafts: first-person claims and quote fidelity against chapter text.

Usage: python3 scripts/check-book-drafts.py <chapters dir> [draft files...]
Defaults to every draft in content/drafts/book.
"""
import re, sys
from pathlib import Path

chapters_dir = Path(sys.argv[1])
root = Path(__file__).resolve().parent.parent
files = [Path(a) for a in sys.argv[2:]] or sorted((root / 'content/drafts/book').glob('*.md'))

FIRST_PERSON = re.compile(r"\b(I|I'm|I've|I'd|I'll|my|me)\b(?! built)", re.I)
ALLOWED = re.compile(r'\b(my|me) (book|blog)\b', re.I)


def norm(s):
    s = s.replace('’', "'").replace('‘', "'").replace('“', '"').replace('”', '"')
    s = s.replace('…', '...').replace(' ', ' ')
    s = re.sub(r'[*_`]', '', s)
    return re.sub(r'\s+', ' ', s).lower()


chap = {i: norm((chapters_dir / f'chapter-{i:02d}.md').read_text()) for i in range(1, 11)}
bad = 0
for f in files:
    raw = f.read_text()
    m = re.match(r'^---\n([\s\S]*?)\n---\n([\s\S]*)$', raw)
    if not m:
        print('NO FRONT MATTER', f.name); bad += 1; continue
    fm = dict(l.split(':', 1) for l in m[1].split('\n') if ':' in l)
    body = m[2]
    words = len(body.split())
    if not 380 <= words <= 760:
        print('LENGTH', f.name, words); bad += 1
    if f.name.startswith('ch00'):
        continue  # the overview legitimately speaks as the builder of the project
    for para in body.split('\n\n'):
        for hit in FIRST_PERSON.finditer(ALLOWED.sub('', para)):
            print('FIRST PERSON', f.name, '|', para[max(0, hit.start() - 30):hit.end() + 40].replace('\n', ' ')); bad += 1
        p = para.replace('“', '"').replace('”', '"')
        segs = p.split('"')
        if len(segs) % 2 == 0:
            print('UNBALANCED QUOTES', f.name, '|', p[:80]); bad += 1
            continue
        c = chap[int(fm['chapter'])]
        for q in (s for s in segs[1::2] if len(s) >= 25):
            parts = [x.strip(' .,;:') for x in norm(q).split('...') if len(x.strip()) > 12]
            if not all(x in c for x in parts):
                print('QUOTE NOT IN CHAPTER', f.name, '|', q[:100]); bad += 1
print('files', len(files), 'issues', bad)
sys.exit(1 if bad else 0)
