import { StyleSheet, View } from "react-native";
import React from "react";
import { Card, Text, Checkbox, useTheme, Badge } from "react-native-paper";
import { PixelSize } from "@/constants/size";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO string
  priority: "low" | "medium" | "high";
  completed: boolean;
  onToggleComplete: (id: string) => void;
  onPress?: () => void; // Optional onPress handler for the card
  onLongPress?: () => void; // Optional onLongPress handler for the card
}

const TaskCard = (props: TaskCardProps) => {
    const { colors } = useTheme();
    const { id, title, dueDate, priority, completed, onToggleComplete, onPress, onLongPress } = props;
  const getPriorityColor = () => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      default:
        return "green";
    }
  };

return (
    <Card mode='elevated' style={styles.card} onPress={onPress} onLongPress={onLongPress}>
      <Card.Content style={styles.content}>
        <Checkbox
          status={completed ? "checked" : "unchecked"}
          onPress={() => onToggleComplete(id)}
        />
        <View style={{ flex: 1 }}>
          <Text variant="titleMedium" style={{ color: colors.onSurface }}>
            {title}
          </Text>
          <Text variant="bodySmall" style={{ color: colors.onSurface }}>
            {new Date(dueDate).toDateString()}
          </Text>
        </View>
        <Badge size={PixelSize.xxl} style={{ ...styles.badge, backgroundColor: getPriorityColor() }}>
          {priority}
        </Badge>
      </Card.Content>
    </Card>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  card: {
    marginBottom: PixelSize.base,
    width: "100%",
    borderRadius: PixelSize.xl,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: PixelSize.base,
  },
  badge: {
    marginLeft: PixelSize.sm,
    width: 4*PixelSize.base,
    paddingHorizontal: PixelSize.sm,
    borderRadius: PixelSize.xxxl,
  }
});
