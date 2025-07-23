import { FlatList, SectionList, StyleSheet, View } from "react-native";
import { globalStyles } from "@/styles/globalStyles";
import {
  FAB,
  useTheme,
  Text,
  Searchbar,
  IconButton,
  SegmentedButtons,
  ActivityIndicator,
} from "react-native-paper";
import { useState } from "react";
import TaskCard from "@/components/taskCard";
import { PixelSize } from "@/constants/size";
import {
  isToday,
  isTomorrow,
  isWithinInterval,
  addDays,
  parseISO,
} from "date-fns";
import TaskModal, { TaskData } from "@/components/taskModal";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTasks } from "@/hooks/useTask";
import ProfileModal from "@/components/profileModal";
import { useAuthContext } from "@/contexts/authContext";
import { router } from "expo-router";

const Home = () => {
  const { colors } = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "delete">("add");
  const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<
    "all" | "low" | "medium" | "high"
  >("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "completed" | "incomplete"
  >("all");

  const [profileVisible, setProfileVisible] = useState(false);
  const { tasks, loading, addTask, updateTask, deleteTask } = useTasks();
  const { user, handleLogout } = useAuthContext();

  const toggleComplete = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    updateTask(id, { completed: !task.completed });
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && task.completed) ||
      (statusFilter === "incomplete" && !task.completed);
    const matchesSearch =
      searchQuery.trim() === "" ||
      task.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.trim().toLowerCase());

    return matchesPriority && matchesStatus && matchesSearch;
  });

  const groupedTasks = [
    {
      title: "Today",
      data: filteredTasks.filter((task) => isToday(new Date(task.dueDate))),
    },
    {
      title: "Tomorrow",
      data: filteredTasks.filter((task) => isTomorrow(new Date(task.dueDate))),
    },
    {
      title: "Next 7 Days",
      data: filteredTasks.filter((task) =>
        isWithinInterval(new Date(task.dueDate), {
          start: addDays(new Date(), 2),
          end: addDays(new Date(), 7),
        })
      ),
    },
  ].filter((section) => section.data.length > 0);

  const onFAB = () => {
    setModalMode("add");
    setSelectedTask(null);
    setSelectedTaskId(null);
    setModalVisible(true);
  };

  return (
    <SafeAreaView
      style={{
        ...globalStyles.pageContainer,
        backgroundColor: colors.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // backgroundColor: "#e8e8e8",
        }}
      >
        <IconButton
          icon="account-circle"
          size={PixelSize.base * 3}
          style={
            {
              // backgroundColor: colors.primary,
            }
          }
          onPress={() => setProfileVisible(true)}
        />
        <View
          style={{
            flex: 1,
          }}
        >
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
      </View>
      <View style={{ padding: PixelSize.sm }}>
        <Text variant="titleSmall">Filter by Priority:</Text>
        <SegmentedButtons
          value={priorityFilter}
          onValueChange={(val) => setPriorityFilter(val as any)}
          buttons={[
            { label: "All", value: "all" },
            { label: "Low", value: "low" },
            { label: "Medium", value: "medium" },
            { label: "High", value: "high" },
          ]}
          style={{ marginBottom: PixelSize.base }}
        />

        <Text variant="titleSmall">Filter by Status:</Text>
        <SegmentedButtons
          value={statusFilter}
          onValueChange={(val) => setStatusFilter(val as any)}
          buttons={[
            { label: "All", value: "all" },
            { label: "Completed", value: "completed" },
            { label: "Incomplete", value: "incomplete" },
          ]}
        />
      </View>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <SectionList
          sections={groupedTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard
              id={item.id}
              title={item.title}
              description={item.description}
              dueDate={item.dueDate}
              priority={item.priority}
              completed={item.completed}
              onToggleComplete={toggleComplete}
              onLongPress={() => {
                setModalMode("delete");
                setSelectedTaskId(item.id);
                setSelectedTask({
                  title: item.title,
                  priority: item.priority,
                  dueDate: new Date(item.dueDate),
                });
                setModalVisible(true);
              }}
              onPress={() => {
                setModalMode("edit");
                setSelectedTaskId(item.id);
                setSelectedTask({
                  title: item.title,
                  priority: item.priority,
                  dueDate: new Date(item.dueDate),
                });
                setModalVisible(true);
              }}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text
              variant="titleMedium"
              style={{
                marginVertical: PixelSize.sm,
                color: colors.onBackground,
                fontWeight: "bold",
              }}
            >
              {title}
            </Text>
          )}
          contentContainerStyle={{ padding: PixelSize.sm }}
        />
      )}
      <TaskModal
        visible={modalVisible}
        mode={modalMode}
        initialTaskData={selectedTask ?? undefined}
        onDismiss={() => setModalVisible(false)}
        onSubmit={(task) => {
          if (modalMode === "add") {
            addTask({
              title: task.title,
              priority: task.priority,
              dueDate: task.dueDate.toISOString().split("T")[0],
              description: "",
              completed: false,
            });
          }
          if (modalMode === "edit" && selectedTaskId) {
            updateTask(selectedTaskId, {
              title: task.title,
              priority: task.priority,
              dueDate: task.dueDate.toISOString().split("T")[0],
            });
          }
          setModalVisible(false);
        }}
        onDelete={() => {
          if (selectedTaskId) {
            deleteTask(selectedTaskId);
          }
          setModalVisible(false);
        }}
      />
      <ProfileModal
        visible={profileVisible}
        onDismiss={() => setProfileVisible(false)}
        user={{
          name: user?.displayName ?? user?.email ?? "N/A",
          email: user?.email ?? "N/A",
        }}
        onLogout={async () => {
          await handleLogout();
          router.push("/login");
          setProfileVisible(false);
        }}
      />

      <FAB icon="plus" style={styles.fab} onPress={onFAB} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: PixelSize.xl,
    right: PixelSize.xl,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
