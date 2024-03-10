// export function formatCurrency(value: number) {
//     return value.toLocaleString("pt-BR", {
//       style: "currency",
//       currency: "BRL",
//     })
//   }


  export const formatCurrency = (value: number) => {
    return (value / 100).toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  };