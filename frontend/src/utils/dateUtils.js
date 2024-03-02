export function convertDate(dateString) {
  if (!dateString) {
    return "";
  }

  const [year, month, day] = dateString.substring(0, 10).split("-");
  const date = new Date(year, month - 1, day);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}
