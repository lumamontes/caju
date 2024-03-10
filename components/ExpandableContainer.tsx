import { ReactNode, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Animated from "react-native-reanimated";
import { Text, View } from "./Themed";
import FlexibleValue from "./FlexibeValue";
import NextBenefit from "./NextBenefit";
import { formatCurrency } from "@/utils/formatCurrency";
import handleHideMonetaryValue from "@/utils/handleHideMonetaryValue";
import { showMonetaryValueAtom } from "@/Atoms";
import { useAtom } from "jotai";
import { benefitsDatabase } from "@/database/benefits";

interface ExpandableContainerProps {
  title?: string;
  children?: ReactNode;
  onHandleModal: () => void;
}

interface DescriptionProps {
  children: ReactNode;
}

const ExpandableContainer: React.FC<ExpandableContainerProps> & {
  Description: React.FC<DescriptionProps>;
} = ({ title, children, onHandleModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMonetaryValue] = useAtom(showMonetaryValueAtom);
  const [totalBenefitsBalance, setTotalBenefitsBalance] = useState(0);

  const handlePress = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const init = async () => {
      benefitsDatabase.totalBenefitsBalance(setTotalBenefitsBalance);
    };
    init();
  }, []);
  return (
    <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
      <View style={styles.text_container}>
        <Text style={styles.bold}>Total em benefícios</Text>
        <Text style={styles.bold}>
          R$
          {showMonetaryValue
            ? formatCurrency(totalBenefitsBalance)
            : handleHideMonetaryValue(formatCurrency(totalBenefitsBalance))}
        </Text>
      </View>
      <TouchableOpacity style={styles.contentContainer} onPress={handlePress}>
        {isOpen && (
          <Animated.View>
            <FlexibleValue handleModal={() => onHandleModal()} />
            <NextBenefit />
          </Animated.View>
        )}
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

          <Feather
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={24}
            color="black"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

ExpandableContainer.Description = ({ children }: DescriptionProps) => (
  <Text>{children}</Text>
);

const styles = StyleSheet.create({
  contentContainer: {
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
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  bold: {
    fontWeight: "bold",
  },
  text_container: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 40,
    paddingBottom: 10,
  },
});

export default ExpandableContainer;
