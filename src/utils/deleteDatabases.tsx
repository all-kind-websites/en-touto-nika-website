import cache from "./cache";

const deleteDatabases = () => {
  const deleteDataBaseMulti = async (
    database: string,
    NumberQuestions: string,
    NumberQuestionsNoTimer: string,
    createdQuestions: string
  ) => {
    console.log("delete database MultipleChoice");
    await cache.remove(database);
    await cache.remove(NumberQuestions);
    await cache.remove(NumberQuestionsNoTimer);
    await cache.remove(createdQuestions);
  };

  const deleteDataBaseTrueFalse = async (
    database: string,
    NumberQuestions: string,
    NumberQuestionsNoTimer: string,
    createdQuestions: string
  ) => {
    console.log("delete database TrueFalse");
    await cache.remove(database);
    await cache.remove(NumberQuestions);
    await cache.remove(NumberQuestionsNoTimer);
    await cache.remove(createdQuestions);
  };
  return { deleteDataBaseMulti, deleteDataBaseTrueFalse };
};
export default deleteDatabases