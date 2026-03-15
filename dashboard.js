// SALES CHART
const salesChart = new Chart(
document.getElementById("salesChart"),
{
type: "bar",
data: {
labels: ["Jan","Feb","Mar","Apr","May"],
datasets: [{
label: "Sales ₹",
data: [2000,3500,2800,4200,5000]
}]
}
}
);


// ORDERS CHART
const orderChart = new Chart(
document.getElementById("orderChart"),
{
type: "line",
data: {
labels: ["Mon","Tue","Wed","Thu","Fri"],
datasets: [{
label: "Orders",
data: [2,3,5,4,6]
}]
}
}
);
