import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Modal,
  Portal,
  Text,
  Button,
  useTheme,
  TextInput,
  SegmentedButtons,
} from "react-native-paper";
import { PixelSize } from "@/constants/size";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addDays } from "date-fns";
import { Task } from "@/types/task";

export interface TaskData {
  title: string;
  priority: "low" | "medium" | "high";
  dueDate: Date; // as Date for picker
}

interface TaskModalProps {
  visible: boolean;
  onDismiss: () => void;
  mode: "add" | "edit" | "delete";
  initialTaskData?: TaskData;
  onSubmit: (task: TaskData) => void;
  onDelete?: () => void;
  loading?: boolean;
}

const TaskModal = ({
  visible,
  onDismiss,
  mode,
  initialTaskData,
  onSubmit,
  onDelete,
  loading = false,
}: TaskModalProps) => {
  const { colors } = useTheme();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [dueDate, setDueDate] = useState<Date>(addDays(new Date(), 1));
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initialTaskData) {
      setTitle(initialTaskData.title);
      setPriority(initialTaskData.priority);
      setDueDate(initialTaskData.dueDate);
    }
    if (mode === "add") {
      setTitle("");
      setPriority("low");
      setDueDate(addDays(new Date(), 1));
    }
  }, [visible, mode, initialTaskData]);

  const isDeleteMode = mode === "delete";

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.modalContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <Text variant="titleLarge" style={{ marginBottom: PixelSize.base }}>
          {mode === "add"
            ? "Add Task"
            : mode === "edit"
            ? "Edit Task"
            : "Delete Task"}
        </Text>

        {!isDeleteMode ? (
          <View style={{ gap: PixelSize.base }}>
            <TextInput
              label="Task Title"
              value={title}
              onChangeText={setTitle}
              mode="outlined"
            />
            <SegmentedButtons
              value={priority}
              onValueChange={(val) =>
                setPriority(val as "low" | "medium" | "high")
              }
              buttons={[
                { label: "Low", value: "low" },
                { label: "Medium", value: "medium" },
                { label: "High", value: "high" },
              ]}
            />
            <Button mode="outlined" onPress={() => setShowDatePicker(true)}>
              Due Date: {dueDate.toDateString()}
            </Button>
            {showDatePicker && (
              <DateTimePicker
                value={dueDate}
                mode="date"
                display="default"
                onChange={(_, date) => {
                  setShowDatePicker(false);
                  if (date) setDueDate(date);
                }}
              />
            )}
          </View>
        ) : (
          <Text variant="bodyMedium">
            Are you sure you want to delete this task?
          </Text>
        )}

        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={onDismiss}
            style={{ flex: 1, marginRight: PixelSize.xs }}
          >
            Cancel
          </Button>
          <Button
            mode={isDeleteMode ? "contained" : "contained"}
            onPress={() => {
              if (isDeleteMode) {
                onDelete?.();
              } else {
                onSubmit({
                  title,
                  priority,
                  dueDate, // pass as Date for consistent downstream processing
                });
              }
            }}
            loading={loading}
            disabled={loading}
            style={{ flex: 1, marginLeft: PixelSize.xs }}
          >
            {isDeleteMode ? "Delete" : mode === "add" ? "Add" : "Save"}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default TaskModal;

const styles = StyleSheet.create({
  modalContainer: {
    padding: PixelSize.lg,
    margin: PixelSize.base,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: PixelSize.base,
  },
});
