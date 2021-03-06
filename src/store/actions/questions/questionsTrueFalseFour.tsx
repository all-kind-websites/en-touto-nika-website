import question, { Question } from "../../../models/question";
import shuffle from "../../../utils/shuffle";
import deleteQuestion from "../../../utils/deleteQuestion";
import cache from "../../../utils/cache";
import strings from "../../../constants/strings";

export const createQuestionForTrueFalseFour = (
  accepted: boolean,
  title: string,
  categoryIds: string,
  answer: string,
  source: string,
  right_choice: string,
  hint: string,
) => {
  return async () => {
    try {
      const { token, userId } = await cache.get(strings.userData);

      let questionsArray = [];
      // First fetch the first group and check if it's full, i.e. 100
      const res = await fetch(
        "https://en-touto-nika.firebaseio.com//questionsForTrueFalseFour.json"
      );
      const resD = await res.json();
      for (const key in resD) {
        questionsArray.push(resD[key]);
      }

      let UriForQuestions = "";
      // If first group is not full then upload there the question etc.
      if (questionsArray.length <= 99) {
        UriForQuestions = `https://en-touto-nika.firebaseio.com//questionsForTrueFalseFour.json?auth=${token}`;
      } else {
        questionsArray = [];
        const res = await fetch(
          "https://en-touto-nika.firebaseio.com///questionsForTrueFalseFour.100-199.json"
        );
        const resD = await res.json();
        for (const key in resD) {
          questionsArray.push(resD[key]);
        }
        if (99 < questionsArray.length || questionsArray.length <= 199) {
          UriForQuestions = `https://en-touto-nika.firebaseio.com//questionsForTrueFalseFour.100-199.json?auth=${token}`;
        }
      }

      const index = questionsArray.length;
      // testing
      // const response = await fetch(`https://en-touto-nika.firebaseio.com//questions.json`, {
      const postQuestionResponse = await fetch(UriForQuestions, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accepted,
          index: index,
          categoryIds,
          //testing
          // ownerId: 'eeR9esY0l8OxcxJPPA1Gp4T5Xsy1',
          ownerId: userId,
          title,
          answer,
          source,
          right_choice,
          hint,
        }),
      });
      if (!postQuestionResponse.ok) {
        throw new Error(
          "???????????????? ?? ???????????????????? ???????? ???????????????? ?????? ???????? ????????????! ?????????????????????? ?????????????? ???? ?????????????? ??????."
        );
      }
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const updateQuestionForTrueFalseFour = (
  accepted: boolean,
  title: string,
  categoryIds: string,
  answer: string,
  source: string,
  right_choice: string,
  hint: string,
  index: number
) => {
  return async () => {
    try {
      const { token, userId } = await cache.get(strings.userData);

      // Use index to find edited question in the according group.
      let URI_forPatching = ``;
      if (index <= 99) {
        URI_forPatching = `https://en-touto-nika.firebaseio.com//questionsForTrueFalseFour/${userId}.json?auth=${token}`;
      } else if (99 < index || index <= 199) {
        URI_forPatching = `https://en-touto-nika.firebaseio.com//questionsForTrueFalseFour.100-199/${userId}.json?auth=${token}`;
      }

      // testing
      // const response = await fetch(
      // `https://en-touto-nika.firebaseio.com//questions/eeR9esY0l8OxcxJPPA1Gp4T5Xsy1.json?`,
      // {
      const response = await fetch(URI_forPatching, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accepted: false,
          title,
          categoryIds,
          answer,
          source,
          right_choice,
          hint,
          index,
        }),
      });

      if (!response.ok) {
        throw new Error(
          "???????????????? ?? ???????????????? ?????? ?????????????????????? ?????? ?????????????????? ?????? ???????? ????????????! ?????????????????????? ?????????????? ???? ?????????????? ??????."
        );
      }
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const fetchQuestionsForTrueFalseFour =
  (maxIndex: number,
    trueFalse_useTimer: [boolean | 'created']
  ) => {
    return async (dispatch: Function) => {
      try {
        // Use maxIndex (of last answered question) to load questions from according group.
        let URI = "";
        if (maxIndex <= 99) {
          URI =
            "https://en-touto-nika.firebaseio.com//questionsForTrueFalseFour.json";
        } else if (99 < maxIndex || maxIndex <= 199) {
          URI =
            "https://en-touto-nika.firebaseio.com//questionsForTrueFalseFour.100-199.json";
        }
        const questionsResponse = await fetch(URI);

        // Check before unpack the response body
        if (!questionsResponse.ok) {
          throw new Error(
            "???????????????? ?? ?????????????? ?????? ?????????????????? ?????? ???????? ????????????! ?????????????????????? ?????????????? ???? ?????????????? ??????."
          );
        }
        const questResData = await questionsResponse.json();

        const loadedQuestions = [];
        for (const key in questResData) {
          loadedQuestions.push(
            new (question as any)({
              accepted: questResData[key].accepted,
              index: questResData[key].index, // for keeping the choice in cartScreen
              id: key,
              categoryIds: questResData[key].categoryIds,
              ownerId: questResData[key].ownerId,
              title: questResData[key].title,
              source: questResData[key].source,
              answer: questResData[key].answer,
              right_choice: questResData[key].right_choice,
              hint: questResData[key].hint,
            })
          );
        }
        let acceptedQuestions: Array<Question> = [];
        loadedQuestions.forEach((question) => {
          if (question.accepted) {
            acceptedQuestions.push(question);
          }
        });

        const localDatabaseTrueFalseFour = await cache.get(
          strings.localDatabaseTrueFalseFour
        );
        if (!localDatabaseTrueFalseFour) {
          await cache.set(
            strings.localDatabaseTrueFalseFour,
            acceptedQuestions
          );
        }

        await cache.set(
          strings.createdQuestionsTrueFalseFour,
          loadedQuestions
        );

        const shuffledQuestions = shuffle(acceptedQuestions);

        // if (trueFalse_useTimer && trueFalse_useTimer !== "created") {
        // For checking in ...QuestionDetails if alfaQuestions are fetched and saved in cache.
        await cache.set(strings.questionsTrueFalseFour, shuffledQuestions);
        // }
        if (!trueFalse_useTimer) {
          await cache.set(
            strings.questionsTrueFalseFourNoTimer,
            shuffledQuestions
          );
        }
        // if (trueFalse_useTimer === "created") {
        await cache.set(
          strings.createdQuestionsTrueFalseFour,
          loadedQuestions
        );
        // }
      } catch (err) {
        // send to custom analytics server
        throw err;
      }
    };
  };

