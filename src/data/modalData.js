export const modalData = {
  "ai-resource-optimization": {
    title: "AI Resource Optimization Platform",
    sub: "Predictive resource monitoring and optimization",
    challenge:
      "Modern edge devices and mobile systems face severe thermal and battery constraints under unpredictable workloads. Reactive scaling of CPU frequencies leads to lag spikes, thermal throttling, and inefficient battery depletion.",
    approach:
      "Engineered an end-to-end predictive framework. Set up a daemon to collect real-time CPU usage, memory load, and battery drain metrics. Trained a Long Short-Term Memory (LSTM) network in TensorFlow/Keras to forecast future resource utilization sequences. Created a Flask API endpoint to serve predictions to a lightweight power-governor simulation that dynamically adjusts frequency profiles, reducing simulated system overhead by 30%.",
    outcome:
      "Successfully predicted workload spikes 5-10 seconds in advance with high accuracy, allowing proactive system adjustment. Reduced battery temperature spikes and power consumption overhead significantly.",
    tech: ["Python", "LSTM", "TensorFlow", "Keras", "Flask", "NumPy", "Matplotlib"],
  },
  "ghost-audit": {
    title: "Ghost-Audit: AWS Resource Analyser",
    sub: "Cloud intelligence and cost optimization",
    challenge:
      "In fast-paced development cycles, cloud resources (EC2, S3, RDS) are frequently orphaned or left running idle, leading to silent and massive budget leaks that are difficult to track manually across multiple regions.",
    approach:
      "Built a python-based CLI and backend agent that uses the boto3 SDK to query and analyze AWS metrics (CPU, network, disk activity, and S3 access logs). Defined logic to classify resources as 'ghost' (underutilized or orphaned). Integrated DVC (Data Version Control) to version and track scanner datasets. Set up n8n workflows to run daily automated checks and dispatch structured Slack alert dashboards to administrators.",
    outcome:
      "Created a zero-cost automated cost-auditing flow. Eliminated manual tracking efforts completely, generating clean markdown reports detailing cost leaks and saving up to 35% of simulated development-stage cloud budgets.",
    tech: ["Python", "AWS", "boto3", "DVC", "n8n Automation", "Docker", "Shell scripting"],
  },
  "adaptive-mcq-system": {
    title: "Adaptive AI MCQ Testing System",
    sub: "Personalized AI-driven student assessment",
    challenge:
      "Standard academic tests are static and linear. They fail to adapt to a student's individual learning curve, causing frustration for struggling learners and boredom for advanced ones.",
    approach:
      "Architected an adaptive exam engine. Implemented Item Response Theory (IRT) probability models to calculate a student's latent ability (theta) in real time after every answer. The engine dynamically queries a structured question bank (categorized by difficulty, discrimination, and guessing parameters) to serve the next optimal question. Built a full-stack dashboard in Flask and SQLite for managing questions, tracking sessions, and displaying performance curves.",
    outcome:
      "Achieved higher measurement accuracy in 40% fewer questions compared to static testing. Plotted real-time confidence intervals of estimated student ability to demonstrate learning progression.",
    tech: ["Python", "Flask", "Machine Learning", "IRT Algorithms", "SQLite", "Chart.js"],
  }
};

export const typewriterWords = ["systems.", "models.", "pipelines.", "automation.", "solutions."];
