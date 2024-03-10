export default function handleHideMonetaryValue(value: string) {
  return value.replace(/,/g, "").replace(/\./g, "").replace(/\d/g, "*");
}
