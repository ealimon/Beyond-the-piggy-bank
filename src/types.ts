export interface StoryPage {
  pageNumber: number;
  title?: string;
  text: string;
  imagePromptDescription?: string;
  themeColor: string;
  sceneTitle: string;
  keyConcepts: {
    term: string;
    definition: string;
    storybookQuote: string;
  }[];
  interactiveCheck?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export type QuestionType = 'multiple-choice' | 'number-input' | 'text-input' | 'sorting' | 'statement-calc';

export interface WorksheetQuestion {
  id: string;
  questionNumber: number;
  title: string;
  prompt: string;
  type: QuestionType;
  conceptTag: string;
  mathExpression?: string;
  options?: string[];
  correctOptionIndex?: number;
  correctNumber?: number;
  tolerance?: number;
  correctTextKeywords?: string[];
  sortingItems?: {
    id: string;
    text: string;
    correctBucket: 'piggy' | 'bank';
  }[];
  statementRows?: {
    date: string;
    description: string;
    amount: string;
    type: 'deposit' | 'interest' | 'withdrawal';
    isMystery?: boolean;
    mysteryAnswer?: number;
  }[];
  hint: string;
  explanation: string;
}

export interface Worksheet {
  id: string;
  title: string;
  subtitle: string;
  gradeLevel: string;
  estimatedTime: string;
  relatedPages: number[];
  icon: string;
  conceptSummary: string;
  storybookConnection: string;
  questions: WorksheetQuestion[];
}

export interface UserWorksheetProgress {
  worksheetId: string;
  completed: boolean;
  score: number;
  totalQuestions: number;
  answers: Record<string, any>;
  lastAttemptedAt: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface SavingsSimParams {
  goalTitle: string;
  goalCost: number;
  initialDeposit: number;
  monthlyContribution: number;
  hysaApy: number; // e.g. 5.0%
  inflationRate: number; // e.g. 3.5%
  years: number;
}
