async function convert() {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;

  const result = document.getElementById("result");
  const error = document.getElementById("error");
  const loading = document.getElementById("loading");

  result.innerText = "";
  error.innerText = "";

  if (amount <= 0) {
    error.innerText = "Please enter a valid amount";
    return;
  }

  loading.style.display = "block";

  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${from}`
    );

    if (!response.ok) throw new Error("API error");

    const data = await response.json();
    const rate = data.rates[to];

    const converted = (amount * rate).toFixed(2);
    result.innerText = `${amount} ${from} = ${converted} ${to}`;
  } catch {
    error.innerText = "Failed to fetch exchange rates";
  } finally {
    loading.style.display = "none";
  }
}
