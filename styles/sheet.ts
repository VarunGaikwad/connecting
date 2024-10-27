import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#6A3DE8",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingImage: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },
  unauthContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  googleButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    marginTop: 20,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  userCells: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  tabBar: {
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: 60,
    elevation: 5,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  icon: {
    marginTop: 5,
  },
});
