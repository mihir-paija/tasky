// Define your Task type
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // store as ISO date string
  priority: "low" | "medium" | "high";
  completed: boolean;
}
