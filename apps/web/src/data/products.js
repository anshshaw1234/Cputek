import { BookOpen, Globe2, ShieldCheck } from 'lucide-react';

export const productsData = [
  {
    id: 'ai-learning-management-system',
    title: 'AI-Powered Learning Management System',
    icon: BookOpen,
    description:
      'Turn company manuals, handbooks, presentations, and videos into personalized, conversational workplace training.',
    overview:
      'The AI-Powered Learning Management System connects to approved company documents and helps employees find reliable answers, practice role-specific skills, and build knowledge over time. Instead of relying on one-time courses and tests, teams can ask questions in plain language and receive guidance grounded in company materials.',
    features: [
      {
        title: 'Answers grounded in company documents',
        description:
          'Connect standard operating procedures, employee handbooks, and training presentations so employees can ask questions and find relevant guidance without searching through multiple files.',
      },
      {
        title: 'Personalized, role-based learning',
        description:
          'Create training paths and practical work scenarios for different roles, adapt learning to employee skill levels, and identify knowledge gaps across teams.',
      },
      {
        title: 'Interactive learning from existing content',
        description:
          'Transform manuals and slide presentations into summaries, short lessons, and practice quizzes. Convert recorded instructional videos into written summaries for quick reference.',
      },
      {
        title: 'Progress tracking and multilingual support',
        description:
          'Track learning progress and completion rates, review team results, and provide technical instructions in multiple languages for international teams.',
      },
      {
        title: 'Image-based technical questions',
        description:
          'Let employees submit images with their questions to get help understanding technical topics, including complex industrial machinery.',
      },
    ],
    benefits: [
      'Help employees find approved answers without searching through multiple manuals.',
      'Build training from existing company documents instead of starting from scratch.',
      'Identify capability gaps and target practice to the areas employees need most.',
      'Reinforce procedures with short, repeatable quizzes and learning activities.',
      'Make training content accessible to international and multilingual teams.',
    ],
    useCases: [
      'Answering questions about company policies and standard operating procedures.',
      'Creating role-based onboarding journeys for new hires.',
      'Practicing customer conversations and other job-specific scenarios.',
      'Turning slide decks and manuals into microlearning and quizzes.',
      'Summarizing instructional videos for quick reference before a shift.',
    ],
  },
  {
    id: 'ai-knowledge-layer-for-websites',
    title: 'AI Knowledge Layer for Websites',
    icon: Globe2,
    description:
      'Make websites and portals conversational, helping visitors find answers, follow instructions, and choose the right products.',
    overview:
      'The AI Knowledge Layer connects to website content, product catalogs, manuals, policies, and FAQs. Visitors can ask questions in everyday language and receive direct answers with links to relevant pages, step-by-step guidance, screenshots, or video walkthroughs.',
    features: [
      {
        title: 'Conversational answers with source links',
        description:
          'Index product pages, manuals, and documents so visitors can ask questions and get direct answers with links to the relevant website content.',
      },
      {
        title: 'Step-by-step website guidance',
        description:
          'Explain complex tasks with clear instructions, screenshots, and video walkthroughs, while asking follow-up questions to understand what a visitor needs.',
      },
      {
        title: 'Product recommendations',
        description:
          'Compare available products against a visitor’s requirements, such as daily equipment capacity, and explain which model is a suitable match.',
      },
      {
        title: 'Scenario-based product education',
        description:
          'Use short scenario quizzes to help visitors understand technical products and compare details such as warranty terms in plain language.',
      },
      {
        title: 'Visitor insights',
        description:
          'Record frequent customer questions to help teams find confusing product information and improve website content.',
      },
    ],
    benefits: [
      'Help visitors find useful answers without navigating long menus or documents.',
      'Guide customers through complex tasks with relevant instructions and media.',
      'Help buyers compare options and move toward the right product or form.',
      'Reduce repetitive basic inquiries to customer support and administrative teams.',
      'Use visitor questions to make product pages and explanations clearer.',
    ],
    useCases: [
      'Guiding customers through software workflows such as creating an invoice.',
      'Answering patient questions about preparation instructions on healthcare portals.',
      'Helping students find admissions requirements and application forms.',
      'Recommending equipment based on operational requirements.',
      'Explaining product specifications, warranty terms, and consulting services.',
    ],
  },
  {
    id: 'ai-compliance-intelligence-platform',
    title: 'AI Compliance Intelligence Platform',
    icon: ShieldCheck,
    description:
      'Map regulations to business operations, manage compliance tasks and evidence, and help teams understand emerging risks.',
    overview:
      'The AI Compliance Intelligence Platform connects public regulations with company policies, licenses, and operational information. It identifies requirements relevant to a business, organizes deadlines and owners, highlights evidence gaps, and helps teams prepare for audits and regulatory changes.',
    features: [
      {
        title: 'Business-specific compliance requirements',
        description:
          'Use industry, business activities, employee numbers, and office locations to build a tailored set of applicable requirements instead of a generic checklist.',
      },
      {
        title: 'Compliance calendar and task ownership',
        description:
          'Schedule tax returns, environmental inspections, permits, and labor filings. Assign responsible owners and distinguish completed, upcoming, and overdue tasks.',
      },
      {
        title: 'Regulatory change monitoring',
        description:
          'Monitor updates to regulations and licensing requirements, identify affected departments, and notify teams of actions that may be needed.',
      },
      {
        title: 'Audit evidence and policy checks',
        description:
          'Compare company policies and inspection reports with current requirements, identify missing evidence, and keep approved records in a digital evidence vault.',
      },
      {
        title: 'Risk scoring and targeted training',
        description:
          'Calculate task risk using factors such as overdue days, missing documents, submission history, and potential penalties. Turn identified compliance gaps into employee training.',
      },
    ],
    benefits: [
      'Focus compliance work on requirements relevant to each business and location.',
      'Give teams visibility into owners, deadlines, and overdue obligations.',
      'Identify missing documentation and policy gaps before an audit.',
      'Prioritize tasks using clear risk indicators and supporting evidence.',
      'Connect regulatory changes to affected teams and targeted training.',
    ],
    useCases: [
      'Managing regulatory calendars across offices and business locations.',
      'Preparing licenses, inspection reports, and policies for external audits.',
      'Identifying departments affected by a new government regulation.',
      'Prioritizing overdue filings and tasks with missing evidence.',
      'Creating learning materials to address compliance knowledge gaps.',
    ],
  },
];
