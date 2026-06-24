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
    tags:     ['SRE', 'Chaos Engineering', 'Networking'],
    excerpt:  'Six months of fault injection on Cisco hardware — no internet, a local Llama 3 model parsing OOB logs, GitLab CI running off-grid. Here\'s what actually surprised me.',
    readTime: '6 min'
  },
  {
    slug:     'running-llm-on-prem',
    title:    'Running Llama 3 on-prem in an air-gapped lab',
    date:     '2026-04-15',
    tags:     ['AI', 'On-Prem', 'Infrastructure'],
    excerpt:  'When your platform can\'t call an external API, you run the model yourself. Lessons from integrating Llama 3 8B into an isolated Cisco network for automated root cause analysis.',
    readTime: '5 min'
  },
  {
    slug:     'incident-at-2am',
    title:    'The incident at 2am: why I actually enjoy on-call',
    date:     '2026-03-08',
    tags:     ['SRE', 'On-Call', 'DevOps'],
    excerpt:  'Most engineers dread the 2am page. I find it clarifying. A short piece on what on-call really teaches you about systems — and yourself.',
    readTime: '4 min'
  },
];
