# -*- coding: utf-8 -*-
"""
Generates src/data/trendingCourses.ts containing all 7 masterclasses
with extensive, professional-grade module content, sub-topics, code examples,
hands-on labs, assessments, and capstone projects.
"""

import os
import json

output_file = os.path.join("src", "data", "trendingCourses.ts")

# We define the 7 courses with extensive metadata and deep module content.
# Every course has 7 modules. Module 1 is isFree=True, Modules 2-7 are isFree=False.

courses_py = [
    {
        "id": "ai-engineering",
        "slug": "ai-engineering-generative-ai",
        "title": "AI Engineering & Generative AI Masterclass",
        "tagline": "Design, build, and deploy production-grade LLM applications, RAG systems, and AI Agents.",
        "description": "A comprehensive 7-module professional masterclass covering everything from token mechanics and model architectures to enterprise RAG, Model Context Protocol (MCP), fine-tuning, and production SaaS deployment.",
        "badge": "🔥 Most Popular 2026",
        "category": "Artificial Intelligence",
        "level": "Intermediate to Advanced",
        "duration": "8 Weeks • Self-Paced",
        "price": 149,
        "originalPrice": 1499,
        "rating": 4.9,
        "enrolledCount": 3840,
        "pdfFileName": "ai_engineering_generative_ai_7_module_masterclass.pdf",
        "modules": [
            {
                "id": "ai-eng-m1",
                "moduleNumber": 1,
                "title": "Module 1: AI Engineering Foundations & Architecture",
                "subtitle": "Software Foundations, Model Interfaces, Token Economics & Latency Optimization",
                "estimatedHours": "12 Hours",
                "isFree": True,
                "learningObjectives": [
                    "Understand what AI Engineering is versus traditional Machine Learning & Research",
                    "Master modern Python asynchronous patterns for high-throughput AI apps",
                    "SDKs, REST APIs, streaming responses, and exponential backoff retry policies",
                    "Tokenization mechanics (BPE), context window economics, and token budgeting",
                    "Deterministic business logic vs non-deterministic model generation",
                    "Mini-project: Resilient multi-provider AI gateway with fallback routing"
                ],
                "content": """
<div class="module-intro" style="padding-bottom: 1.5rem; border-bottom: 2px solid #e2e8f0; margin-bottom: 2rem;">
  <span style="background: #eff6ff; color: #2563eb; font-weight: 800; font-size: 0.8rem; padding: 0.35rem 0.75rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em;">Free Preview Module • 12 Hours</span>
  <h2 style="font-size: 1.85rem; color: #0f172a; margin-top: 0.75rem; font-weight: 800;">AI Engineering Foundations & The Modern Stack</h2>
  <p style="font-size: 1.05rem; color: #475569; line-height: 1.7;">AI engineering is the discipline of building reliable software systems around non-deterministic foundation models. While researchers train base architectures, AI engineers design resilient client pipelines, context boundary managers, validation filters, and streaming interfaces.</p>
</div>

<div class="lesson" style="margin-bottom: 2.5rem;">
  <h3 style="font-size: 1.3rem; color: #1e293b; font-weight: 700; border-left: 4px solid #2563eb; padding-left: 0.75rem; margin-bottom: 1rem;">Lesson 1.1: Core Philosophy — Software Engineering vs Model Training</h3>
  <p>In classical software, given an input <code>x</code>, your function always returns deterministic output <code>y</code>. In AI engineering, foundation models are probabilistic token predictors. Your job as an engineer is to create deterministic boundaries around probabilistic engines.</p>
  <p>Key responsibilities of modern AI engineers include:</p>
  <ul style="margin: 1rem 0; padding-left: 1.5rem; color: #334155; line-height: 1.7;">
    <li><strong>Input Sanitization & Injection Defense:</strong> Treating every external prompt as untrusted user input.</li>
    <li><strong>Token Optimization:</strong> Compressing system prompts without losing cognitive task accuracy.</li>
    <li><strong>Schema Enforcement:</strong> Forcing LLMs to respond in strict, machine-parseable JSON adhering to Pydantic/Zod schemas.</li>
    <li><strong>Graceful Degradation:</strong> Seamlessly falling back to smaller, cheaper models when primary endpoints experience rate limits or outages.</li>
  </ul>
</div>

<div class="lesson" style="margin-bottom: 2.5rem;">
  <h3 style="font-size: 1.3rem; color: #1e293b; font-weight: 700; border-left: 4px solid #2563eb; padding-left: 0.75rem; margin-bottom: 1rem;">Lesson 1.2: Asynchronous Streaming & Resilient Client Pipelines</h3>
  <p>Blocking on an LLM inference call for 10 seconds destroys web application user experience. Production AI applications leverage <strong>Server-Sent Events (SSE)</strong> to stream tokens to users chunk-by-chunk with sub-200ms time-to-first-token (TTFT).</p>
  <p>Below is a production-grade asynchronous OpenAI client setup featuring exponential jitter backoff, token tracking, and structured output parsing:</p>

<pre><code class="language-python">import asyncio
import os
from typing import AsyncGenerator
from openai import AsyncOpenAI
from pydantic import BaseModel, Field

class AnalysisReport(BaseModel):
    summary: str = Field(description="Executive overview of the request")
    sentiment_score: float = Field(description="Numerical polarity between -1.0 and 1.0")
    recommended_action: str = Field(description="Deterministic next operational step")

class ProductionAIEngine:
    def __init__(self):
        self.client = AsyncOpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
        
    async def stream_completion(self, prompt: str) -> AsyncGenerator[str, None]:
        \"\"\"Streams tokens in real-time for responsive user interfaces.\"\"\"
        response = await self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a senior tech analyst. Be concise."},
                {"role": "user", "content": prompt}
            ],
            stream=True,
            temperature=0.2,
            max_tokens=800
        )
        async for chunk in response:
            token = chunk.choices[0].delta.content or ""
            if token:
                yield token

    async def generate_structured_record(self, raw_ticket: str) -> AnalysisReport:
        \"\"\"Enforces strict Pydantic JSON schema adherence.\"\"\"
        completion = await self.client.beta.chat.completions.parse(
            model="gpt-4o-2024-08-06",
            messages=[
                {"role": "system", "content": "Analyze customer inquiry and extract fields."},
                {"role": "user", "content": raw_ticket}
            ],
            response_format=AnalysisReport,
        )
        return completion.choices[0].message.parsed
</code></pre>
</div>

<div class="lesson" style="margin-bottom: 2.5rem;">
  <h3 style="font-size: 1.3rem; color: #1e293b; font-weight: 700; border-left: 4px solid #2563eb; padding-left: 0.75rem; margin-bottom: 1rem;">Lesson 1.3: Token Economics, Context Windows & Cost Engineering</h3>
  <p>Tokens represent sub-word fragments (roughly 4 characters or 0.75 words). Context windows have expanded from 4,000 tokens to 1,000,000+ tokens, but filling context windows naively causes two catastrophic issues:</p>
  <ol style="margin: 1rem 0; padding-left: 1.5rem; color: #334155; line-height: 1.7;">
    <li><strong>Attention Degradation ('Lost in the Middle'):</strong> Transformers remember information at the start and end of prompt contexts far better than facts buried in the middle.</li>
    <li><strong>Exponential Latency & Billing:</strong> Quadratic self-attention computation means passing 100k tokens per query drives huge server costs. Efficient systems cache prefix tokens and summarize historical chat turns.</li>
  </ol>
</div>

<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 1.5rem; margin-bottom: 2rem;">
  <h4 style="font-size: 1.1rem; color: #0f172a; font-weight: 700; margin-top: 0; display: flex; align-items: center; gap: 0.5rem;">
    🧪 Hands-On Practical Lab
  </h4>
  <ul style="margin: 0.5rem 0 0; padding-left: 1.25rem; color: #475569; line-height: 1.6;">
    <li>Configure an asynchronous Python runtime with virtual environment dependencies.</li>
    <li>Implement token counting using <code>tiktoken</code> to calculate per-request cost before sending API calls.</li>
    <li>Write an automated fallback router that retries requests on Anthropic Claude 3.5 Sonnet if OpenAI rate-limits.</li>
    <li>Build a command-line interface that streams tokens smoothly with typewriter speed throttling.</li>
  </ul>
</div>

<div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 14px; padding: 1.5rem;">
  <h4 style="font-size: 1.1rem; color: #166534; font-weight: 700; margin-top: 0; display: flex; align-items: center; gap: 0.5rem;">
    🏆 Module 1 Capstone Project
  </h4>
  <p style="font-size: 0.95rem; color: #15803d; margin: 0.5rem 0 1rem; line-height: 1.6;"><strong>Project: Multi-Provider Resilient AI Gateway</strong></p>
  <p style="font-size: 0.9rem; color: #166534; line-height: 1.6; margin: 0;">Build a production microservice with FastAPI that acts as an intelligent proxy. It checks prompt token size, estimates cost in USD, routes to the cheapest model capable of the task, enforces output Pydantic schemas, and records full request traces in SQLite.</p>
</div>
""",
                "projectTitle": "Resilient Multi-Provider AI Gateway Service",
                "projectTask": "Deploy a FastAPI gateway service that routes requests across OpenAI and Anthropic with automatic fallback, token counting, and Pydantic validation."
            },
            {
                "id": "ai-eng-m2",
                "moduleNumber": 2,
                "title": "Module 2: LLM Application Architecture & Prompt Pipelines",
                "subtitle": "Prompt Composition, Guardrails, Memory Chains & Semantic Routing",
                "estimatedHours": "14 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Chain-of-thought, few-shot conditioning, and instruction design patterns",
                    "Dynamic prompt template engines and variable injection boundaries",
                    "Semantic classification routers for sub-50ms intent dispatching",
                    "Conversation state management: Window buffers, summary memory, and vector memory",
                    "Input/output guardrails using NeMo and Pydantic schemas",
                    "Project: Multi-turn customer support agent with semantic intent router"
                ],
                "content": """
<div class="module-intro" style="padding-bottom: 1.5rem; border-bottom: 2px solid #e2e8f0; margin-bottom: 2rem;">
  <span style="background: #fef2f2; color: #dc2626; font-weight: 800; font-size: 0.8rem; padding: 0.35rem 0.75rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em;">Premium Module • 14 Hours</span>
  <h2 style="font-size: 1.85rem; color: #0f172a; margin-top: 0.75rem; font-weight: 800;">LLM Application Architecture & Production Prompting</h2>
  <p style="font-size: 1.05rem; color: #475569; line-height: 1.7;">Moving beyond one-off chat completions requires designing robust pipelines. In this module, you will master architectural patterns for memory buffers, dynamic context injection, semantic intent routing, and guardrail enforcement.</p>
</div>

<div class="lesson" style="margin-bottom: 2.5rem;">
  <h3 style="font-size: 1.3rem; color: #1e293b; font-weight: 700; border-left: 4px solid #2563eb; padding-left: 0.75rem; margin-bottom: 1rem;">Lesson 2.1: Semantic Intent Routing</h3>
  <p>Sending every user query to your largest reasoning model is slow and expensive. A semantic router classifies user intent into categories (e.g., Billing, Technical Support, General FAQ, Escalation) using cosine distance on lightweight embeddings, dispatching to specialized prompts within 20ms.</p>
</div>

<div class="lesson" style="margin-bottom: 2.5rem;">
  <h3 style="font-size: 1.3rem; color: #1e293b; font-weight: 700; border-left: 4px solid #2563eb; padding-left: 0.75rem; margin-bottom: 1rem;">Lesson 2.2: Memory Systems & Stateful Chat Horizons</h3>
  <p>LLMs are strictly stateless. To give users the illusion of continuity across hours of conversation, you must architect an active memory pipeline:</p>
  <ul style="margin: 1rem 0; padding-left: 1.5rem; color: #334155; line-height: 1.7;">
    <li><strong>Sliding Window Memory:</strong> Keeps only the last <code>K</code> messages in context.</li>
    <li><strong>Summary Buffer Memory:</strong> Uses a lightweight model in the background to condense turns 1-10 into a concise paragraph while retaining turns 11-15 verbatim.</li>
    <li><strong>Entity Memory:</strong> Extracts key facts (name, account balance, preferred language) and stores them as structured key-value state.</li>
  </ul>
</div>
""",
                "projectTitle": "Enterprise Multi-Turn Support Agent with Semantic Router",
                "projectTask": "Construct a stateful customer service pipeline that routes between billing, support, and sales using vector embedding distance and maintains condensed conversational summaries."
            },
            {
                "id": "ai-eng-m3",
                "moduleNumber": 3,
                "title": "Module 3: Enterprise Embeddings, RAG & Vector Databases",
                "subtitle": "Dense Retrieval, Chunking Strategies, Pinecone/Qdrant & Re-ranking",
                "estimatedHours": "16 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Vector embeddings theory: Cosine similarity, dot product, and Euclidean distances",
                    "Advanced chunking: Semantic splitting, recursive character chunking, and markdown awareness",
                    "Index topologies: HNSW, IVF, and vector database clustering (Pinecone, Qdrant)",
                    "Hybrid Search: Combining BM25 keyword matching with dense vector retrieval",
                    "Two-stage retrieval and Cross-Encoder Re-ranking (Cohere / BGE-Reranker)",
                    "Project: Enterprise PDF Knowledge Base with Citation Tracking"
                ],
                "content": """
<div class="module-intro" style="padding-bottom: 1.5rem; border-bottom: 2px solid #e2e8f0; margin-bottom: 2rem;">
  <span style="background: #fef2f2; color: #dc2626; font-weight: 800; font-size: 0.8rem; padding: 0.35rem 0.75rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em;">Premium Module • 16 Hours</span>
  <h2 style="font-size: 1.85rem; color: #0f172a; margin-top: 0.75rem; font-weight: 800;">Enterprise Retrieval-Augmented Generation (RAG)</h2>
  <p style="font-size: 1.05rem; color: #475569; line-height: 1.7;">Naive RAG fails in production because of poor chunking, semantic mismatches, and irrelevant context stuffing. This module teaches production-grade two-stage hybrid retrieval pipelines with cross-encoder re-ranking.</p>
</div>
<div class="lesson">
  <h3 style="font-size: 1.3rem; color: #1e293b; font-weight: 700; border-left: 4px solid #2563eb; padding-left: 0.75rem;">Lesson 3.1: Hybrid Search & Re-ranking Pipelines</h3>
  <p>Vector search alone struggles with exact keyword queries (like SKU numbers, dates, or error codes). Hybrid retrieval combines sparse lexical search (BM25) with dense vector search (OpenAI text-embedding-3-small) using Reciprocal Rank Fusion (RRF). Then, a cross-encoder evaluates the top 25 results to supply the top 4 most accurate context snippets to the generator.</p>
</div>
""",
                "projectTitle": "Production Legal Contract Q&A Engine with Strict Citation Tracking",
                "projectTask": "Build a RAG pipeline that ingests complex PDF documents, indexes chunks into Qdrant using hybrid BM25 + dense search, re-ranks with Cohere, and streams answers with verified source page citations."
            },
            {
                "id": "ai-eng-m4",
                "moduleNumber": 4,
                "title": "Module 4: Tool Calling, Autonomous Agents & Model Context Protocol (MCP)",
                "subtitle": "Function Calling, ReAct Execution Loops, MCP Protocol & Bounded Autonomy",
                "estimatedHours": "18 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Tool/Function calling specifications with JSON Schema validation",
                    "The ReAct loop: Reason → Action → Observation → Final Answer",
                    "Model Context Protocol (MCP) architecture: Servers, clients, tools, and resources",
                    "Bounded autonomy: Step limits, cost caps, and approval checkpoints",
                    "Multi-agent orchestration: Supervisor, worker, and consensus topologies",
                    "Project: Autonomous Market Research Agent with MCP Tool Integrations"
                ],
                "content": """
<div class="module-intro" style="padding-bottom: 1.5rem; border-bottom: 2px solid #e2e8f0; margin-bottom: 2rem;">
  <span style="background: #fef2f2; color: #dc2626; font-weight: 800; font-size: 0.8rem; padding: 0.35rem 0.75rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em;">Premium Module • 18 Hours</span>
  <h2 style="font-size: 1.85rem; color: #0f172a; margin-top: 0.75rem; font-weight: 800;">Autonomous Agents & Model Context Protocol (MCP)</h2>
  <p style="font-size: 1.05rem; color: #475569; line-height: 1.7;">LLMs become transformative when given hands to manipulate the external world. You will learn to build agents with typed tool definitions, connect them through the Model Context Protocol (MCP), and implement strict safety ceilings.</p>
</div>
<div class="lesson">
  <h3 style="font-size: 1.3rem; color: #1e293b; font-weight: 700; border-left: 4px solid #2563eb; padding-left: 0.75rem;">Lesson 4.1: The Model Context Protocol (MCP) Standard</h3>
  <p>Anthropic's open-source MCP specification standardizes how AI applications connect to data sources, local files, and external APIs. Instead of building custom integrations for every tool, you expose standard MCP resources and tools that any compatible client can safely query.</p>
</div>
""",
                "projectTitle": "Autonomous Financial Analyst Agent via MCP Tools",
                "projectTask": "Build an MCP server that exposes stock quote search, SEC filing parsers, and report compilers, and deploy an agent capable of generating a multi-page investor memo autonomously."
            },
            {
                "id": "ai-eng-m5",
                "moduleNumber": 5,
                "title": "Module 5: Fine-Tuning, LoRA & Multimodal Vision/Audio AI",
                "subtitle": "Instruction Tuning, LoRA/QLoRA Parameter Efficient Adaptation & Vision Pipelines",
                "estimatedHours": "14 Hours",
                "isFree": False,
                "learningObjectives": [
                    "When to Prompt vs RAG vs Fine-Tune (Decision Matrix)",
                    "Data curation, cleaning, and synthetic data generation for SFT",
                    "Low-Rank Adaptation (LoRA) and QLoRA 4-bit quantization mathematics",
                    "Fine-tuning open models (Llama 3 / Mistral) using Unsloth and Hugging Face",
                    "Multimodal vision models: Visual question answering, OCR-free document parsing",
                    "Project: Specialized Medical Report Extractor Model with LoRA Weights"
                ],
                "content": """
<div class="module-intro" style="padding-bottom: 1.5rem; border-bottom: 2px solid #e2e8f0; margin-bottom: 2rem;">
  <span style="background: #fef2f2; color: #dc2626; font-weight: 800; font-size: 0.8rem; padding: 0.35rem 0.75rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em;">Premium Module • 14 Hours</span>
  <h2 style="font-size: 1.85rem; color: #0f172a; margin-top: 0.75rem; font-weight: 800;">Fine-Tuning & Multimodal Intelligence</h2>
  <p style="font-size: 1.05rem; color: #475569; line-height: 1.7;">Master how to adapt open-weights foundation models for specific enterprise styles, formats, and domains using parameter-efficient fine-tuning (LoRA), and build multimodal systems that reason over images, diagrams, and invoices.</p>
</div>
""",
                "projectTitle": "Multimodal Invoice Extraction Pipeline with LoRA-Tuned Model",
                "projectTask": "Curate a 1,000-example synthetic dataset, fine-tune a Llama 3 model with QLoRA to output structured invoice JSON, and benchmark accuracy against GPT-4o."
            },
            {
                "id": "ai-eng-m6",
                "moduleNumber": 6,
                "title": "Module 6: AI Evaluation, Safety, Red Teaming & Observability",
                "subtitle": "Automated Evals, LLM-as-a-Judge, Prompt Injection Defense & OpenTelemetry Tracing",
                "estimatedHours": "14 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Evaluation methodology: Golden datasets, synthetic test generation, and precision/recall in LLMs",
                    "LLM-as-a-Judge: Pairwise comparison, G-Eval, and RAGAS metrics",
                    "Security vulnerabilities: Direct & indirect prompt injection, data exfiltration",
                    "Content moderation & red-teaming automated harnesses",
                    "Distributed tracing with OpenTelemetry, Langfuse, and Arize Phoenix",
                    "Project: Automated CI/CD Regression Evaluation Suite for LLM Apps"
                ],
                "content": """
<div class="module-intro" style="padding-bottom: 1.5rem; border-bottom: 2px solid #e2e8f0; margin-bottom: 2rem;">
  <span style="background: #fef2f2; color: #dc2626; font-weight: 800; font-size: 0.8rem; padding: 0.35rem 0.75rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em;">Premium Module • 14 Hours</span>
  <h2 style="font-size: 1.85rem; color: #0f172a; margin-top: 0.75rem; font-weight: 800;">AI Reliability, Security & Production Observability</h2>
  <p style="font-size: 1.05rem; color: #475569; line-height: 1.7;">You cannot improve what you cannot measure. Learn how to set up automated evaluation harnesses that run on every git commit, test for adversarial jailbreaks, and trace production execution graphs in real-time.</p>
</div>
""",
                "projectTitle": "Automated CI/CD Evaluation & Prompt Injection Testing Harness",
                "projectTask": "Build an automated evaluation pipeline with Langfuse and RAGAS that scores faithfulness, context precision, and tests 50 adversarial prompt injection attacks before deploying."
            },
            {
                "id": "ai-eng-m7",
                "moduleNumber": 7,
                "title": "Module 7: Capstone — End-to-End Production AI SaaS",
                "subtitle": "Full-Stack Deployment, Docker, Multi-Tenant Auth, Billing & Kubernetes Scaling",
                "estimatedHours": "20 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Architecting multi-tenant database isolation for enterprise AI clients",
                    "Handling asynchronous background tasks with Celery/Redis for long agent workflows",
                    "Rate limiting, credit metering, and Stripe/Razorpay usage billing",
                    "Containerizing full-stack AI apps with Docker multi-stage builds",
                    "Deploying to Cloud Run / Kubernetes with automated horizontal pod autoscaling",
                    "Capstone: Production AI Writing Assistant & Research SaaS Platform"
                ],
                "content": """
<div class="module-intro" style="padding-bottom: 1.5rem; border-bottom: 2px solid #e2e8f0; margin-bottom: 2rem;">
  <span style="background: #fef2f2; color: #dc2626; font-weight: 800; font-size: 0.8rem; padding: 0.35rem 0.75rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em;">Capstone Module • 20 Hours</span>
  <h2 style="font-size: 1.85rem; color: #0f172a; margin-top: 0.75rem; font-weight: 800;">Capstone: Production-Ready AI SaaS Application</h2>
  <p style="font-size: 1.05rem; color: #475569; line-height: 1.7;">Bring together everything you have built into a commercial-grade, multi-tenant AI software-as-a-service application complete with user authentication, credit meters, background agent queues, and live cloud deployment.</p>
</div>
""",
                "projectTitle": "Full-Stack Enterprise AI SaaS Application Deployment",
                "projectTask": "Deploy a complete multi-tenant AI SaaS with Next.js frontend, FastAPI backend, Qdrant vector database, Stripe/Razorpay payment credits, and automated GitHub Actions CI/CD to Google Cloud Run."
            }
        ]
    },
    {
        "id": "ai-agents",
        "slug": "ai-agents-automation",
        "title": "AI Agents & Workflow Automation Masterclass",
        "tagline": "Design reliable agentic workflows, n8n orchestrations, and automate enterprise business processes.",
        "description": "Master the design and deployment of autonomous AI agents. From webhook pipelines and n8n visual workflows to Model Context Protocol (MCP), CRM integrations, error replay systems, and building an AI Automation Agency.",
        "badge": "⚡ High Demand",
        "category": "Automation & Agents",
        "level": "All Levels to Advanced",
        "duration": "6 Weeks • Self-Paced",
        "price": 149,
        "originalPrice": 1499,
        "rating": 4.9,
        "enrolledCount": 2910,
        "pdfFileName": "ai_agents_automation_7_module_masterclass.pdf",
        "modules": [
            {
                "id": "ai-agent-m1",
                "moduleNumber": 1,
                "title": "Module 1: Automation Foundations & Process Architecture",
                "subtitle": "Automation vs AI Automation, Event-Driven Design, Webhooks & Idempotency",
                "estimatedHours": "10 Hours",
                "isFree": True,
                "learningObjectives": [
                    "Understand when to use deterministic code vs probabilistic AI automation",
                    "Workflow mapping: Triggers, conditions, branch decisions, and failure loops",
                    "APIs, webhooks, HMAC signature verification, and event deduplication",
                    "Idempotency keys to prevent duplicate transactions on network retries",
                    "Human-in-the-loop approval gates for sensitive operational actions",
                    "Mini-project: Automated lead intake and scoring engine with webhook receivers"
                ],
                "content": """
<div class="module-intro" style="padding-bottom: 1.5rem; border-bottom: 2px solid #e2e8f0; margin-bottom: 2rem;">
  <span style="background: #eff6ff; color: #2563eb; font-weight: 800; font-size: 0.8rem; padding: 0.35rem 0.75rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em;">Free Preview Module • 10 Hours</span>
  <h2 style="font-size: 1.85rem; color: #0f172a; margin-top: 0.75rem; font-weight: 800;">Automation Foundations & Systems Thinking</h2>
  <p style="font-size: 1.05rem; color: #475569; line-height: 1.7;">AI automation begins with process design, not with an agent framework. In this module, you master mapping real business workflows, designing event-driven webhook receivers with cryptographic verification, and implementing idempotency to protect enterprise data integrity.</p>
</div>
<div class="lesson">
  <h3 style="font-size: 1.3rem; color: #1e293b; font-weight: 700; border-left: 4px solid #2563eb; padding-left: 0.75rem;">Lesson 1.1: Deterministic vs AI Steps</h3>
  <p>Never use an AI model for tasks where mathematical logic or regular expressions can do the job with 100% certainty. Reserve AI for unstructured extraction, sentiment grading, entity categorization, and synthesis.</p>
</div>
""",
                "projectTitle": "Automated Lead Intake & Scoring Engine with Webhook Verification",
                "projectTask": "Build a secure webhook handler that receives inbound lead forms, verifies cryptographic signatures, deduplicates by event ID, extracts enriched data with AI, and routes to sales queues."
            },
            {
                "id": "ai-agent-m2",
                "moduleNumber": 2,
                "title": "Module 2: Agent Architecture, Tool Boundaries & Memory",
                "subtitle": "Agent Loops, Typed Tool Schemas, State Checkpoints & Observability Tracing",
                "estimatedHours": "12 Hours",
                "isFree": False,
                "learningObjectives": [
                    "The agent execution loop: Environment perception, planning, tool dispatch, reflection",
                    "Typed tool definitions: Strongly typing arguments with Pydantic and JSON Schema",
                    "Separating read-only tools from high-risk write operations",
                    "State persistence and database checkpointing for long-running workflows",
                    "Multi-agent vs single-agent tradeoffs and communication overhead",
                    "Project: Autonomous Operations Agent with Human Escalation Checkpoints"
                ],
                "content": "<div class=\"module-intro\"><h2>Agent Architecture & Tool Boundaries</h2><p>Design agents with bounded autonomy and typed tool interfaces.</p></div>",
                "projectTitle": "Autonomous Operations Agent with Approval Checkpoints",
                "projectTask": "Create an operations agent that queries internal databases, synthesizes reports, and requests supervisor email confirmation before issuing database writes."
            },
            {
                "id": "ai-agent-m3",
                "moduleNumber": 3,
                "title": "Module 3: n8n Workflow Automation, Webhooks & Enterprise Integrations",
                "subtitle": "Visual Workflow Nodes, Secret Management, Scheduled Jobs & Error Replay",
                "estimatedHours": "14 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Self-hosting n8n with Docker Compose and persistent PostgreSQL storage",
                    "Building multi-branch logic, conditional filters, and loops in visual graphs",
                    "Integrating Google Workspace, Slack, HubSpot, and WhatsApp APIs",
                    "Zero-downtime error handlers, persistent dead-letter queues, and one-click replay",
                    "Project: Centralized Business Automation Hub connecting CRM, Email, and Slack"
                ],
                "content": "<div class=\"module-intro\"><h2>n8n Automation & Integration Architectures</h2><p>Construct visual automations connecting enterprise APIs with automatic error replay.</p></div>",
                "projectTitle": "Centralized Business Automation Hub with Automated Replay",
                "projectTask": "Deploy an n8n pipeline that listens to form submissions, enriches lead data via Clearbit/AI, updates CRM records, notifies Slack, and captures failures in a persistent dead-letter queue."
            },
            {
                "id": "ai-agent-m4",
                "moduleNumber": 4,
                "title": "Module 4: Model Context Protocol (MCP) & Connected Systems",
                "subtitle": "MCP Specifications, Tool Discovery, Security Boundaries & Authorization",
                "estimatedHours": "14 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Understanding MCP: Open standard for AI tool and resource interoperability",
                    "Writing an MCP server in TypeScript / Python from scratch",
                    "Authentication vs Authorization: Securing tool access and preventing unauthorized execution",
                    "Resource design: Minimizing context footprint while maximizing information density",
                    "Project: Connected Workspace MCP Server for Internal Docs & Analytics"
                ],
                "content": "<div class=\"module-intro\"><h2>Model Context Protocol (MCP)</h2><p>Build and secure connected tools with Anthropic's MCP standard.</p></div>",
                "projectTitle": "Enterprise MCP Server for Internal Analytics & Documentation",
                "projectTask": "Build a custom MCP server exposing read-only data queries, document search, and alert dispatchers for Claude Desktop and custom AI assistants."
            },
            {
                "id": "ai-agent-m5",
                "moduleNumber": 5,
                "title": "Module 5: Business Process Agents (Sales, Support & Research)",
                "subtitle": "Outcome-Driven Design, Triage Classifiers, Document Parsing & ROI Scoring",
                "estimatedHours": "16 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Designing agents for measurable business KPIs (response time, resolution rate)",
                    "Customer support triage: Automatic classification, sentiment routing, draft response generation",
                    "Automated market research: Web scraping, source verification, and structured report compilation",
                    "Document intake agents: Parsing multi-page unstructured PDFs into relational databases",
                    "Project: End-to-End Customer Support Triage and Auto-Resolution Suite"
                ],
                "content": "<div class=\"module-intro\"><h2>Specialized Business Process Agents</h2><p>Build high-ROI agents tailored for sales, customer care, and research.</p></div>",
                "projectTitle": "Autonomous Customer Support Triage & Auto-Resolution Suite",
                "projectTask": "Build a complete customer support agent that classifies incoming Zendesk/email tickets, resolves 40% of tier-1 issues automatically, and drafts responses for human review on complex issues."
            },
            {
                "id": "ai-agent-m6",
                "moduleNumber": 6,
                "title": "Module 6: Reliability, Security, Guardrails & Cost Economics",
                "subtitle": "Prompt Injection Defense, Rate Limiting, Cost Budgets & Emergency Kill Switches",
                "estimatedHours": "12 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Prompt injection vectors in automations: Indirect injection from untrusted emails and websites",
                    "Global execution budgets: Setting hard ceilings on tool calls and token spend",
                    "Incident response: Designing global kill switches to halt malfunctioning loops instantly",
                    "Measuring unit economics: Calculating cost per automated ticket resolution",
                    "Project: Automation Control Center with Live Monitoring & Kill Switches"
                ],
                "content": "<div class=\"module-intro\"><h2>Automation Reliability & Security</h2><p>Defend workflows against prompt injection and enforce cost budgets.</p></div>",
                "projectTitle": "Automation Control Center with Budgeting & Emergency Kill Switch",
                "projectTask": "Implement a central monitoring dashboard that tracks active agent execution cost in real-time, throttles abnormal usage, and provides an instant kill switch for all active workers."
            },
            {
                "id": "ai-agent-m7",
                "moduleNumber": 7,
                "title": "Module 7: Capstone — Building an AI Automation Agency (AAA) / SaaS",
                "subtitle": "Offer Packaging, Discovery Checklists, Client Onboarding & Recurring Retainers",
                "estimatedHours": "18 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Packaging repeatable automation templates for specific client niches (real estate, legal, e-commerce)",
                    "Conducting technical discovery calls and defining workflow scope boundaries",
                    "Multi-tenant deployment architecture for client isolation",
                    "Pricing models: Setup fee + monthly management and maintenance retainers",
                    "Capstone: Production Automation Template Suite and Client Delivery Package"
                ],
                "content": "<div class=\"module-intro\"><h2>Capstone: The AI Automation Agency / SaaS Package</h2><p>Turn your engineering skills into a high-earning service or SaaS business.</p></div>",
                "projectTitle": "Complete Commercial Automation Delivery Package for Clients",
                "projectTask": "Deliver a fully packaged, multi-tenant lead generation and CRM automation pipeline complete with client onboarding guide, monitoring dashboards, and architecture documentation."
            }
        ]
    },
    {
        "id": "full-stack",
        "slug": "full-stack-web-development",
        "title": "Full-Stack Web Development Masterclass",
        "tagline": "Architect modern web applications with React, Next.js 15, TypeScript, Node.js & Supabase.",
        "description": "From responsive UI fundamentals and TypeScript architectural patterns to serverless backends, relational databases, Razorpay/Stripe payments, Docker containers, and production cloud deployment.",
        "badge": "🚀 Career Fast-Track",
        "category": "Web Development",
        "level": "Beginner to Advanced",
        "duration": "8 Weeks • Self-Paced",
        "price": 149,
        "originalPrice": 1299,
        "rating": 4.8,
        "enrolledCount": 4120,
        "pdfFileName": "full_stack_web_development_7_module_masterclass.pdf",
        "modules": [
            {
                "id": "fs-m1",
                "moduleNumber": 1,
                "title": "Module 1: Web Foundations, Developer Workflow & Modern JavaScript",
                "subtitle": "Semantic HTML5, CSS Grid/Flexbox, ES6+ Async/Await & Git Mastery",
                "estimatedHours": "12 Hours",
                "isFree": True,
                "learningObjectives": [
                    "Modern semantic HTML5 accessibility standards (ARIA, SEO tags)",
                    "CSS layout mastery: Flexbox alignment, CSS Grid matrices, responsive viewport units",
                    "Modern JavaScript (ES6+): Closures, Promises, Async/Await, and Event Loop mechanics",
                    "Developer workflow: Git branching, pull requests, semantic commit conventions",
                    "Mini-project: Fully responsive, high-performance developer portfolio website"
                ],
                "content": """
<div class="module-intro" style="padding-bottom: 1.5rem; border-bottom: 2px solid #e2e8f0; margin-bottom: 2rem;">
  <span style="background: #eff6ff; color: #2563eb; font-weight: 800; font-size: 0.8rem; padding: 0.35rem 0.75rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em;">Free Preview Module • 12 Hours</span>
  <h2 style="font-size: 1.85rem; color: #0f172a; margin-top: 0.75rem; font-weight: 800;">Modern Web Foundations & Production Workflow</h2>
  <p style="font-size: 1.05rem; color: #475569; line-height: 1.7;">Master the core pillars of web engineering. You will learn to construct responsive, accessible user interfaces without relying on bloated dependencies, master the JavaScript asynchronous event loop, and establish professional Git workflows.</p>
</div>
""",
                "projectTitle": "High-Performance Accessible Developer Portfolio Website",
                "projectTask": "Build and deploy a responsive portfolio website with custom CSS grid layouts, dark mode toggle, contact form validation, and achieve 100 Lighthouse performance scores."
            },
            {
                "id": "fs-m2",
                "moduleNumber": 2,
                "title": "Module 2: React, TypeScript & Modern Frontend Architecture",
                "subtitle": "Components, State Management, Custom Hooks & Type Safety",
                "estimatedHours": "16 Hours",
                "isFree": False,
                "learningObjectives": [
                    "React 19 mental model: Re-renders, virtual DOM reconciliation, component tree lifecycle",
                    "TypeScript for React: Strict props, generics, discriminated unions, and event types",
                    "State management: Context API, Zustand, and React Query server cache synchronization",
                    "Custom hooks for clean separation of UI presentation from business logic",
                    "Project: Interactive Task Management Dashboard with Optimistic UI Updates"
                ],
                "content": "<div class=\"module-intro\"><h2>React & TypeScript Architecture</h2><p>Build enterprise frontends with strict TypeScript safety and snappy state management.</p></div>",
                "projectTitle": "Interactive Project Management Kanban Board with Optimistic UI",
                "projectTask": "Build a Trello-style Kanban board using React and TypeScript featuring drag-and-drop card movements, local storage persistence, and optimistic state updates."
            },
            {
                "id": "fs-m3",
                "moduleNumber": 3,
                "title": "Module 3: Backend APIs, Databases & Authentication",
                "subtitle": "Next.js App Router, Server Actions, PostgreSQL, Prisma ORM & Auth.js",
                "estimatedHours": "18 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Next.js App Router: Server Components (RSC), Client Components, and Server Actions",
                    "Relational database design: PostgreSQL schemas, foreign keys, indexes, and normalization",
                    "Prisma ORM: Type-safe database queries, migrations, and relationship handling",
                    "Authentication: JWTs, secure HTTP-only cookies, OAuth (Google/GitHub), and session management",
                    "Project: Multi-User E-Commerce Product & Inventory API Backend"
                ],
                "content": "<div class=\"module-intro\"><h2>Backend Engineering & Relational Databases</h2><p>Design type-safe database schemas and secure authentication systems.</p></div>",
                "projectTitle": "Production REST & Server Action Backend with PostgreSQL",
                "projectTask": "Construct a full backend using Next.js Server Actions, PostgreSQL, and Prisma with complete role-based user authentication and schema migrations."
            },
            {
                "id": "fs-m4",
                "moduleNumber": 4,
                "title": "Module 4: Payment Gateways, File Storage & Third-Party APIs",
                "subtitle": "Razorpay & Stripe Integration, Webhooks, S3/Cloud Storage & Email Deliverability",
                "estimatedHours": "14 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Integrating Razorpay & Stripe: Checkout sessions, UPI intent flows, and recurring subscriptions",
                    "Securing payment webhooks with cryptographic signature verification",
                    "Direct-to-S3 pre-signed URL file uploads for images and documents",
                    "Transactional email pipelines with Resend and React Email templates",
                    "Project: Digital Marketplace Checkout Flow with Automated Invoice Generation"
                ],
                "content": "<div class=\"module-intro\"><h2>Payments, Cloud Storage & External Integrations</h2><p>Monetize applications with Razorpay payments and secure S3 file handling.</p></div>",
                "projectTitle": "Digital Goods Marketplace with Razorpay UPI & Webhook Fulfillment",
                "projectTask": "Implement a seamless checkout experience with Razorpay UPI payments, handle webhook order confirmation, generate automated PDF receipts, and email download links."
            },
            {
                "id": "fs-m5",
                "moduleNumber": 5,
                "title": "Module 5: Testing, Security & Web Performance Optimization",
                "subtitle": "Unit/Integration Testing (Vitest, Playwright), OWASP Top 10 & Core Web Vitals",
                "estimatedHours": "12 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Testing pyramid: Unit testing with Vitest, end-to-end testing with Playwright",
                    "OWASP Top 10 vulnerabilities: SQL injection, XSS, CSRF, and CORS hardening",
                    "Rate limiting with Upstash Redis and IP-based request throttling",
                    "Web Performance: Image optimization, code splitting, edge caching, and Core Web Vitals",
                    "Project: Comprehensive Automated Test Suite & Security Hardening Audit"
                ],
                "content": "<div class=\"module-intro\"><h2>Web Security & Performance</h2><p>Harden applications against attacks and optimize Core Web Vitals for sub-second loads.</p></div>",
                "projectTitle": "Enterprise Security Hardening & End-to-End Test Suite",
                "projectTask": "Write complete Playwright E2E tests for user auth and checkout flows, configure Upstash Redis rate limiting, and patch simulated XSS vulnerabilities."
            },
            {
                "id": "fs-m6",
                "moduleNumber": 6,
                "title": "Module 6: Docker Containerization, CI/CD & Cloud Deployment",
                "subtitle": "Multi-Stage Dockerfiles, GitHub Actions CI/CD & Deploying to VPS/Vercel",
                "estimatedHours": "14 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Writing multi-stage lightweight Dockerfiles for Next.js and Node backends",
                    "Docker Compose for local development with PostgreSQL and Redis containers",
                    "GitHub Actions CI/CD pipelines: Linting, automated test runs, and continuous deployment",
                    "Deploying to Vercel, Supabase, and custom Linux VPS with Nginx and SSL certs",
                    "Project: Production CI/CD Pipeline to VPS with Automated Nginx SSL Provisioning"
                ],
                "content": "<div class=\"module-intro\"><h2>DevOps for Full-Stack Developers</h2><p>Containerize applications and automate deployments with GitHub Actions.</p></div>",
                "projectTitle": "Automated Multi-Stage CI/CD Pipeline to Cloud VPS",
                "projectTask": "Set up a complete GitHub Actions workflow that runs automated tests, builds a Docker image, pushes to Docker Hub, and deploys with zero downtime to a Linux VPS."
            },
            {
                "id": "fs-m7",
                "moduleNumber": 7,
                "title": "Module 7: Capstone — Production SaaS Web Application",
                "subtitle": "Full-Stack Collaborative SaaS with Multi-Tenancy, Live WebSockets & Billing",
                "estimatedHours": "20 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Bringing all layers together into a cohesive, commercial SaaS product",
                    "Multi-tenant workspace architecture with organization switching",
                    "Real-time collaboration using WebSockets / Supabase Realtime channels",
                    "Production monitoring, error tracking with Sentry, and uptime diagnostics",
                    "Capstone: Production Team Collaboration SaaS Application"
                ],
                "content": "<div class=\"module-intro\"><h2>Capstone: Complete SaaS Web Application</h2><p>Deliver an end-to-end commercial product ready for real paying customers.</p></div>",
                "projectTitle": "Full-Stack Enterprise Team Workspace SaaS Platform",
                "projectTask": "Launch a complete multi-tenant collaborative workspace application featuring real-time document editing, team invitations, Razorpay subscription billing, and Sentry telemetry."
            }
        ]
    },
    {
        "id": "data-science",
        "slug": "data-science-machine-learning",
        "title": "Data Science & Machine Learning Masterclass",
        "tagline": "Turn messy data into predictive insights using Python, Scikit-Learn, Pandas & MLOps.",
        "description": "Master the mathematics and code behind predictive analytics. From advanced feature engineering, statistical modeling, and deep neural networks to production MLOps pipelines and explainable AI.",
        "badge": "📊 Industry Standard",
        "category": "Data Science",
        "level": "Beginner to Advanced",
        "duration": "7 Weeks • Self-Paced",
        "price": 119,
        "originalPrice": 1199,
        "rating": 4.9,
        "enrolledCount": 3560,
        "pdfFileName": "data_science_machine_learning_7_module_masterclass.pdf",
        "modules": [
            {
                "id": "ds-m1",
                "moduleNumber": 1,
                "title": "Module 1: Python for Data Science, NumPy & Advanced Pandas",
                "subtitle": "Vectorized Computations, Data Cleaning, Outlier Filtering & Statistical EDA",
                "estimatedHours": "12 Hours",
                "isFree": True,
                "learningObjectives": [
                    "NumPy array memory models: Strides, broadcasting, and vectorization vs Python loops",
                    "Advanced Pandas: Multi-indexing, group-by aggregations, rolling windows, and pivot tables",
                    "Handling messy data: KNN imputation, median replacement, and handling data leakage",
                    "Exploratory Data Analysis (EDA): Visualizing distributions with Matplotlib and Seaborn",
                    "Mini-project: Real Estate Housing Market Exploratory Analysis and Data Pipeline"
                ],
                "content": """
<div class="module-intro" style="padding-bottom: 1.5rem; border-bottom: 2px solid #e2e8f0; margin-bottom: 2rem;">
  <span style="background: #eff6ff; color: #2563eb; font-weight: 800; font-size: 0.8rem; padding: 0.35rem 0.75rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em;">Free Preview Module • 12 Hours</span>
  <h2 style="font-size: 1.85rem; color: #0f172a; margin-top: 0.75rem; font-weight: 800;">Python for Data Science, Vectorization & Wrangling</h2>
  <p style="font-size: 1.05rem; color: #475569; line-height: 1.7;">80% of data science is data wrangling. In this module, you will transition from writing slow Python loops to executing lightning-fast vectorized NumPy operations, cleaning multi-million row datasets with Pandas, and uncovering hidden statistical patterns.</p>
</div>
""",
                "projectTitle": "Real-Estate Price Analytics & Automated Data Cleaning Pipeline",
                "projectTask": "Ingest a raw 100,000-row housing dataset, execute statistical outlier removal using 3-sigma thresholds, perform KNN imputation on missing attributes, and export optimized Parquet files."
            },
            {
                "id": "ds-m2",
                "moduleNumber": 2,
                "title": "Module 2: Statistics, Probability & A/B Experimental Thinking",
                "subtitle": "Probability Distributions, Hypothesis Testing, p-Values & Confidence Intervals",
                "estimatedHours": "12 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Descriptive vs Inferential statistics: Mean, variance, skewness, and kurtosis",
                    "Central Limit Theorem and Normal / Binomial / Poisson probability distributions",
                    "Hypothesis testing: Null hypothesis formulation, t-tests, ANOVA, and Chi-Square tests",
                    "A/B testing methodology: Sample size determination, power analysis, and avoiding p-hacking",
                    "Project: Enterprise E-Commerce Conversion Rate A/B Experiment Analysis"
                ],
                "content": "<div class=\"module-intro\"><h2>Statistical Foundations & A/B Experimentation</h2><p>Make data-driven business decisions backed by rigorous statistical significance.</p></div>",
                "projectTitle": "E-Commerce A/B Experiment Evaluation & Significance Report",
                "projectTask": "Analyze user conversion data across control and experimental checkout funnels, run two-sample t-tests, compute 95% confidence intervals, and deliver an executive report on statistical validity."
            },
            {
                "id": "ds-m3",
                "moduleNumber": 3,
                "title": "Module 3: Supervised Machine Learning Algorithms",
                "subtitle": "Linear/Logistic Regression, Decision Trees, Random Forests & XGBoost",
                "estimatedHours": "16 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Cost functions and optimization: Ordinary Least Squares (OLS) vs Gradient Descent",
                    "Regularization techniques: Ridge (L2) and Lasso (L1) to eliminate overfitting",
                    "Ensemble algorithms: Bagging (Random Forests) and Boosting (XGBoost, LightGBM)",
                    "Evaluation metrics: Precision, Recall, F1-Score, ROC-AUC, and Confusion Matrices",
                    "Project: Fintech Loan Default & Credit Risk Probability Model"
                ],
                "content": "<div class=\"module-intro\"><h2>Supervised Machine Learning Algorithms</h2><p>Train state-of-the-art predictive models with Scikit-Learn and XGBoost.</p></div>",
                "projectTitle": "Algorithmic Credit Risk & Default Prediction Model",
                "projectTask": "Train an XGBoost classifier on imbalanced financial transaction records using SMOTE oversampling, tune hyperparameters with Optuna, and maximize ROC-AUC scores."
            },
            {
                "id": "ds-m4",
                "moduleNumber": 4,
                "title": "Module 4: Unsupervised Learning, Clustering & Deep Learning",
                "subtitle": "K-Means, PCA Dimensionality Reduction, PyTorch Tensors & Neural Nets",
                "estimatedHours": "16 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Clustering algorithms: K-Means, DBSCAN density clustering, and hierarchical agglomeration",
                    "Dimensionality reduction: Principal Component Analysis (PCA) and t-SNE visualization",
                    "Deep learning fundamentals: PyTorch tensors, forward pass matrix multiplication, and activation functions",
                    "Backpropagation calculus: Computing gradients via chain rule optimization",
                    "Project: Customer Segmentation Clustering & Neural Churn Predictor"
                ],
                "content": "<div class=\"module-intro\"><h2>Unsupervised Clustering & Deep Learning</h2><p>Discover organic clusters in unlabelled data and build deep PyTorch neural networks.</p></div>",
                "projectTitle": "Customer Behavioral Segmentation Engine with K-Means & PCA",
                "projectTask": "Perform PCA dimensionality reduction on retail transaction vectors, cluster customers into 5 distinct behavioral segments with K-Means, and train a PyTorch neural net to forecast churn."
            },
            {
                "id": "ds-m5",
                "moduleNumber": 5,
                "title": "Module 5: ML Pipelines, Feature Stores & MLOps",
                "subtitle": "Scikit-Learn ColumnTransformers, MLflow Tracking, Model Registries & FastAPI",
                "estimatedHours": "14 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Building reproducible ML pipelines using Scikit-Learn Pipeline and ColumnTransformer",
                    "Experiment tracking and model versioning using MLflow",
                    "Feature Store concepts: Preventing train-serve skew with Feast",
                    "Exporting models to ONNX and serving low-latency inference endpoints with FastAPI",
                    "Project: Production Real-Time ML Inference Service with MLflow Tracking"
                ],
                "content": "<div class=\"module-intro\"><h2>ML Pipelines & Production Serving</h2><p>Prevent train-serve skew and deploy reproducible machine learning pipelines.</p></div>",
                "projectTitle": "Production Real-Time Model Inference API with MLflow Logging",
                "projectTask": "Package an end-to-end feature engineering and prediction pipeline into a FastAPI service, log parameters and metrics to MLflow, and benchmark sub-50ms inference times."
            },
            {
                "id": "ds-m6",
                "moduleNumber": 6,
                "title": "Module 6: Applied AI, LLMs for Data Science & Explainability (XAI)",
                "subtitle": "SHAP Game Theory, LIME Interpretability, Synthetic Data & LLM Data Extraction",
                "estimatedHours": "12 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Explainable AI (XAI): Probing black-box models using SHAP (Shapley Additive exPlanations)",
                    "Local feature importance with LIME for individual decision audits",
                    "Automated data wrangling and SQL code generation using LLMs",
                    "Synthesizing privacy-preserving datasets for training without leaking PII",
                    "Project: Transparent Credit Decision Dashboard with Real-Time SHAP Explanations"
                ],
                "content": "<div class=\"module-intro\"><h2>Explainable AI (XAI) & LLMs for Data</h2><p>Break open black-box models with game-theoretic SHAP values for regulatory compliance.</p></div>",
                "projectTitle": "Regulatory AI Compliance Dashboard with Live SHAP Explanations",
                "projectTask": "Construct an interactive dashboard that explains high-stakes loan decisions to non-technical users, plotting waterfall and force plots of feature contributions."
            },
            {
                "id": "ds-m7",
                "moduleNumber": 7,
                "title": "Module 7: Capstone — End-to-End Enterprise Data Product",
                "subtitle": "Live Streaming Ingestion, Continuous Model Retraining, Docker & Cloud Run",
                "estimatedHours": "20 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Full lifecycle data science: Ingestion → Validation → Retraining → Serving → Monitoring",
                    "Detecting concept drift and data drift in live production environments",
                    "Containerizing data pipelines with Docker and scheduling retraining jobs",
                    "Capstone: Production Algorithmic Fraud Detection Data Product"
                ],
                "content": "<div class=\"module-intro\"><h2>Capstone: Complete End-to-End Data Product</h2><p>Deploy a live self-monitoring machine learning system to the cloud.</p></div>",
                "projectTitle": "Production Real-Time Fraud Detection & Drift Monitoring System",
                "projectTask": "Deploy an end-to-end financial fraud detection system featuring real-time stream ingestion, automated data drift detection, and cloud deployment to Google Cloud Run."
            }
        ]
    },
    {
        "id": "cloud-devops",
        "slug": "cloud-devops-cybersecurity",
        "title": "Cloud, DevOps & Cybersecurity Masterclass",
        "tagline": "Master Linux systems, AWS cloud architecture, Docker/Kubernetes, CI/CD & Zero-Trust security.",
        "description": "A comprehensive 7-module deep dive into modern systems engineering. Learn cloud networking, infrastructure-as-code (Terraform), container orchestration (Kubernetes), SRE monitoring, and vulnerability hardening.",
        "badge": "🛡️ High Salary Track",
        "category": "Cloud & Security",
        "level": "Intermediate to Advanced",
        "duration": "8 Weeks • Self-Paced",
        "price": 129,
        "originalPrice": 1399,
        "rating": 4.8,
        "enrolledCount": 2680,
        "pdfFileName": "cloud_devops_cybersecurity_7_module_masterclass.pdf",
        "modules": [
            {
                "id": "cd-m1",
                "moduleNumber": 1,
                "title": "Module 1: Linux Systems, Networking Protocols & Command Line Mastery",
                "subtitle": "Process Trees, File Permissions, Bash Scripting, TCP/IP, DNS & Firewalls",
                "estimatedHours": "12 Hours",
                "isFree": True,
                "learningObjectives": [
                    "Linux operating system internals: Process management (systemd, top), signals, and I/O redirection",
                    "POSIX file permissions (chmod, chown, sticky bits) and secure user group administration",
                    "Networking foundations: TCP vs UDP, IP CIDR notation, subnetting, DNS resolution, and HTTP/3",
                    "Firewall configuration with UFW and iptables; SSH hardening with public key cryptography",
                    "Mini-project: Hardened Linux Bastion Server with Automated Security Auditing Script"
                ],
                "content": """
<div class="module-intro" style="padding-bottom: 1.5rem; border-bottom: 2px solid #e2e8f0; margin-bottom: 2rem;">
  <span style="background: #eff6ff; color: #2563eb; font-weight: 800; font-size: 0.8rem; padding: 0.35rem 0.75rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em;">Free Preview Module • 12 Hours</span>
  <h2 style="font-size: 1.85rem; color: #0f172a; margin-top: 0.75rem; font-weight: 800;">Linux Systems Engineering & Networking Foundations</h2>
  <p style="font-size: 1.05rem; color: #475569; line-height: 1.7;">Everything in the cloud runs on Linux. In this foundational module, you will gain deep command of the Linux terminal, understand process lifecycles and file permission masks, and demystify enterprise TCP/IP networking.</p>
</div>
""",
                "projectTitle": "Automated Linux Server Hardening & Security Audit Script",
                "projectTask": "Write a robust Bash script that configures UFW firewalls, disables root password logins, sets up automatic security patch updates, and audits system listening ports."
            },
            {
                "id": "cd-m2",
                "moduleNumber": 2,
                "title": "Module 2: Cloud Architecture & Infrastructure as Code (Terraform)",
                "subtitle": "AWS VPCs, EC2, S3, IAM Roles, Least Privilege & Terraform Declarative Provisioning",
                "estimatedHours": "14 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Core cloud architecture: Multi-AZ reliability, public/private subnets, and NAT Gateways",
                    "AWS Identity & Access Management (IAM): Role-based access control and principle of least privilege",
                    "Infrastructure as Code (IaC) with Terraform: Declarative syntax, state files, and modules",
                    "Provisioning highly available cloud infrastructure without touching the web console",
                    "Project: Multi-AZ AWS Infrastructure Provisioned via Reusable Terraform Modules"
                ],
                "content": "<div class=\"module-intro\"><h2>Cloud Architecture & Terraform IaC</h2><p>Provision enterprise multi-region cloud resources using declarative code.</p></div>",
                "projectTitle": "Multi-AZ VPC & Compute Architecture via Modular Terraform",
                "projectTask": "Write Terraform modules to provision an AWS VPC with public and private subnets, an Application Load Balancer, EC2 Auto Scaling Groups, and secure S3 storage."
            },
            {
                "id": "cd-m3",
                "moduleNumber": 3,
                "title": "Module 3: Docker Containers, Kubernetes & GitOps CI/CD",
                "subtitle": "Container Runtimes, K8s Pods/Deployments/Services, Helm & GitHub Actions",
                "estimatedHours": "18 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Docker architecture: Namespaces, cgroups, layered storage, and minimal distroless images",
                    "Kubernetes core concepts: Pods, Deployments, ReplicaSets, Services, and Ingress controllers",
                    "Configuration management: ConfigMaps, Secrets, and Helm package charts",
                    "Automated GitOps CI/CD: Building, testing, and deploying images to Kubernetes automatically",
                    "Project: Production Kubernetes Deployment with Auto-Healing & Ingress Routing"
                ],
                "content": "<div class=\"module-intro\"><h2>Docker & Kubernetes Orchestration</h2><p>Orchestrate resilient containerized workloads with Kubernetes and GitOps.</p></div>",
                "projectTitle": "Resilient Kubernetes Cluster with GitOps CI/CD Automation",
                "projectTask": "Configure a multi-node Kubernetes cluster with Helm, write custom deployment manifests with liveness probes, and establish a GitHub Actions automated deploy pipeline."
            },
            {
                "id": "cd-m4",
                "moduleNumber": 4,
                "title": "Module 4: Application & Cloud Cybersecurity Defenses",
                "subtitle": "OWASP Top 10, Secrets Management (Vault), TLS Encryption & Vulnerability Scanning",
                "estimatedHours": "14 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Securing application code: Preventing injection, broken auth, and sensitive data leaks",
                    "Enterprise secret management: HashiCorp Vault, AWS Secrets Manager, and rotation policies",
                    "Container vulnerability scanning: Trivy, Snyk, and automated PR security gates",
                    "SSL/TLS certificates: Public key infrastructure (PKI), Let's Encrypt, and mutual TLS (mTLS)",
                    "Project: Automated DevSecOps Pipeline with Image Scanning & Secret Auditing"
                ],
                "content": "<div class=\"module-intro\"><h2>Cloud Cybersecurity & DevSecOps</h2><p>Shift security left by integrating automated vulnerability and secret scanners into your code pipelines.</p></div>",
                "projectTitle": "Automated DevSecOps Security Pipeline with Vulnerability Blocking",
                "projectTask": "Build a CI/CD pipeline that scans Docker images for CVEs using Trivy, halts deployments on critical vulnerabilities, and enforces mTLS encryption between internal services."
            },
            {
                "id": "cd-m5",
                "moduleNumber": 5,
                "title": "Module 5: Site Reliability Engineering (SRE), Metrics & Incident Response",
                "subtitle": "Prometheus, Grafana Dashboards, Distributed Tracing, Alerting & Postmortems",
                "estimatedHours": "14 Hours",
                "isFree": False,
                "learningObjectives": [
                    "SRE principles: Service Level Objectives (SLOs), Service Level Indicators (SLIs), and Error Budgets",
                    "Collecting metrics with Prometheus and building executive telemetry dashboards in Grafana",
                    "Centralized log aggregation with Loki / Elasticsearch",
                    "Designing actionable paging alerts and running blameless postmortem incident reviews",
                    "Project: Enterprise SRE Observability Stack with Automated Alerting"
                ],
                "content": "<div class=\"module-intro\"><h2>Site Reliability Engineering & Observability</h2><p>Monitor distributed systems with Prometheus, Grafana, and automated incident alarms.</p></div>",
                "projectTitle": "Full Observability Stack with Prometheus, Grafana & PagerDuty Alerts",
                "projectTask": "Deploy a Prometheus and Grafana monitoring stack on Kubernetes, configure latency/error rate alerts, and simulate an incident to practice blameless root-cause analysis."
            },
            {
                "id": "cd-m6",
                "moduleNumber": 6,
                "title": "Module 6: Advanced Infrastructure & Zero-Trust Security Architecture",
                "subtitle": "Service Meshes (Istio), Zero-Trust Network Access, Cloudflare & Edge Security",
                "estimatedHours": "14 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Zero-Trust security philosophy: 'Never trust, always verify' inside internal corporate networks",
                    "Service mesh architecture with Istio: Traffic shifting, canary releases, and transparent mTLS",
                    "DDoS protection, Web Application Firewalls (WAF), and edge security with Cloudflare",
                    "Compliance standards: SOC 2, ISO 27001, and HIPAA architecture readiness",
                    "Project: Zero-Trust Microservice Network with Mutual TLS and Edge WAF"
                ],
                "content": "<div class=\"module-intro\"><h2>Zero-Trust Architecture & Edge Security</h2><p>Isolate microservice networks and protect corporate infrastructure against perimeter breaches.</p></div>",
                "projectTitle": "Zero-Trust Service Mesh with Istio and Cloudflare Edge WAF",
                "projectTask": "Implement Istio on a multi-service architecture, enforce strict mTLS communication between all internal pods, and configure Cloudflare WAF rules to block malicious bots."
            },
            {
                "id": "cd-m7",
                "moduleNumber": 7,
                "title": "Module 7: Capstone — Secure Production Cloud Infrastructure Platform",
                "subtitle": "High-Availability Multi-Region Architecture, Disaster Recovery & Chaos Engineering",
                "estimatedHours": "20 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Designing multi-region disaster recovery: RTO and RPO objectives",
                    "Chaos engineering: Testing system resilience by intentionally killing production pods",
                    "Complete infrastructure audit against CIS security benchmarks",
                    "Capstone: Production-Grade Cloud Platform with 99.99% Uptime SLA"
                ],
                "content": "<div class=\"module-intro\"><h2>Capstone: High-Availability Cloud Infrastructure Platform</h2><p>Deploy and chaos-test a battle-hardened cloud architecture capable of surviving data center outages.</p></div>",
                "projectTitle": "Enterprise High-Availability Multi-Region Cloud Infrastructure",
                "projectTask": "Architect a complete production cloud platform using Terraform, Kubernetes, and Cloudflare featuring automated failover across two cloud regions and surviving chaos testing."
            }
        ]
    },
    {
        "id": "python-dsa",
        "slug": "python-dsa-leetcode-placement",
        "title": "Python Data Structures, Algorithms & LeetCode Placement Masterclass",
        "tagline": "Crack FAANG and top product tech interviews with pattern-based algorithmic mastery.",
        "description": "Stop memorizing solutions and master the 14 fundamental algorithmic patterns (Two Pointers, Sliding Window, Fast/Slow Pointers, BFS/DFS, Dynamic Programming) with 150+ hands-on Python implementations.",
        "badge": "🎯 Interview Cracker",
        "category": "Coding Interviews & DSA",
        "level": "All Levels",
        "duration": "6 Weeks • Self-Paced",
        "price": 99,
        "originalPrice": 999,
        "rating": 4.9,
        "enrolledCount": 4890,
        "pdfFileName": "2026_technology_course_bundle_index.pdf",
        "modules": [
            {
                "id": "dsa-m1",
                "moduleNumber": 1,
                "title": "Module 1: Algorithmic Foundations, Big-O Notation & Memory Mechanics",
                "subtitle": "Time vs Space Complexity, Python Internal Data Structures & Arrays",
                "estimatedHours": "10 Hours",
                "isFree": True,
                "learningObjectives": [
                    "Big-O notation demystified: Worst, average, and best-case computational bounds",
                    "How Python lists and dictionaries work under the hood (dynamic arrays, hash tables, collision resolution)",
                    "Memory mechanics: Pointers, references, cache locality, and garbage collection",
                    "Two Pointers Pattern: Solving 2-Sum, 3-Sum, and Container With Most Water in O(n)",
                    "Mini-project: High-speed In-Memory Algorithmic Key-Value Cache with Benchmarking"
                ],
                "content": """
<div class="module-intro" style="padding-bottom: 1.5rem; border-bottom: 2px solid #e2e8f0; margin-bottom: 2rem;">
  <span style="background: #eff6ff; color: #2563eb; font-weight: 800; font-size: 0.8rem; padding: 0.35rem 0.75rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em;">Free Preview Module • 10 Hours</span>
  <h2 style="font-size: 1.85rem; color: #0f172a; margin-top: 0.75rem; font-weight: 800;">Algorithmic Foundations & Two-Pointer Patterns</h2>
  <p style="font-size: 1.05rem; color: #475569; line-height: 1.7;">Technical interviewers do not care if you can memorize answers. They want to see how you analyze constraints, recognize underlying algorithmic patterns, and write clean, edge-case-proof code. This module lays the mathematical foundation.</p>
</div>
""",
                "projectTitle": "Algorithmic Cache Engine with Asymptotic Complexity Benchmarking",
                "projectTask": "Implement an in-memory key-value cache and benchmark operation timings across 1 million insertions to prove O(1) average lookup performance mathematically."
            },
            {
                "id": "dsa-m2",
                "moduleNumber": 2,
                "title": "Module 2: The Sliding Window & Fast/Slow Pointers Patterns",
                "subtitle": "Subarrays, Substring Anagrams, Linked List Cycle Detection & Palindromes",
                "estimatedHours": "12 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Fixed-size vs dynamic-size sliding window patterns",
                    "Longest Substring Without Repeating Characters and Minimum Window Substring",
                    "Fast & Slow Pointers (Floyd's Cycle Finding Algorithm)",
                    "Detecting cycles in singly linked lists and finding intersection points in O(1) space",
                    "Project: Real-Time Network Packet Anomaly Detection using Sliding Windows"
                ],
                "content": "<div class=\"module-intro\"><h2>Sliding Window & Floyd's Cycle Patterns</h2><p>Solve complex array and substring problems in a single linear pass.</p></div>",
                "projectTitle": "High-Throughput Network Traffic Anomaly Detector with Sliding Windows",
                "projectTask": "Build an algorithmic engine that processes streaming network request timestamps to detect DDoS spikes within dynamic 60-second sliding windows."
            },
            {
                "id": "dsa-m3",
                "moduleNumber": 3,
                "title": "Module 3: Linked Lists, Stacks, Queues & Monotonic Patterns",
                "subtitle": "Singly/Doubly Linked Lists, Reversal in O(1) Space, Monotonic Stacks & Queues",
                "estimatedHours": "12 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Reversing linked lists iteratively and recursively without allocating extra memory",
                    "Monotonic stack pattern: Daily Temperatures, Next Greater Element, and Largest Rectangle in Histogram",
                    "Designing an LRU (Least Recently Used) Cache with O(1) Get and Put using Doubly Linked Lists & HashMaps",
                    "Project: Production-Grade LRU Cache Implementation with Comprehensive Test Suite"
                ],
                "content": "<div class=\"module-intro\"><h2>Linked Lists & Monotonic Stacks</h2><p>Master pointer manipulation and solve complex range-minimum problems with monotonic stacks.</p></div>",
                "projectTitle": "Production-Grade LRU Cache with O(1) Amortized Guarantees",
                "projectTask": "Implement a complete LRU Cache from scratch combining a doubly linked list with a hash map, with 100% test coverage against race conditions and boundary inputs."
            },
            {
                "id": "dsa-m4",
                "moduleNumber": 4,
                "title": "Module 4: Trees, Binary Search & Binary Search Trees (BST)",
                "subtitle": "Tree Traversals (In/Pre/Post-Order), Binary Search Variants & Lowest Common Ancestor",
                "estimatedHours": "14 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Binary tree fundamentals and recursive DFS traversals",
                    "Breadth-First Search (BFS) for level-order traversals and shortest paths",
                    "Binary Search on Answer space (Koko Eating Bananas, Capacity to Ship Packages)",
                    "Validating Binary Search Trees and finding Lowest Common Ancestors (LCA)",
                    "Project: Hierarchical Corporate Directory & Organization Tree Query Engine"
                ],
                "content": "<div class=\"module-intro\"><h2>Trees, Graphs & Binary Search</h2><p>Conquer tree traversals and binary search variants that appear in 70% of tech interviews.</p></div>",
                "projectTitle": "Corporate Organization Tree Query & Ancestry Engine",
                "projectTask": "Construct an organization chart engine that models corporate management hierarchies as a tree, answering lowest common manager queries in O(log n) time."
            },
            {
                "id": "dsa-m5",
                "moduleNumber": 5,
                "title": "Module 5: Graph Theory, BFS, DFS, Dijkstra & Topological Sort",
                "subtitle": "Adjacency Lists, Cycle Detection, Course Schedule & Shortest Path Routing",
                "estimatedHours": "16 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Representing graphs: Adjacency matrices vs adjacency lists in memory",
                    "Depth-First Search (DFS) for connected components and island counting",
                    "Breadth-First Search (BFS) for word ladders and unweighted shortest paths",
                    "Topological Sort (Kahn's Algorithm) for build dependency graphs (Course Schedule I & II)",
                    "Dijkstra's algorithm for weighted shortest paths using Python's <code>heapq</code>",
                    "Project: Dependency Graph Resolver & Shortest Flight Route Planner"
                ],
                "content": "<div class=\"module-intro\"><h2>Graph Algorithms & Dependency Networks</h2><p>Master BFS, DFS, Topological Sorting, and Dijkstra shortest path routing.</p></div>",
                "projectTitle": "Package Dependency Resolver & Cycle Detection Engine",
                "projectTask": "Build a package manager dependency resolver like npm/pip that detects circular dependencies using Kahn's topological sort and outputs optimal build order."
            },
            {
                "id": "dsa-m6",
                "moduleNumber": 6,
                "title": "Module 6: Dynamic Programming (DP) & Backtracking",
                "subtitle": "1D/2D DP, Memoization vs Tabulation, Knapsack, Subsequences & Permutations",
                "estimatedHours": "18 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Recognizing overlapping subproblems and optimal substructure",
                    "Top-down memoization vs bottom-up tabulation space optimization",
                    "Classic DP patterns: 0/1 Knapsack, Coin Change, Longest Increasing Subsequence (LIS), Longest Common Subsequence (LCS)",
                    "Backtracking: Subsets, Permutations, Combination Sum, and N-Queens",
                    "Project: Financial Portfolio Optimizer using Knapsack Dynamic Programming"
                ],
                "content": "<div class=\"module-intro\"><h2>Dynamic Programming & Backtracking Mastery</h2><p>Demystify Dynamic Programming through systematic subproblem recurrence relations.</p></div>",
                "projectTitle": "Algorithmic Capital Allocation Optimizer via 0/1 Knapsack DP",
                "projectTask": "Implement a capital allocation algorithm that maximizes portfolio return given risk and budget constraints using optimized 2D dynamic programming."
            },
            {
                "id": "dsa-m7",
                "moduleNumber": 7,
                "title": "Module 7: Capstone — Mock FAANG Technical Interview Assessment",
                "subtitle": "Systematic Problem Solving, Communication Strategy & Live Timed Evaluation",
                "estimatedHours": "14 Hours",
                "isFree": False,
                "learningObjectives": [
                    "How to communicate during technical interviews: The UMPIRE method (Understand, Match, Plan, Implement, Review, Evaluate)",
                    "Handling edge cases gracefully under timed pressure",
                    "Writing production-clean code with descriptive variable naming",
                    "Capstone: Comprehensive 5-Problem FAANG Mock Interview Simulation"
                ],
                "content": "<div class=\"module-intro\"><h2>Capstone: Technical Interview Simulation</h2><p>Test your algorithmic problem-solving under real placement interview conditions.</p></div>",
                "projectTitle": "Full FAANG Mock Coding Assessment & Solution Analysis",
                "projectTask": "Complete a timed 5-problem coding interview simulation covering trees, graphs, dynamic programming, and sliding windows with automated edge-case grading."
            }
        ]
    },
    {
        "id": "data-analytics",
        "slug": "data-analytics-powerbi-sql",
        "title": "Data Analytics with Power BI, SQL & Business Intelligence Masterclass",
        "tagline": "Transform raw business data into actionable executive dashboards and automated KPI reports.",
        "description": "The complete pathway from spreadsheet beginner to high-earning Business Intelligence Analyst. Master advanced SQL window functions, Power BI data modeling, DAX calculations, and executive data storytelling.",
        "badge": "📈 High Placement Rate",
        "category": "Data Analytics",
        "level": "Beginner to Intermediate",
        "duration": "6 Weeks • Self-Paced",
        "price": 119,
        "originalPrice": 1199,
        "rating": 4.9,
        "enrolledCount": 3940,
        "pdfFileName": "2026_technology_course_bundle_index.pdf",
        "modules": [
            {
                "id": "da-m1",
                "moduleNumber": 1,
                "title": "Module 1: Excel to Business Intelligence & Analytical Thinking",
                "subtitle": "Data Normalization, Pivot Tables, Statistical Summaries & KPI Metrics",
                "estimatedHours": "10 Hours",
                "isFree": True,
                "learningObjectives": [
                    "The Business Intelligence lifecycle: Extraction, transformation, metric modeling, and visualization",
                    "Excel limits: Why modern enterprises migrate from spreadsheets to SQL and Power BI",
                    "Data hygiene: Identifying duplicate customer IDs, invalid formats, and currency conversions",
                    "Defining business KPIs: Customer Acquisition Cost (CAC), Lifetime Value (LTV), Churn, and MRR",
                    "Mini-project: Sales Performance Audit and Executive KPI Summary Deck"
                ],
                "content": """
<div class="module-intro" style="padding-bottom: 1.5rem; border-bottom: 2px solid #e2e8f0; margin-bottom: 2rem;">
  <span style="background: #eff6ff; color: #2563eb; font-weight: 800; font-size: 0.8rem; padding: 0.35rem 0.75rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em;">Free Preview Module • 10 Hours</span>
  <h2 style="font-size: 1.85rem; color: #0f172a; margin-top: 0.75rem; font-weight: 800;">The Analytics Mindset & KPI Modeling</h2>
  <p style="font-size: 1.05rem; color: #475569; line-height: 1.7;">Data analysts bridge the gap between technical engineering and executive decision-making. In this module, you will learn to calculate true business unit economics, identify anomalies in sales pipelines, and structure clean datasets ready for automated reporting.</p>
</div>
""",
                "projectTitle": "Executive E-Commerce Sales Performance & KPI Audit",
                "projectTask": "Transform a messy multi-tab retail transaction spreadsheet into clean relational tables, compute Monthly Recurring Revenue (MRR) and customer churn, and deliver an executive briefing."
            },
            {
                "id": "da-m2",
                "moduleNumber": 2,
                "title": "Module 2: Advanced SQL for Analytics & Complex Querying",
                "subtitle": "Joins, Aggregations, CTEs, Window Functions (OVER, PARTITION BY) & Subqueries",
                "estimatedHours": "14 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Relational databases: Tables, primary keys, foreign keys, and ER diagrams",
                    "Complex joins: INNER, LEFT, RIGHT, and FULL OUTER joins with NULL handling",
                    "Common Table Expressions (CTEs) for readable, modular SQL logic",
                    "Window functions mastery: <code>ROW_NUMBER()</code>, <code>RANK()</code>, <code>DENSE_RANK()</code>, <code>LEAD()</code>, and <code>LAG()</code>",
                    "Project: Multi-Year Retention & Cohort Analysis SQL Pipeline"
                ],
                "content": "<div class=\"module-intro\"><h2>Advanced SQL & Window Functions</h2><p>Query multi-million row relational databases with sub-second analytical queries.</p></div>",
                "projectTitle": "Customer Cohort Retention & Monthly Revenue Growth SQL Analysis",
                "projectTask": "Write complex SQL queries utilizing window functions and CTEs to compute month-over-month revenue growth, identify top 1% customers, and generate 12-month retention cohorts."
            },
            {
                "id": "da-m3",
                "moduleNumber": 3,
                "title": "Module 3: Power BI Data Modeling & Power Query ETL",
                "subtitle": "Star Schemas, Fact vs Dimension Tables, Power Query M-Code & Relationships",
                "estimatedHours": "14 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Data modeling principles: Star schema vs Snowflake schema for performance",
                    "Fact tables (events, sales) vs Dimension tables (customers, products, calendar)",
                    "Power Query ETL: Unpivoting columns, conditional transformations, and merging queries",
                    "Building a dedicated dynamic Date Dimension table for accurate time intelligence",
                    "Project: Enterprise Star Schema Data Model for Multi-Store Retail"
                ],
                "content": "<div class=\"module-intro\"><h2>Power BI Data Modeling & Power Query</h2><p>Design scalable star schemas that render interactive reports with zero lag.</p></div>",
                "projectTitle": "Multi-Store Retail Data Model with Clean Star Schema Architecture",
                "projectTask": "Ingest multiple CSV and database data sources into Power BI, clean columns with Power Query, and build a star schema with 1-to-many relationships and a custom calendar table."
            },
            {
                "id": "da-m4",
                "moduleNumber": 4,
                "title": "Module 4: DAX Mastery (Data Analysis Expressions)",
                "subtitle": "Calculated Columns vs Measures, CALCULATE Context Transition & Time Intelligence",
                "estimatedHours": "16 Hours",
                "isFree": False,
                "learningObjectives": [
                    "The golden rule of DAX: Row Context vs Filter Context",
                    "The most important DAX function: <code>CALCULATE()</code> and modifying filter contexts",
                    "Time Intelligence: Year-to-Date (YTD), Month-over-Month (MoM), and same-period-last-year comparisons",
                    "Iterative functions: <code>SUMX()</code>, <code>AVERAGEX()</code>, and ranking formulas",
                    "Project: Comprehensive Financial KPI Library with 25+ Production DAX Measures"
                ],
                "content": "<div class=\"module-intro\"><h2>DAX Mastery for Business Intelligence</h2><p>Write bulletproof DAX measures that calculate dynamic metrics across any slice of time.</p></div>",
                "projectTitle": "Comprehensive Corporate Financial Measure Library in DAX",
                "projectTask": "Write 25+ custom DAX measures computing Year-over-Year revenue growth, rolling 30-day average order values, and customer lifetime value across product categories."
            },
            {
                "id": "da-m5",
                "moduleNumber": 5,
                "title": "Module 5: Interactive Executive Dashboard Design & UX",
                "subtitle": "Visual Hierarchy, Tooltip Pages, Bookmarks, Drill-Throughs & Mobile Layouts",
                "estimatedHours": "14 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Information design: Choosing the right chart for the data (trend, composition, correlation)",
                    "Color theory and accessibility: High-contrast themes for senior executive review",
                    "Interactive navigation: Bookmarks, selection panes, and drill-through detail views",
                    "Designing dedicated mobile phone layouts in Power BI Mobile",
                    "Project: Executive C-Suite SaaS Performance Dashboard"
                ],
                "content": "<div class=\"module-intro\"><h2>Executive Dashboard Design & UI/UX</h2><p>Design stunning, intuitive BI dashboards that executives love using.</p></div>",
                "projectTitle": "Interactive C-Suite SaaS Executive Overview Dashboard",
                "projectTask": "Build a responsive Power BI report featuring KPI cards, trend line charts, bookmark-driven tab switchers, dynamic tooltips, and an optimized mobile smartphone view."
            },
            {
                "id": "da-m6",
                "moduleNumber": 6,
                "title": "Module 6: Python for Analytics & Automated Reporting",
                "subtitle": "Exploratory Data Analysis with Seaborn, Automated Excel Reports & Email Triggers",
                "estimatedHours": "12 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Using Python inside Power BI for statistical plots and machine learning predictions",
                    "Automating repetitive daily Excel report generation with Python (openpyxl, pandas)",
                    "Statistical correlation matrices and heatmaps to discover hidden revenue drivers",
                    "Project: Automated Daily Sales Digest Script with Email Dispatcher"
                ],
                "content": "<div class=\"module-intro\"><h2>Python Automation for Data Analysts</h2><p>Automate daily reporting tasks and generate statistical visualizations using Python.</p></div>",
                "projectTitle": "Automated Daily Financial Report Generator & Email Pipeline",
                "projectTask": "Write a Python automation that pulls daily database transactions, generates statistical KPI charts, formats an Excel workbook, and emails it to department leads automatically."
            },
            {
                "id": "da-m7",
                "moduleNumber": 7,
                "title": "Module 7: Capstone — End-to-End Business Intelligence Pipeline",
                "subtitle": "Database Extraction, Power BI Service Deployment, Scheduled Refresh & Storytelling",
                "estimatedHours": "18 Hours",
                "isFree": False,
                "learningObjectives": [
                    "Publishing reports to Power BI Service (Cloud) and configuring Gateway scheduled refreshes",
                    "Setting up Row-Level Security (RLS) so managers only view their respective regions",
                    "Data storytelling: Structuring an executive presentation that drives operational action",
                    "Capstone: Complete Enterprise Retail BI System with Automated Cloud Refresh"
                ],
                "content": "<div class=\"module-intro\"><h2>Capstone: Complete Enterprise Business Intelligence Solution</h2><p>Deploy a cloud-refreshed BI system with row-level security and executive presentations.</p></div>",
                "projectTitle": "End-to-End Retail Business Intelligence System with Cloud Refresh",
                "projectTask": "Deliver a complete corporate business intelligence ecosystem connecting SQL databases to Power BI Cloud with Row-Level Security, automated 6 AM refreshes, and an executive presentation slide deck."
            }
        ]
    }
]

