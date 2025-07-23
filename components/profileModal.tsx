import React from "react";
import { StyleSheet, View } from "react-native";
import { Modal, Portal, Text, Button, useTheme } from "react-native-paper";
import { PixelSize } from "@/constants/size";

interface ProfileModalProps {
  visible: boolean;
  onDismiss: () => void;
  user: {
    name?: string | null;
    email?: string | null;
  } | null;
  onLogout: () => void;
}

const ProfileModal = ({
  visible,
  onDismiss,
  user,
  onLogout,
}: ProfileModalProps) => {
  const { colors } = useTheme();

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
          Profile
        </Text>
        <Text variant="titleMedium">{user?.email ?? "N/A"}</Text>
        <Button
          mode="contained"
          onPress={onLogout}
          style={{ marginTop: PixelSize.base }}
        >
          Logout
        </Button>
      </Modal>
    </Portal>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  modalContainer: {
    padding: PixelSize.lg,
    margin: PixelSize.base,
    borderRadius: PixelSize.xl,
    alignSelf: "center", // aligns to left
    width: "70%",
  },
});
