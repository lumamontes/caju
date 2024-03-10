import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"

import { styles } from "./styles"
import Loading from "../Loading"

type Props = TouchableOpacityProps & {
  title: string,
  isLoading?: boolean
}

export function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.button]} {...rest} disabled={isLoading}>
      {isLoading ? (
        <Loading />
      ) : (
        <Text style={[styles.text]}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}
