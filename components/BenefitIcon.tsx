import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface BenefitIconProps {
  benefit: {
    icon: React.ComponentProps<typeof Feather>["name"];
    bgColor: string;
  };
}

const BenefitIcon: React.FC<BenefitIconProps> = ({ benefit }) => {
  return (
    <View
      style={{
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: benefit.bgColor,
        borderRadius: 9999,
        marginRight: 20,
      }}
    >
      <Feather name={benefit.icon} size={24} />
    </View>
  );
};

export default BenefitIcon;