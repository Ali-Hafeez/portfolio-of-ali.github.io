// ================================================
// BLOG POSTS REGISTRY
//
// To add a new post:
//   1. Add an entry to this array (newest first)
//   2. Create the file at  posts/<slug>.html
//      (copy posts/_template.html to get started)
// ================================================
const BLOG_POSTS = [
  {
    slug:     'chaos-engineering-lessons',
    title:    'What building an air-gapped chaos lab taught me',
    date:     '2026-05-20',
    tags:     ['Chaos Engineering', 'Networking', 'Dissertation'],
    excerpt:  'My final year dissertation was an air-gapped chaos engineering platform running on real Cisco switches, with a local Llama 3 model doing root cause analysis. Here\'s what actually stuck.',
    readTime: '4 min'
  },
  {
    slug:     'cctv-not-the-hard-drive',
    title:    'The CCTV fault everyone assumed was the hard drive',
    date:     '2026-04-22',
    tags:     ['Freelance', 'Troubleshooting'],
    excerpt:  'A client was about to pay for a new hard drive. A bit of methodical fault isolation found the real problem sitting one component over.',
    readTime: '3 min'
  },
  {
    slug:     'running-llm-on-prem',
    title:    'Running Llama 3 on-prem, no internet allowed',
    date:     '2026-04-15',
    tags:     ['AI', 'On-Prem', 'Infrastructure'],
    excerpt:  'The chaos lab had no route to the outside world, so an API call to a hosted model was never on the table. Notes on getting Llama 3 8B running locally instead.',
    readTime: '4 min'
  },
  {
    slug:     'incident-at-2am',
    title:    'What watching real incident response taught me',
    date:     '2026-03-08',
    tags:     ['ITIL', 'Incident Response'],
    excerpt:  'A CV bullet point says I "developed practical knowledge of the ITIL v4 incident management framework." Here\'s what that actually looked like day to day.',
    readTime: '3 min'
  },
];
