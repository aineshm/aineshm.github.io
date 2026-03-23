export interface Experience {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export const experiences: readonly Experience[] = [
  {
    role: "Capstone Software Engineer",
    company: "Qualcomm",
    location: "Madison, WI",
    startDate: "Sep 2025",
    endDate: "Dec 2025",
    description:
      "Led architecture and development of an NPU-accelerated presentation coaching system on Snapdragon X Elite. Owned the full stack from ONNX model pipeline to the Next.js frontend, achieving 7-second latency for 30-second video analysis with a team of 6.",
  },
  {
    role: "AI Engineering Intern",
    company: "Staples Inc.",
    location: "Framingham, MA",
    startDate: "Jun 2025",
    endDate: "Aug 2025",
    description:
      "Built and shipped a production agentic AI assistant using LangGraph and RAG for Customer Service and Supply Chain teams. Designed security evaluations and jailbreak prevention for internal AI agents, and created real-time operational dashboards replacing manual reporting workflows.",
  },
  {
    role: "Software and AI Intern",
    company: "Apurva.ai",
    location: "Bengaluru, India",
    startDate: "Jun 2023",
    endDate: "Aug 2023",
    description:
      "Built a semantic search system using sentence-transformers and function calling that improved search accuracy from 41% to 83% through iterative algorithmic optimization and benchmarking.",
  },
] as const;
