export interface Assignment {
  id: number;
  courseName: string;
  moduleName: string;
  description: string;
  issueDate: string;
  deadlineDate: string;
  isSubmitted: boolean;
}

export const assignments: Assignment[] = [
  {
    id: 1,
    courseName: "React & TypeScript",
    moduleName: "Модуль 3: Хуки",
    description: "Створити віджет із використанням useRef.",
    issueDate: "15.10.2026",
    deadlineDate: "22.10.2026",
    isSubmitted: true,
  },
  {
    id: 2,
    courseName: "Web Development",
    moduleName: "Модуль 1: CSS",
    description: "Верстка картки товару на Flexbox.",
    issueDate: "18.10.2026",
    deadlineDate: "25.10.2026",
    isSubmitted: false,
  },
];
