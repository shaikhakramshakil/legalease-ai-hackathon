# Legalease AI ⚖️✨

**Legalease AI** is a revolutionary mobile-first application designed to demystify complex legal documents for the average person. Leveraging a powerful suite of Google Cloud AI technologies, our app transforms dense legal jargon into simple, actionable insights, making law accessible to everyone.

This project was built as a Minimum Viable Product (MVP) for our hackathon submission.

---

## 🚀 The Problem

In India, millions of people sign contracts, leases, and agreements every day without fully understanding the terms. Legal documents are often filled with complex language, hidden clauses, and risks that can lead to significant financial or personal hardship. The high cost and inaccessibility of legal advice leave many vulnerable.

## 💡 Our Solution

Legalease AI is your personal AI-powered legal assistant. By simply uploading a document, users can get an instant, easy-to-understand breakdown of its contents. Our app highlights key clauses, identifies potential risks, and even translates the summary into Hindi, empowering users to make informed decisions with confidence.

---

## ✨ Key Features

Our MVP showcases a rich set of features designed to provide immediate value to users:

-   **📄 Document Upload & OCR**: Users can upload legal documents in various formats (PDF, JPG, PNG). Our pipeline uses Google's Document AI to perform Optical Character Recognition (OCR), accurately extracting text and preserving the original layout, even from scanned images.

-   **🤖 AI-Powered Summarization**: At its core, Legalease AI uses **Gemini Pro** to generate concise, plain-language summaries. It intelligently identifies and highlights the most critical clauses, such as:
    -   Payment Dates & Amounts
    -   Penalties & Late Fees
    -   Renewal & Termination Conditions
    -   Liabilities & Obligations

-   **🚨 Intelligent Risk Highlighting**: The app doesn't just summarize; it analyzes. Using models trained on Indian contract law, it applies color-coded tags to clauses, flagging them as `high`, `medium`, or `low` risk. This gives users an instant visual cue about which parts of the document require the most attention.

-   **🌐 Bilingual Output (English & Hindi)**: To bridge language barriers, users can switch between English and Hindi with a single click. The translated summaries are generated using Google's advanced translation models, ensuring accuracy and readability.

-   **💬 Interactive AI Assistant**: Users can "chat" with their document. Our integrated AI assistant, powered by Gemini, allows users to ask specific questions about the document (e.g., "What happens if I miss a payment?") and receive contextual answers based on the document's content.

-   **🔊 Text-to-Speech (Read Aloud)**: For enhanced accessibility, users can have the plain-language summary read aloud to them in either English or Hindi, powered by Google's Text-to-Speech AI.

-   **📱 PWA & Offline-First**: Built as a Progressive Web App (PWA), Legalease AI provides a seamless, native-like experience on mobile devices. It offers offline access to previously analyzed summaries, ensuring users can review their documents anytime, anywhere.

---

## 🛠️ COMPLETE GOOGLE TECHNOLOGY STACK

This MVP is built on a comprehensive and scalable architecture powered entirely by Google Cloud, demonstrating a robust, production-ready foundation.

### Core AI & ML Services

-   **Vertex AI Platform**: Primary ML orchestration for managing and deploying our custom models.
-   **Gemini Pro/Ultra**: The engine for our document analysis, summarization, and natural language understanding.
-   **AutoML**: Used to train custom legal document classification models for identifying contract types.
-   **Model Garden**: Leveraged pre-trained models fine-tuned for legal context.
-   **Vertex AI Workbench**: Utilized Jupyter notebooks for exploratory data analysis and model prototyping.
-   **Document AI**: The backbone of our intelligent document processing pipeline.
    -   **Form Parser**: Extracts structured data from standardized legal forms.
    -   **Document OCR**: Handles text extraction from scanned PDF and image-based documents.
    -   **Custom Document Extractors**: Deployed specialized processors trained on Indian legal document specifics.
    -   **Layout Parser**: Understands the structure of documents to differentiate between headers, clauses, and footers.
-   **Natural Language AI**: Provides deep text understanding capabilities.
    -   **Entity Extraction**: Identifies key legal entities, dates, names, and clauses.
    -   **Sentiment Analysis**: Assesses the underlying tone and potential risk of clauses.
    -   **Syntax Analysis**: Parses complex legal language structures for better interpretation.

### Data & Analytics Stack

-   **BigQuery**: Our central data warehouse for legal analytics.
    -   Stores document metadata, analysis results, and user interaction data.
    -   Enables SQL-based querying to identify common risks and patterns across documents.
-   **Firestore**: Powers our real-time NoSQL database.
    -   Manages user profiles, authentication data, and document history.
-   **Cloud Storage**: Provides secure, scalable object storage.
    -   Securely stores all uploaded legal documents with multi-regional backups for compliance.

### Application Development

-   **Firebase Suite**: A complete platform for rapid app development and scaling.
    -   **Firebase Auth**: Manages secure user authentication via email, Google, and other providers.
    -   **Firebase Hosting**: Delivers our PWA globally with fast, secure CDN.
    -   **Firebase Analytics**: Tracks user behavior to improve features.
-   **Cloud Run**: Hosts our containerized backend microservices.
    -   Enables a pay-per-request model that is cost-effective and infinitely scalable.

### Integration & Workflow

-   **Cloud Functions**: Provides event-driven, serverless compute.
    -   Triggers our document processing pipeline upon file upload to Cloud Storage.
    -   Sends real-time user notifications.
-   **Cloud Pub/Sub**: Acts as our asynchronous messaging service.
    -   Decouples our services, allowing for a resilient, event-driven architecture.
-   **Cloud Workflows**: Orchestrates our complex, multi-step document analysis pipeline.
    -   Defines the flow from OCR and text extraction to Gemini analysis and risk assessment, including error handling and retries.

### Developer Tools & Productivity

-   **Cloud Build**: Our CI/CD platform for automated testing and deployment.
-   **Cloud Source Repositories**: Provides private Git hosting for our source code.
-   **Google Colab**: Used for rapid prototyping and experimentation with the Gemini API.

### Security & Compliance

-   **Cloud IAM**: Enforces fine-grained access control across all our cloud resources.
-   **Cloud Security Command Center**: Provides a centralized view of our security posture.
-   **Cloud KMS**: Manages encryption keys for data at rest, ensuring GDPR and HIPAA compliance.

### Monitoring & Operations

-   **Cloud Monitoring**: Offers full observability into application performance with custom metrics and alerting.
-   **Cloud Logging**: Centralizes logs for real-time analysis and debugging.
