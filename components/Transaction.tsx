import { TransactionProp } from "@/database/types";
import { Text, View } from "./Themed";

export default function Transaction(item: TransactionProp){
    return (
        <View>
            <Text>
                Transaction
            </Text>
        </View>
    )
}