export const fetchQuestionsForTrueFalseFourMixed = (maxIndex: number) => {
  return async () => {
    try {
      // Use maxIndex (of last answered question) to load questions from according group.
      let URI = "";
      if (maxIndex <= 99) {
        URI =
          "https://en-touto-nika.firebaseio.com//questionsForTrueFalseFour.json";
      } else if (99 < maxIndex || maxIndex <= 199) {
        URI =
          "https://en-touto-nika.firebaseio.com//questionsForTrueFalseFour.100-199.json";
      }
      const questionsResponse = await fetch(URI);

      // Check before unpack the response body
      if (!questionsResponse.ok) {
        throw new Error(
          "???????????????? ?? ?????????????? ?????? ?????????????????? ?????? ???????? ????????????! ?????????????????????? ?????????????? ???? ?????????????? ??????."
        );
      }
      const questResData = await questionsResponse.json();

      const loadedQuestions = [];
      for (const key in questResData) {
        loadedQuestions.push(
          new (question as any)({
            accepted: questResData[key].accepted,
            index: questResData[key].index, // for keeping the choice in cartScreen
            id: key,
            categoryIds: questResData[key].categoryIds,
            ownerId: questResData[key].ownerId,
            title: questResData[key].title,
            source: questResData[key].source,
            answer: questResData[key].answer,
            right_choice: questResData[key].right_choice,
            hint: questResData[key].hint,
          })
        );
      }

      let acceptedQuestions: Array<Question> = [];
      loadedQuestions.forEach((question) => {
        if (question.accepted) {
          acceptedQuestions.push(question);
        }
      });

      const shuffledQuestions = shuffle(acceptedQuestions);

      const alfaFourDataBaseMixed = await cache.get(
        strings.localDatabaseTrueFalseMixedFour
      );

      if (!alfaFourDataBaseMixed) {
        await cache.set(
          strings.localDatabaseTrueFalseMixedFour,
          shuffledQuestions
        );
      }
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteQuestionForTrueFalseFour = (
  createCategoryId: string,
  questionId: string,
  index: number
) => {
  return async () => {
    const { token } = await cache.get(strings.userData);
    const uri99 = `https://en-touto-nika.firebaseio.com//questionsForTrueFalseFour/${questionId}.json?auth=${token}`;
    const uri_199 = `https://en-touto-nika.firebaseio.com//questionsForTrueFalseFour.100-199/${questionId}.json?auth=${token}`;
    await deleteQuestion(createCategoryId, index, uri99, uri_199);
  };
};
