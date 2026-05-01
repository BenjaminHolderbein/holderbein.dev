export type Link = { label: string; href: string; display?: string };

export type Project = {
  slug: string;
  title: string;
  year: string;
  status: "live" | "wip" | "archive";
  blurb: string;
  stack: string[];
  links: Link[];
};

export type ExperienceEntry = {
  role: string;
  org: string;
  where: string;
  start: string;
  end: string;
  yearRange: string;
  blurb: string;
  stack: string[];
};

export type Site = {
  name: string;
  handle: string;
  domain: string;
  location: string;
  role: string;
  availability: string;
  oneLiner: string;
  bioShort: string;
  bioLong: string[];
  links: Link[];
  now: string[];
  experience: ExperienceEntry[];
  projects: Project[];
};

export const site: Site = {
  name: "Benjamin Holderbein",
  handle: "holderbein",
  domain: "holderbein.dev",
  location: "San Francisco, CA",
  role: "AI Engineer",
  availability: "July 2026",
  oneLiner:
    "AI Engineer & Master's student building and deploying LLM systems.",
  bioShort:
    "I build retrieval and LLM systems that actually ship. Currently at Asurion replacing a 3-year-old semantic search with a modular RAG pipeline serving 10,000+ daily queries, while finishing my M.S. in Data Science & AI at USF.",
  bioLong: [
    "I'm an AI Engineer based in San Francisco. My day-to-day is RAG plumbing: ingestion, chunking, embeddings, retrieval, evals — making sure the thing that comes out the other end is actually better than what was there before.",
    "Right now I'm at Asurion, where I built a modular RAG system that replaces a three-year-old semantic search serving 10,000+ daily customer queries. Before that I shipped a React Native app at StudyStudio.ai, an NLP matching system at USF's Data Institute that's still in production, and time-series pipelines for residential energy research at Frontier Energy.",
    "Outside of work I ran USF's 100+ member rock climbing club for two years. I like things that are precise, durable, and slightly understated.",
  ],
  links: [
    {
      label: "Email",
      href: "mailto:benjamin.holderbein@gmail.com",
      display: "benjamin.holderbein@gmail.com",
    },
    {
      label: "GitHub",
      href: "https://github.com/BenjaminHolderbein",
      display: "github.com/BenjaminHolderbein",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/benjamin-holderbein",
      display: "linkedin.com/in/benjamin-holderbein",
    },
    {
      label: "Resume",
      href: "/resume.pdf",
      display: "resume.pdf",
    },
  ],
  now: [
    "Building the next iteration of Asurion's retrieval stack — eval harness over BGE / Qwen3 / Nemotron / Gemini.",
    "Wrapping up my M.S. in Data Science & AI at USF (June 2026).",
    "Reading: Sebastian Raschka — Build a Large Language Model.",
  ],
  experience: [
    {
      role: "AI Engineer, Intern",
      org: "Asurion",
      where: "San Francisco",
      start: "Oct 2025",
      end: "Present",
      yearRange: "2025 — Now",
      blurb:
        "Built a modular RAG system replacing a 3-year-old semantic search serving 10,000+ daily customer queries. Architected an ingestion pipeline supporting four embedding models (BGE, Qwen3, Nemotron, Gemini) and a Redis vector store with automated preprocessing, chunking, and embedding workflows. Integrated DeepEval to benchmark embedders and retrieval strategies.",
      stack: ["RAG", "Redis", "BGE", "Qwen3", "Nemotron", "Gemini", "DeepEval"],
    },
    {
      role: "Software Engineer, Intern",
      org: "StudyStudio.ai",
      where: "San Francisco",
      start: "Jan 2025",
      end: "May 2025",
      yearRange: "2025",
      blurb:
        "Developed and deployed a cross-platform mobile app using React Native, TypeScript, and Clerk for iOS and Android. Delivered a polished prototype mirroring core web functionality and ready for store deployment.",
      stack: ["React Native", "TypeScript", "Clerk", "iOS", "Android"],
    },
    {
      role: "AI Engineer, Intern",
      org: "USF Data Institute",
      where: "San Francisco",
      start: "May 2024",
      end: "Aug 2024",
      yearRange: "2024",
      blurb:
        "Designed and shipped an NLP algorithm that automates internship/student matching at USF — clustering qualifications and matching them against employer requirements with LLMs. Built a preprocessing pipeline that cut runtime and API cost by 40%. Still in production.",
      stack: ["NLP", "LLMs", "Python", "Clustering"],
    },
    {
      role: "Data Scientist, Intern",
      org: "Frontier Energy",
      where: "Davis, CA",
      start: "May 2022",
      end: "Oct 2023",
      yearRange: "2022 — 2023",
      blurb:
        "Analyzed 40+ data channels monitoring residential building performance across California pilot sites. Built an Azure Data Explorer dashboard and a Python pipeline that cleaned, validated, and resampled time-series data from 1-second to 5-minute intervals.",
      stack: ["Python", "Azure", "Time-series"],
    },
  ],
  projects: [
    {
      slug: "ecommerce-ticket-triage",
      title: "Ecommerce Ticket Triage Assistant",
      year: "2026",
      status: "live",
      blurb:
        "Multi-service GCP system that triages support tickets by predicted priority with a fine-tuned DistilBERT classifier. FastAPI backend on Cloud Run with Firebase auth and per-user rate limits, Cloud SQL Postgres scoped by uid, Vertex AI for training and the model registry.",
      stack: ["GCP", "Cloud Run", "FastAPI", "DistilBERT", "Vertex AI", "Postgres"],
      links: [
        {
          label: "Live",
          href: "https://msds-603-victors-demons.firebaseapp.com",
        },
        {
          label: "Repo",
          href: "https://github.com/NandakumarGunalan/ecommerce-ticket-assistant",
        },
      ],
    },
    {
      slug: "llm-from-scratch",
      title: "LLM From Scratch",
      year: "2025",
      status: "live",
      blurb:
        "From-scratch GPT-2 small in PyTorch (~124M params): BPE tokenizer with a sliding-window dataloader, multi-head causal self-attention, the full transformer stack, and a pretraining loop that samples generations mid-training. Each file maps to a stage of Sebastian Raschka's Build a Large Language Model.",
      stack: ["PyTorch", "Transformers", "tiktoken", "Python"],
      links: [
        {
          label: "Repo",
          href: "https://github.com/BenjaminHolderbein/LLM_from_scratch",
        },
      ],
    },
    {
      slug: "claude-orchestrate",
      title: "Claude Orchestrate",
      year: "2026",
      status: "live",
      blurb:
        "A Claude Code skill and matching sub-agent that turn the main agent into a coordinator. Decomposes a plan into waves, spawns implementer sub-agents in isolated git worktrees, runs them in parallel where safe, and stays out of the way between checkpoints.",
      stack: ["Claude Code", "Agents", "Git Worktrees"],
      links: [
        {
          label: "Repo",
          href: "https://github.com/BenjaminHolderbein/claude-orchestrate",
        },
      ],
    },
    {
      slug: "cell-counting",
      title: "Cellular Microscopy Counting",
      year: "2024",
      status: "archive",
      blurb:
        "U-Net CNN for image segmentation that automates cell counting for biomedical research. Mean error of 1.4 cells, beating the 3-cell target by 2x and replacing manual counting.",
      stack: ["PyTorch", "U-Net", "CV"],
      links: [
        {
          label: "Report",
          href: "https://docs.google.com/document/d/1-rRoGeg0ZattBbF4WXdibstQQa-rSsnJZk2Nztm9paQ/edit",
        },
        {
          label: "Code",
          href: "https://colab.research.google.com/drive/1qWvp-V3C0LU44Eh_QBlqct7fsaj-K78Q",
        },
      ],
    },
    {
      slug: "wallpaper-gen",
      title: "Wallpaper Gen",
      year: "2026",
      status: "wip",
      blurb:
        "Full-stack AI wallpaper generator pairing a FastAPI backend with a React UI. Generates SDXL images, upscales with Real-ESRGAN to 4–5K, and ships with 15 device presets and a searchable gallery. WebSockets stream live progress.",
      stack: ["SDXL", "FastAPI", "React", "TypeScript", "WebSockets"],
      links: [
        {
          label: "Repo",
          href: "https://github.com/BenjaminHolderbein/wallpaper-gen",
        },
      ],
    },
    {
      slug: "mcp-server-svg",
      title: "MCP Server SVG",
      year: "2026",
      status: "live",
      blurb:
        "An MCP server that lets Claude Code screenshot SVG files in-context — pass a path, get back a rendered PNG. Closes the visual feedback loop for SVG diagramming, so Claude can see what it's drawing without leaving the terminal.",
      stack: ["MCP", "TypeScript", "Playwright"],
      links: [
        {
          label: "Repo",
          href: "https://github.com/BenjaminHolderbein/mcp-server-svg",
        },
        {
          label: "npm",
          href: "https://www.npmjs.com/package/@benjaminholderbein/mcp-server-svg",
        },
      ],
    },
    {
      slug: "screen-fx",
      title: "Screen FX",
      year: "2026",
      status: "live",
      blurb:
        "A self-contained ~95KB single-file visual playground — generative gradients, lava lamps, starfields, liquid glass — with a layerable post-FX pipeline (bloom, film grain, vignette). All state round-trips through the URL hash so any look is shareable.",
      stack: ["WebGL2", "JavaScript", "GLSL"],
      links: [
        {
          label: "Repo",
          href: "https://github.com/BenjaminHolderbein/screen-fx",
        },
      ],
    },
    {
      slug: "campsite-crawler",
      title: "Campsite Crawler",
      year: "2026",
      status: "live",
      blurb:
        "Polls recreation.gov and ReserveCalifornia for campsite availability on a fixed date range and pushes a notification the instant something opens up. Both providers expose unauthenticated JSON APIs — no scraping, no token, just diff-on-poll.",
      stack: ["Python", "ntfy", "uv"],
      links: [
        {
          label: "Repo",
          href: "https://github.com/BenjaminHolderbein/campsite-crawler",
        },
      ],
    },
  ],
};
