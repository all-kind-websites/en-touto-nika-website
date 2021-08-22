const deleteQuestion = async (
  createCategoryId: string,
  index: number,
  uri99: string,
  uri_199: string
) => {
  let UriForQuestions = "";
  if (index <= 99) {
    UriForQuestions = uri99;
  } else if (99 < index || index <= 199) {
    UriForQuestions = uri_199;
  }
  const response = await fetch(UriForQuestions, { method: "DELETE" });
  if (!response.ok) {
    throw new Error(
      `Δυστυχώς η διαγραφή της ερωτήσεως από το ${createCategoryId} δεν ήταν δυνατή! Παρακαλούμε ελέγξτε τη σύνδεσή σας.`
    );
  }
};

export default deleteQuestion
