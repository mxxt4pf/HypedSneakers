export function fetchCookies(key: string) {
  const x = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");

  return x ? x.pop() : "";
}

export function rateIndent(amount: number) {
  return "$" + amount.toFixed(3);
}
