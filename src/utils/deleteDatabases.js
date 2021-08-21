import cache from "./cache";
import * as filtersActions from "../store/actions/filters";

export default deleteDatabases = () => {
  const deleteDataBaseMulti = async (
    database,
    NumberQuestions,
    NumberQuestionsNoTimer,
    createdQuestions
  ) => {
    console.log("delete database MultipleChoice");
    await cache.remove(database);
    await cache.remove(NumberQuestions);
    await cache.remove(NumberQuestionsNoTimer);
    await cache.remove(createdQuestions);
  };

  const deleteDataBaseTrueFalse = async (
    database,
    NumberQuestions,
    NumberQuestionsNoTimer,
    createdQuestions
  ) => {
    console.log("delete database TrueFalse");
    await cache.remove(database);
    await cache.remove(NumberQuestions);
    await cache.remove(NumberQuestionsNoTimer);
    await cache.remove(createdQuestions);
  };
  return { deleteDataBaseMulti, deleteDataBaseTrueFalse };
};