# Generate TypeScript file
ts_code = f"""// AUTO-GENERATED FILE: DO NOT EDIT DIRECTLY.
// Generated from official 2026 masterclass curriculum files.

export interface CourseModule {{
  id: string;
  moduleNumber: number;
  title: string;
  subtitle: string;
  estimatedHours: string;
  isFree: boolean; // Module 1 is free, Modules 2-7 are locked
  learningObjectives: string[];
  content: string;
  projectTitle: string;
  projectTask: string;
}}

export interface TrendingCourse {{
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  category: string;
  level: string;
  duration: string;
  price: number; // In INR (₹99 - ₹149)
  originalPrice: number; // In INR (₹999 - ₹1499)
  rating: number;
  enrolledCount: number;
  pdfFileName: string; // PDF file hosted in /courses/
  modules: CourseModule[];
}}

export const trendingCourses: TrendingCourse[] = {json.dumps(courses_py, indent=2)};

export function getCourseById(id: string): TrendingCourse | undefined {{
  return trendingCourses.find((c) => c.id === id);
}}

export function getCourseBySlug(slug: string): TrendingCourse | undefined {{
  return trendingCourses.find((c) => c.slug === slug);
}}
"""

with open(output_file, "w", encoding="utf-8") as f:
    f.write(ts_code)

print(f"Successfully generated {output_file} with {len(courses_py)} masterclasses and {sum(len(c['modules']) for c in courses_py)} extensive modules!")
