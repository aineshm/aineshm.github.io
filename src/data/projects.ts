export interface Project {
  id: string;
  name: string;
  date: string;
  tagline: string;
  icon: string;
  label: string;
  tags: readonly string[];
  githubUrl?: string;
  deployUrl?: string;
  approach: string;
}

export const projects: readonly Project[] = [
  {
    id: "cribai",
    name: "CribAI",
    date: "Mar 2026",
    tagline:
      "AI-native student housing platform with an agentic concierge",
    icon: "Home",
    label: "Solo Project",
    tags: ["Next.js", "TypeScript", "Supabase", "Vertex AI", "PostGIS", "pgvector"],
    githubUrl: "https://github.com/aineshm/cribai",
    approach:
      "The core idea is an AI concierge that can actually do things for you — not just answer questions. It uses 13 function-calling tools with intent classification to figure out what you need, then routes simple requests (like 'show me apartments near campus') to instant tool responses and complex ones (like 'schedule tours at my top 3 picks') to a background mission executor with human-in-the-loop approval. Housing search blends PostGIS spatial queries with semantic embeddings in a 70/30 weighted ranking against 2,500+ real listings. The chat interface streams responses via SSE with structured tool outputs rendered as typed client blocks — listing cards, map overlays, comparison tables.",
  },
  {
    id: "vc-audit",
    name: "VC Audit Tool",
    date: "Mar 2026",
    tagline:
      "Valuation engine for venture-backed companies with full audit trails",
    icon: "TrendingUp",
    label: "Solo Project",
    tags: ["Python", "FastAPI", "LangGraph", "PostgreSQL", "Next.js"],
    githubUrl: "https://github.com/aineshm/vc-audit",
    approach:
      "Supports five valuation methodologies — DCF, comparables, precedent transactions, asset-based, and venture method — each plugged in as a swappable data source with full audit trails tracking every assumption and derivation step. A LangGraph research agent auto-assembles the inputs you need by pulling from SEC EDGAR, DuckDuckGo, and USASpending.gov, with a multi-provider LLM fallback chain and regex safety net for when APIs are flaky. For comparable company selection, it uses sentence-transformer embeddings to rank the EDGAR universe by cosine similarity, then a reconciliation layer with YAML-driven stage-based methodology weighting ties everything together.",
  },
  {
    id: "qualcomm-coach",
    name: "Qualcomm AI Public Speaking Coach",
    date: "Sep–Dec 2025",
    tagline:
      "On-device presentation coaching with NPU-accelerated inference",
    icon: "Mic",
    label: "Team · Qualcomm",
    tags: ["Python", "ONNX Runtime", "Next.js", "React", "SQLite"],
    approach:
      "Built with a 6-person team and Qualcomm engineers for their Snapdragon X Elite platform. The system runs a three-stage analysis pipeline — pose estimation, gesture tracking, and facial expression analysis — orchestrating 5 ONNX models across dual Python environments with NPU acceleration via the QNN Execution Provider, hitting 50 fps inference. Scoring algorithms analyze 33 pose, 42 hand, and 68 facial landmarks with a calibration step so feedback is personalized to your natural speaking style. An on-device Llama 3.2 1B model generates natural-language coaching feedback. The whole thing is wrapped in a Next.js/React web app with SSE-based real-time streaming so you see results as the pipeline processes.",
  },
  {
    id: "personal-search",
    name: "Personal Search Layer",
    date: "Feb 2026",
    tagline:
      "Local-first agentic RAG system unifying documents into a single query layer",
    icon: "Search",
    label: "Solo Project",
    tags: ["Python", "RAG", "Embeddings", "Hybrid Retrieval"],
    githubUrl: "https://github.com/aineshm/personal-search",
    approach:
      "Takes all your local documents and notes and makes them searchable through a single query interface. Uses hybrid retrieval that combines traditional lexical search with vector embeddings so you get both exact keyword matches and semantic understanding. When you ask a complex question, a multi-hop evidence gathering pipeline follows chains of reasoning across documents, then builds responses with claim-by-claim citations so you can trace every statement back to its source.",
  },
  {
    id: "accessichat",
    name: "AccessiChat AI",
    date: "Feb 2024",
    tagline:
      "Accessible healthcare management application with AI chat",
    icon: "MessageCircle",
    label: "Solo Project",
    tags: ["Python", "React", "OpenAI", "PostgreSQL", "REST APIs"],
    approach:
      "A healthcare management app built with accessibility as a core constraint. The backend uses OpenAI function calling with structured tool use — the AI doesn't just chat, it can look up patient info, check schedules, and take actions through a defined set of tools. Built with a RESTful API layer and PostgreSQL persistence, with the React frontend designed to meet accessibility standards.",
  },
] as const;
