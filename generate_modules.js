const fs = require('fs');

const content = `export interface Module {
  id: string;
  title: string;
  content: string;
}

export const modules: Module[] = [
  {
    id: "python-ai",
    title: "Module 1: Python for Artificial Intelligence",
    content: \`
      <div class="module-intro" style="padding-bottom: 2rem; border-bottom: 2px solid #e8ecf2; margin-bottom: 2rem;">
        <span style="color: var(--blue-600); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">Estimated Time: 40 Hours</span>
        <h2 style="font-size: 2rem; margin-top: 0.5rem;">The Foundations of AI Engineering</h2>
        <p style="font-size: 1.1rem; color: #4b5563; line-height: 1.8;">Welcome to the FutureAI intensive program. This first module is designed to break down your existing knowledge and rebuild it using the rigorous standards of enterprise AI engineering. You are not just learning Python; you are learning how to build highly optimized, production-grade pipelines.</p>
      </div>

      <div class="lesson" style="margin-bottom: 3rem;">
        <h3>Lesson 1.1: Environment Setup & Vectorization</h3>
        <p>In the real world, you do not use standard IDLEs. You build reproducible environments.</p>
        <h4>Virtual Environments (vEnv / Conda)</h4>
        <p>Every AI project requires a strict dependency tree. A mismatch in TensorFlow or PyTorch versions will crash your servers in production. You will start by installing Anaconda and managing environments.</p>
        <pre><code>conda create -n futureai_env python=3.10
conda activate futureai_env
pip install numpy pandas scikit-learn matplotlib jupyterlab</code></pre>
        <h4>The Vectorization Paradigm</h4>
        <p>AI models require the processing of millions of data points simultaneously. Standard Python <code>for</code> loops are executed in C, but the Python interpreter must lock and unlock the Global Interpreter Lock (GIL) for every single iteration. This is unacceptably slow.</p>
        <p>You must learn <strong>Vectorization</strong>. By leveraging NumPy, we push the loop down into pre-compiled C-code, bypassing the GIL entirely. An operation that takes 5 minutes in a Python loop will take 0.5 seconds in NumPy.</p>
        <pre><code>import numpy as np
import time

# Create 10 million random numbers
data = np.random.rand(10000000)

# The slow, naive way
start = time.time()
sum_val = 0
for i in data:
    sum_val += i
print("Loop took:", time.time() - start, "seconds")

# The Professional AI Engineer way
start = time.time()
sum_val = np.sum(data)
print("Vectorized took:", time.time() - start, "seconds") # 100x faster!
</code></pre>
      </div>

      <div class="lesson" style="margin-bottom: 3rem;">
        <h3>Lesson 1.2: Advanced Pandas & Feature Engineering</h3>
        <p>Data comes to you dirty. It has missing values, skewed distributions, and categorical strings that ML models cannot read. Pandas is the industry standard for Data Wrangling.</p>
        <h4>Dealing with Missing Data (Imputation)</h4>
        <p>If you drop rows with missing data, you lose statistical power. If you fill them with zeros, you introduce massive bias. You must learn statistical imputation:</p>
        <ul>
          <li><strong>Mean Imputation:</strong> Good for normally distributed data.</li>
          <li><strong>Median Imputation:</strong> Required if the data is heavily skewed (e.g., income data).</li>
          <li><strong>K-Nearest Neighbors (KNN) Imputation:</strong> An advanced technique that uses the 5 most similar rows to guess the missing value.</li>
        </ul>
        <pre><code>import pandas as pd
from sklearn.impute import KNNImputer

df = pd.read_csv("enterprise_data.csv")

# Initialize the imputer
imputer = KNNImputer(n_neighbors=5)
df_filled = pd.DataFrame(imputer.fit_transform(df), columns=df.columns)
</code></pre>
        <h4>One-Hot Encoding & Label Encoding</h4>
        <p>Machine learning models only understand matrices of numbers. If a column is "City" (e.g., New York, London, Tokyo), you cannot feed that to an AI. You use One-Hot Encoding to convert categories into binary arrays (1s and 0s).</p>
      </div>

      <div class="lesson" style="background: #f8fafc; padding: 2rem; border-radius: 12px; border-left: 4px solid var(--blue-600);">
        <h3>Project 1: Real-Estate Price Predictor API Prep</h3>
        <p><strong>Scenario:</strong> The FutureAI Analytics team has provided you with a 50GB dataset of housing transactions over the last decade. It is riddled with errors.</p>
        <p><strong>Your Task:</strong></p>
        <ol>
          <li>Write a Python script that loads the data in chunks using Pandas to avoid Out-Of-Memory (OOM) errors.</li>
          <li>Perform rigorous Exploratory Data Analysis (EDA). Plot the distribution of house prices using Seaborn. Identify and remove mathematical outliers (values beyond 3 standard deviations).</li>
          <li>Engineer 3 entirely new features (e.g., 'Age of Home', 'Distance to City Center').</li>
          <li>Save the cleaned, perfectly formatted data to an optimized <code>.parquet</code> file format (which is 10x faster than CSV for machine learning).</li>
        </ol>
      </div>
    \`
  },
  {
    id: "regression",
    title: "Module 2: Advanced Regression & Statistical Modeling",
    content: \`
      <div class="module-intro" style="padding-bottom: 2rem; border-bottom: 2px solid #e8ecf2; margin-bottom: 2rem;">
        <span style="color: var(--blue-600); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">Estimated Time: 50 Hours</span>
        <h2 style="font-size: 2rem; margin-top: 0.5rem;">Predictive Analytics at Scale</h2>
        <p style="font-size: 1.1rem; color: #4b5563; line-height: 1.8;">Before building highly complex neural networks, an AI engineer must perfectly understand the mathematical mechanics of standard Machine Learning. Regression is the baseline against which all advanced AI is measured.</p>
      </div>

      <div class="lesson" style="margin-bottom: 3rem;">
        <h3>Lesson 2.1: The Mathematics of Linear Models</h3>
        <p>Multiple Linear Regression maps an N-dimensional vector of inputs (X) to a continuous output (Y). The model is defined by:</p>
        <p style="font-family: monospace; background: #eee; padding: 0.5rem; display: inline-block;">Y = β0 + β1*X1 + β2*X2 + ... + βn*Xn + ε</p>
        <p>Where β represents the learned weights, and ε represents the irreducible error.</p>
        <h4>Gradient Descent vs. Normal Equation</h4>
        <p>We train the model by minimizing the Mean Squared Error (MSE) cost function. While small datasets can be solved instantly via matrix inversion (the Normal Equation), enterprise datasets with millions of rows require <strong>Gradient Descent</strong>.</p>
        <p>Gradient Descent iteratively updates weights by calculating the partial derivative of the Cost Function with respect to every weight, moving steps down the gradient slope toward the minimum.</p>
      </div>

      <div class="lesson" style="margin-bottom: 3rem;">
        <h3>Lesson 2.2: The Curse of Dimensionality & Regularization</h3>
        <p>As you add more features to your dataset, the volume of the space increases so fast that the available data becomes sparse. This leads directly to <strong>Overfitting</strong>—the model perfectly memorizes the training data but completely fails on new, real-world data.</p>
        <h4>L1 (Lasso) and L2 (Ridge) Regularization</h4>
        <p>To combat this, we forcefully limit the size of the model's weights by adding a penalty term to the cost function.</p>
        <ul>
          <li><strong>Ridge (L2):</strong> Penalizes the square of the weights. Forces the model to use all features but keeps their influence small and balanced.</li>
          <li><strong>Lasso (L1):</strong> Penalizes the absolute value of the weights. This actually forces useless weights to become exactly zero, effectively performing automatic Feature Selection.</li>
        </ul>
        <pre><code>from sklearn.linear_model import Ridge, Lasso

# Alpha represents the regularization strength. Higher alpha = stricter penalty.
ridge_model = Ridge(alpha=10.0)
lasso_model = Lasso(alpha=0.1)

ridge_model.fit(X_train, y_train)
</code></pre>
      </div>

      <div class="lesson" style="margin-bottom: 3rem;">
        <h3>Lesson 2.3: Logistic Regression & Classification Metrics</h3>
        <p>When the output is categorical (e.g., "Fraud" vs "Not Fraud"), Linear Regression fails. We use Logistic Regression, which wraps the linear equation in a Sigmoid activation function to output a strict probability between 0.0 and 1.0.</p>
        <h4>The Confusion Matrix</h4>
        <p>In the real world, accuracy is a lie. If you are predicting a rare disease that only 1 in 10,000 people have, an AI that simply says "Nobody has the disease" is 99.99% accurate, but fundamentally useless. You must learn the Confusion Matrix:</p>
        <ul>
          <li><strong>True Positives (TP):</strong> We predicted fraud, and it was fraud.</li>
          <li><strong>False Positives (FP) [Type I Error]:</strong> We predicted fraud, but it was a normal transaction. (Customer gets angry their card is blocked).</li>
          <li><strong>False Negatives (FN) [Type II Error]:</strong> We predicted normal, but it was fraud! (The bank loses money).</li>
        </ul>
        <p>Based on these, we calculate <strong>Precision</strong> (How many of our 'Fraud' alerts were actually right?) and <strong>Recall</strong> (Out of all the real fraud, how much did we catch?).</p>
      </div>

      <div class="lesson" style="background: #f8fafc; padding: 2rem; border-radius: 12px; border-left: 4px solid var(--blue-600);">
        <h3>Project 2: Algorithmic Credit Risk Modeling</h3>
        <p><strong>Scenario:</strong> You are the lead ML Engineer at a Fintech startup. You need to build an algorithm that approves or denies loan applications instantly.</p>
        <p><strong>Your Task:</strong></p>
        <ol>
          <li>Ingest a massive financial ledger dataset.</li>
          <li>Handle highly imbalanced classes using SMOTE (Synthetic Minority Over-sampling Technique) so the AI doesn't become biased towards the majority class.</li>
          <li>Train an ElasticNet model (combining L1 and L2 regularization) to predict default probability.</li>
          <li>Generate a ROC-AUC Curve and select the exact classification threshold that maximizes bank profit while minimizing false rejections.</li>
        </ol>
      </div>
    \`
  },
  {
    id: "neural-networks",
    title: "Module 3: Deep Learning & Neural Architectures",
    content: \`
      <div class="module-intro" style="padding-bottom: 2rem; border-bottom: 2px solid #e8ecf2; margin-bottom: 2rem;">
        <span style="color: var(--blue-600); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">Estimated Time: 60 Hours</span>
        <h2 style="font-size: 2rem; margin-top: 0.5rem;">The Architecture of the Mind</h2>
        <p style="font-size: 1.1rem; color: #4b5563; line-height: 1.8;">We now leave classical statistics and enter the realm of Representation Learning. By stacking layers of artificial neurons, we create systems capable of automatically discovering the optimal representations of raw data.</p>
      </div>

      <div class="lesson" style="margin-bottom: 3rem;">
        <h3>Lesson 3.1: Tensor Mathematics & The Forward Pass</h3>
        <p>A Deep Neural Network (DNN) is essentially a massive sequence of matrix multiplications intercut with non-linear activation functions.</p>
        <p>Let's track data through a single layer:</p>
        <ol>
          <li><strong>Input Tensor (X):</strong> A batch of data (e.g., 32 images flattened into a 1D array).</li>
          <li><strong>Weight Matrix (W):</strong> The learned parameters of the network.</li>
          <li><strong>Bias Vector (b):</strong> Shifts the activation threshold.</li>
          <li><strong>Z = X*W + b:</strong> The linear transformation.</li>
          <li><strong>A = ReLU(Z):</strong> The non-linear activation. Without this, a 1000-layer neural network collapses mathematically into a single linear regression equation.</li>
        </ol>
      </div>

      <div class="lesson" style="margin-bottom: 3rem;">
        <h3>Lesson 3.2: The Calculus of Backpropagation</h3>
        <p>This is the most critical concept in modern AI. Backpropagation allows the network to learn from its mistakes by calculating how much every single weight contributed to the final error.</p>
        <p>It utilizes the <strong>Chain Rule of Calculus</strong>. We calculate the derivative of the Loss function with respect to the output, then the derivative of the output with respect to the hidden layer, all the way back to the input layer.</p>
        <h4>Vanishing & Exploding Gradients</h4>
        <p>In very deep networks (e.g., 50+ layers), multiplying small gradients together repeatedly causes the gradient to shrink exponentially. By the time it reaches the first layers, the gradient is 0.000000001. The early layers stop learning entirely! This is why the industry abandoned the Sigmoid activation function for hidden layers and adopted <strong>ReLU (Rectified Linear Unit)</strong>.</p>
      </div>

      <div class="lesson" style="margin-bottom: 3rem;">
        <h3>Lesson 3.3: Optimization Algorithms (Adam vs SGD)</h3>
        <p>Standard Stochastic Gradient Descent (SGD) is slow and prone to getting stuck in saddle points. In enterprise environments, we use advanced optimizers like <strong>Adam (Adaptive Moment Estimation)</strong>.</p>
        <p>Adam keeps an exponentially decaying average of past gradients (momentum - acting like a heavy ball rolling down a hill) AND past squared gradients (velocity - acting like friction). This allows it to dynamically adjust the learning rate for every single parameter individually in real-time.</p>
        <pre><code>import torch.optim as optim

# Standard PyTorch optimizer setup for enterprise models
optimizer = optim.Adam(model.parameters(), lr=0.001, weight_decay=1e-5) # weight_decay adds L2 regularization
scheduler = optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode='min', patience=5, factor=0.5)
</code></pre>
      </div>

      <div class="lesson" style="background: #f8fafc; padding: 2rem; border-radius: 12px; border-left: 4px solid var(--blue-600);">
        <h3>Project 3: PyTorch Enterprise Pipeline</h3>
        <p><strong>Scenario:</strong> You are tasked with building a deep neural network from scratch using PyTorch to predict complex mechanical failure in manufacturing plants based on real-time multi-sensor telemetry data.</p>
        <p><strong>Your Task:</strong></p>
        <ol>
          <li>Subclass <code>torch.utils.data.Dataset</code> and build a custom Data Loader capable of asynchronously batching millions of rows of telemetry data directly to the GPU.</li>
          <li>Design a deep Multi-Layer Perceptron (MLP) architecture using PyTorch's <code>nn.Module</code>.</li>
          <li>Implement Dropout layers and Batch Normalization to ensure the network generalizes to new factories.</li>
          <li>Write a custom training loop, calculate the Cross-Entropy loss, call <code>loss.backward()</code>, and step the optimizer. Track metrics via Weights & Biases (WandB) dashboards.</li>
        </ol>
      </div>
    \`
  },
  {
    id: "generative-ai",
    title: "Module 4: Applied Generative AI & Large Language Models",
    content: \`
      <div class="module-intro" style="padding-bottom: 2rem; border-bottom: 2px solid #e8ecf2; margin-bottom: 2rem;">
        <span style="color: var(--blue-600); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">Estimated Time: 80 Hours</span>
        <h2 style="font-size: 2rem; margin-top: 0.5rem;">The Cutting Edge of AI</h2>
        <p style="font-size: 1.1rem; color: #4b5563; line-height: 1.8;">Generative AI represents a paradigm shift. We are no longer classifying existing data; we are synthesizing novel text, code, audio, and visuals. This module covers the exact architectures powering ChatGPT, Midjourney, and GitHub Copilot.</p>
      </div>

      <div class="lesson" style="margin-bottom: 3rem;">
        <h3>Lesson 4.1: The Transformer Architecture</h3>
        <p>In 2017, Google researchers published "Attention Is All You Need," rendering older RNN/LSTM models obsolete overnight. The core of the Transformer is the <strong>Self-Attention Mechanism</strong>.</p>
        <p>Unlike Recurrent Neural Networks that process text sequentially (word-by-word), Transformers process the entire sequence simultaneously. They calculate an Attention Score (using Query, Key, and Value matrices) that determines how strongly every single word in a sentence relates to every other word.</p>
        <p>For example, in the sentence "The animal didn't cross the street because it was too tired", the self-attention mechanism strongly associates "it" with "animal", rather than "street", giving the network true semantic understanding.</p>
      </div>

      <div class="lesson" style="margin-bottom: 3rem;">
        <h3>Lesson 4.2: Lifecycle of a Large Language Model (LLM)</h3>
        <p>Models like GPT-4 are not built in one step. They undergo a massive multi-stage training pipeline:</p>
        <ol>
          <li><strong>Pre-training (Unsupervised):</strong> The model reads 10+ Terabytes of raw internet text on massive GPU clusters. Its only goal is predicting the next token. Through this process, it organically learns grammar, facts, coding logic, and reasoning.</li>
          <li><strong>Supervised Fine-Tuning (SFT):</strong> Human experts write thousands of high-quality conversational prompts and responses. This teaches the raw engine to format its output like a helpful assistant rather than continuing a Wikipedia article.</li>
          <li><strong>Reinforcement Learning from Human Feedback (RLHF):</strong> The model generates multiple answers, humans rank them, and an RL algorithm updates the model to align with human safety and preference standards.</li>
        </ol>
      </div>

      <div class="lesson" style="margin-bottom: 3rem;">
        <h3>Lesson 4.3: Retrieval-Augmented Generation (RAG)</h3>
        <p>LLMs suffer from two fatal flaws for enterprise use: they hallucinate facts, and their knowledge cutoff is fixed. <strong>RAG</strong> solves this entirely.</p>
        <p>When you build an Enterprise RAG pipeline:</p>
        <ul>
          <li>You chunk your company's private PDFs and codebases into paragraphs.</li>
          <li>You use an Embedding Model to convert those text chunks into high-dimensional vectors (arrays of 1536 floating-point numbers) representing semantic meaning.</li>
          <li>You store these in a <strong>Vector Database</strong> (like Pinecone or Milvus).</li>
          <li>When a user asks a question, the system converts the question to a vector, searches the database mathematically via Cosine Similarity for the top 5 most relevant paragraphs, and injects those paragraphs directly into the LLM prompt.</li>
        </ul>
        <pre><code># The Prompt Engineering framework for RAG
PROMPT = """
You are a highly intelligent financial assistant.
Answer the user's question STRICTLY using ONLY the provided context block below.
If the answer is not in the context, output: "I cannot find this in the documents."

CONTEXT: {retrieved_documents}

USER QUESTION: {user_query}
"""</code></pre>
      </div>

      <div class="lesson" style="background: #f8fafc; padding: 2rem; border-radius: 12px; border-left: 4px solid var(--blue-600);">
        <h3>Project 4: Building an Enterprise RAG Chatbot</h3>
        <p><strong>Scenario:</strong> The Legal department needs a chatbot to instantly query a massive archive of 5,000 dense contract PDFs.</p>
        <p><strong>Your Task:</strong></p>
        <ol>
          <li>Set up a Python pipeline using LangChain to ingest the PDFs and chunk them efficiently with a 200-token overlap to maintain context.</li>
          <li>Generate embeddings using the OpenAI API and upsert them into a Pinecone Vector Database index.</li>
          <li>Build a FastAPI backend that handles user queries, performs the vector similarity search, and streams the LLM response back to a frontend application in real-time.</li>
        </ol>
      </div>
    \`
  },
  {
    id: "computer-vision",
    title: "Module 5: Advanced Computer Vision & Object Detection",
    content: \`
      <div class="module-intro" style="padding-bottom: 2rem; border-bottom: 2px solid #e8ecf2; margin-bottom: 2rem;">
        <span style="color: var(--blue-600); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">Estimated Time: 50 Hours</span>
        <h2 style="font-size: 2rem; margin-top: 0.5rem;">Perception and the Physical World</h2>
        <p style="font-size: 1.1rem; color: #4b5563; line-height: 1.8;">Giving machines the ability to interpret and extract meaningful information from the physical world is the core requirement for robotics, autonomous driving, and medical imaging. We dive deep into spatial AI.</p>
      </div>

      <div class="lesson" style="margin-bottom: 3rem;">
        <h3>Lesson 5.1: Convolutional Neural Networks (CNNs)</h3>
        <p>Why do we use convolutions instead of dense layers for images? If you flatten a 4K image and feed it to a dense layer, you would need trillions of weights, overflowing VRAM instantly. CNNs use shared weight kernels (filters) that slide across the image, exploiting spatial locality.</p>
        <h4>The Hierarchy of Features</h4>
        <p>As an image passes deeper into a CNN, the network learns a hierarchy of complexity:</p>
        <ul>
          <li><strong>Early Layers:</strong> Learn simple geometric shapes—vertical edges, horizontal lines, gradients, and basic color blobs.</li>
          <li><strong>Middle Layers:</strong> Combine edges to recognize textures, circles, corners, and patterns (e.g., fur, scales, wheels).</li>
          <li><strong>Deep Layers:</strong> Combine textures to recognize highly complex, high-level semantic objects (e.g., a specific dog breed, a human face, a stop sign).</li>
        </ul>
      </div>

      <div class="lesson" style="margin-bottom: 3rem;">
        <h3>Lesson 5.2: Transfer Learning Paradigms</h3>
        <p>In modern AI, nobody trains a massive CNN from scratch unless they have millions of dollars of compute. We rely on Transfer Learning.</p>
        <p>Tech giants have spent vast sums training architectures (ResNet, EfficientNet, Vision Transformers) on datasets like ImageNet (14 million images). We download these pre-trained "Foundation Models". We freeze the convolutional layers (which have already learned universal visual features) and only replace the final Classification Head to learn our specific, narrow task.</p>
      </div>

      <div class="lesson" style="margin-bottom: 3rem;">
        <h3>Lesson 5.3: YOLO & Real-Time Object Detection</h3>
        <p>Classification just tells you "There is a dog in this image". Object Detection tells you "There is a dog at X:150, Y:300".</p>
        <p>Traditional sliding-window algorithms were too slow for video. The <strong>YOLO (You Only Look Once)</strong> architecture revolutionized this. It frames object detection as a single regression problem. The image is passed through the network exactly once, and it outputs a tensor containing the coordinates of bounding boxes and class probabilities simultaneously, allowing for real-time 120 FPS processing required for autonomous driving.</p>
      </div>

      <div class="lesson" style="background: #f8fafc; padding: 2rem; border-radius: 12px; border-left: 4px solid var(--blue-600);">
        <h3>Project 5: Defect Detection in Manufacturing</h3>
        <p><strong>Scenario:</strong> A semiconductor factory needs to automatically detect microscopic cracks on silicon wafers moving along a high-speed conveyor belt.</p>
        <p><strong>Your Task:</strong></p>
        <ol>
          <li>Take a small dataset of 500 defective wafer images and use aggressive Data Augmentation (rotations, flips, contrast shifts, noise injection) to artificially expand the dataset to 10,000 images.</li>
          <li>Load a pre-trained ResNet-50 model via PyTorch. Freeze all deep layers.</li>
          <li>Train the new classification head to identify "Healthy" vs "Cracked" wafers with 99.5% accuracy.</li>
          <li>Deploy the model to process a live OpenCV video stream, drawing red boxes around anomalies in real-time.</li>
        </ol>
      </div>
    \`
  },
  {
    id: "deployment-mlops",
    title: "Module 6: Enterprise MLOps & Scalable Deployment",
    content: \`
      <div class="module-intro" style="padding-bottom: 2rem; border-bottom: 2px solid #e8ecf2; margin-bottom: 2rem;">
        <span style="color: var(--blue-600); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">Estimated Time: 55 Hours</span>
        <h2 style="font-size: 2rem; margin-top: 0.5rem;">From Notebook to Production Pipeline</h2>
        <p style="font-size: 1.1rem; color: #4b5563; line-height: 1.8;">The biggest failure point in AI is the transition from research to production. 80% of machine learning models built by data scientists never make it to production. In this module, you transition from a Data Scientist to a Machine Learning Operations (MLOps) Engineer.</p>
      </div>

      <div class="lesson" style="margin-bottom: 3rem;">
        <h3>Lesson 6.1: Docker Containerization</h3>
        <p>AI dependency management is a nightmare. A model trained on PyTorch 2.1 and CUDA 11.8 will instantly crash if deployed to a server running PyTorch 1.9. "It works on my machine" is unacceptable.</p>
        <p>You must learn Docker. Docker allows you to package your model, your API code, and an entire stripped-down Linux operating system with the exact required dependencies into a single, immutable container image that will run identically anywhere in the world.</p>
        <pre><code># Multi-stage Dockerfile for AI Inference
FROM python:3.10-slim-buster as builder
WORKDIR /app
COPY requirements.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /app/wheels -r requirements.txt

FROM python:3.10-slim-buster
WORKDIR /app
COPY --from=builder /app/wheels /wheels
RUN pip install --no-cache /wheels/*
COPY ./src ./src
COPY ./models/resnet_v2.onnx ./models/

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8080"]</code></pre>
      </div>

      <div class="lesson" style="margin-bottom: 3rem;">
        <h3>Lesson 6.2: High-Performance APIs with FastAPI</h3>
        <p>To let other applications use your AI, you wrap it in a REST API. FastAPI is the industry standard due to its asynchronous capabilities and automatic Swagger UI generation. You will learn to build asynchronous inference endpoints, handle base64 image decoding, and queue heavy requests via Celery/Redis to prevent server timeouts.</p>
      </div>

      <div class="lesson" style="margin-bottom: 3rem;">
        <h3>Lesson 6.3: Kubernetes & Cloud Infrastructure</h3>
        <p>What happens when your AI app goes viral and you jump from 10 users to 10,000 users overnight? A single server will crash. You need horizontal scaling.</p>
        <p><strong>Kubernetes (K8s)</strong> is an orchestration engine. You configure it to monitor the CPU and GPU usage of your AI containers. If the load exceeds 80%, Kubernetes will automatically spin up 10 new replica containers, route the massive traffic to them using a Load Balancer, and then destroy them to save money once traffic drops back down.</p>
      </div>

      <div class="lesson" style="background: #f8fafc; padding: 2rem; border-radius: 12px; border-left: 4px solid var(--blue-600);">
        <h3>Project 6: Complete End-to-End MLOps Pipeline</h3>
        <p><strong>Scenario:</strong> You are deploying an NLP sentiment analysis model for a social media platform.</p>
        <p><strong>Your Task:</strong></p>
        <ol>
          <li>Convert the PyTorch model to the heavily optimized ONNX format for 3x faster inference.</li>
          <li>Build a FastAPI wrapper endpoint.</li>
          <li>Write a Dockerfile and push the image to Google Container Registry (GCR).</li>
          <li>Write a GitHub Actions CI/CD pipeline that automatically runs PyTest unit tests on every commit, builds the new Docker image, and auto-deploys to Google Cloud Run.</li>
        </ol>
      </div>
    \`
  },
  {
    id: "ai-ethics",
    title: "Module 7: AI Governance, Safety, & Ethics",
    content: \`
      <div class="module-intro" style="padding-bottom: 2rem; border-bottom: 2px solid #e8ecf2; margin-bottom: 2rem;">
        <span style="color: var(--blue-600); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">Estimated Time: 30 Hours</span>
        <h2 style="font-size: 2rem; margin-top: 0.5rem;">Building Safe Systems</h2>
        <p style="font-size: 1.1rem; color: #4b5563; line-height: 1.8;">As AI rapidly integrates into our global infrastructure—dictating financial loans, steering vehicles, filtering resumes, and generating news—the potential for catastrophic systemic harm increases exponentially. FutureAI demands that our engineers build safe, compliant, and deeply ethical systems.</p>
      </div>

      <div class="lesson" style="margin-bottom: 3rem;">
        <h3>Lesson 7.1: Algorithmic Bias & The Feedback Loop</h3>
        <p>Machine learning models are mathematical mirrors; they reflect the biases inherent in their training data. If you train a police-deployment AI based on historical arrest records, the AI will heavily target historically over-policed minority neighborhoods, generating more arrest data in those neighborhoods, which then feeds back into the model to further justify targeting them. This is a destructive mathematical feedback loop.</p>
        <p>We will explore algorithmic debiasing methods, such as re-weighting minority classes, adversarial debiasing, and actively optimizing for Equality of Opportunity metrics.</p>
      </div>

      <div class="lesson" style="margin-bottom: 3rem;">
        <h3>Lesson 7.2: Explainability & Interpretability (XAI)</h3>
        <p>In highly regulated industries (finance, healthcare), strict laws (like the EU's GDPR) grant citizens the 'Right to Explanation'. When an AI denies a citizen a mortgage loan, you cannot legally say "The neural network decided it." You must explain exactly why. Deep Neural Networks, however, are notoriously opaque "black boxes".</p>
        <p>We solve this using <strong>SHAP (SHapley Additive exPlanations)</strong>. Grounded in cooperative game theory, SHAP mathematically probes the black box by mutating inputs and tracking the output, ultimately assigning a distinct, exact contribution score to every single feature (e.g., "Income contributed +15% to approval, but zip code contributed -20%").</p>
      </div>

      <div class="lesson" style="margin-bottom: 3rem;">
        <h3>Lesson 7.3: Adversarial Robustness and Security</h3>
        <p>AI systems have entirely new attack vectors that traditional cybersecurity cannot block:</p>
        <ul>
          <li><strong>Data Poisoning:</strong> Malicious actors subtly altering open-source training data (like Wikipedia or public GitHub repos) to create "backdoors" in the model.</li>
          <li><strong>Adversarial Examples:</strong> Calculating specific visual noise gradients that look completely invisible to human eyes but force a self-driving car's vision system to confidently classify a "Stop Sign" as a "Speed Limit 60" sign.</li>
          <li><strong>Prompt Injection:</strong> Hackers injecting invisible instructions into website text that forces an LLM summarizing the page to exfiltrate private user data via invisible markdown image requests.</li>
        </ul>
      </div>

      <div class="lesson" style="background: #f8fafc; padding: 2rem; border-radius: 12px; border-left: 4px solid var(--blue-600);">
        <h3>Project 7: Legal Compliance Audit</h3>
        <p><strong>Scenario:</strong> Your company is launching an AI-driven medical diagnosis tool in the European Union.</p>
        <p><strong>Your Task:</strong></p>
        <ol>
          <li>Conduct a full audit under the EU AI Act framework. Classify the system into the correct risk tier (High-Risk).</li>
          <li>Generate a comprehensive SHAP explainer dashboard for the doctors using the tool, guaranteeing they can override the AI's diagnosis based on the feature importance metrics.</li>
          <li>Implement strict data anonymization protocols to ensure zero violation of GDPR patient data privacy laws during model retraining.</li>
        </ol>
      </div>
    \`
  }
];
`;

fs.writeFileSync('src/data/modules.ts', content, 'utf8');
console.log('Modules written successfully!');
