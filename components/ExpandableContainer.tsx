import { ReactNode, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Animated, {
  SlideInDown,
  FlipInEasyY,
  SlideInLeft,
  SlideInRight,
} from "react-native-reanimated";
import { Text, View } from "./Themed";

interface ExpandableContainerProps {
  title?: string;
  children: ReactNode;
}

interface DescriptionProps {
  children: ReactNode;
}

const ExpandableContainer: React.FC<ExpandableContainerProps> & {
  Description: React.FC<DescriptionProps>;
} = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePress = () => {
    setIsOpen(!isOpen);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {isOpen && <Animated.View>{children}</Animated.View>}
      <View style={styles.header}>
        {title && (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}

        {!title && (
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
        )}

        <Feather name={isOpen ? "chevron-up" : "chevron-down"} size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
};

ExpandableContainer.Description = ({ children }: DescriptionProps) => (
  <Text>{children}</Text>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
    fontWeight: "normal",
  },
  description: {
    fontSize: 14,
    color: "gray",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
  separator: {
    height: 1,
    width: "90%",
  },
});

export default ExpandableContainer;
