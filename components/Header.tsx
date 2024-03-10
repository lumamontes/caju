import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { showMonetaryValueAtom } from "@/Atoms";

type Props = {
  title?: string;
  subtitle?: string;
};

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function Icon(props: {
  name: React.ComponentProps<typeof Feather>["name"];
  color: string;
  size?: number;
}) {
  return <Feather size={props.size ?? 28} {...props} />;
}

export function Header({ title, subtitle }: Props) {
  const [showMonetaryValue, setShowMonetaryValue] = useAtom(
    showMonetaryValueAtom
  );

  function handlePressOpen() {
    setShowMonetaryValue(!showMonetaryValue);
  }

  return (
    <View style={s.container}>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <TouchableOpacity style={s.avatar}>
          <Icon name="user" color="#2f95dc" />
        </TouchableOpacity>
        <Text style={s.title}>
          Oi, <Text style={s.subtitle}>Luma</Text>
        </Text>
      </View>
      <TouchableOpacity style={s.showMonetaryValuesButton} onPress={handlePressOpen}>
        {showMonetaryValue ? (
          <Icon name="eye" color="black" size={24} />
        ) : (
          <Icon name="eye-off" color="black" size={24} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    marginTop: 14,
    marginBottom: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    marginLeft: 16,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: "bold",
  },
  avatar: {
    padding: 10,
    backgroundColor: "#EEEEEE",
    borderRadius: 50,
  },
  showMonetaryValuesButton: {
    padding: 10,
    borderRadius: 50,
  },
});
