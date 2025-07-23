import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { useAuthContext } from "@/contexts/authContext";
import { Task } from "@/types/task";

export function useTasks() {
  const { user } = useAuthContext();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks in real-time
  useEffect(() => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid),
      orderBy("dueDate")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskList: Task[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        taskList.push({
          id: docSnap.id,
          title: data.title,
          description: data.description,
          dueDate: data.dueDate, // store and fetch as "YYYY-MM-DD"
          priority: data.priority,
          completed: data.completed,
        });
      });
      setTasks(taskList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Add Task
  const addTask = async (task: Omit<Task, "id">) => {
    if (!user) return;
    await addDoc(collection(db, "tasks"), {
      ...task,
      dueDate: task.dueDate, // keep as "YYYY-MM-DD"
      userId: user.uid,
    });
  };

  // Update Task
  const updateTask = async (id: string, updates: Partial<Task>) => {
    const ref = doc(db, "tasks", id);
    await updateDoc(ref, updates);
  };

  // Delete Task
  const deleteTask = async (id: string) => {
    const ref = doc(db, "tasks", id);
    await deleteDoc(ref);
  };

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
  };
}
