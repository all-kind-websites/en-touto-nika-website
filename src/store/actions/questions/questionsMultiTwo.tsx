
import question, { Question } from "../../../models/question";
import shuffle from "../../../utils/shuffle";
import deleteQuestion from "../../../utils/deleteQuestion";
import strings from "../../../constants/strings";
import cache from "../../../utils/cache";

export const createQuestionForMultiTwo = (
  accepted: boolean,
  title: string,
  categoryIds: string,
  answer: string,
  source: string,
  choice_Alpha: string,
  choice_Beta: string,
  choice_Gamma: string,
  choice_Delta: string,
  right_choice: string,
  hint: string,
) => {
  return async () => {
    try {
      const { token, userId } = await cache.get(strings.userData);

      let questionsArray = [];
      // First fetch the first group and check if it's full, i.e. 100
      const res = await fetch(
        "https://en-touto-nika.firebaseio.com//questionsForMultiTwo.json"
      );
      const resD = await res.json();
      for (const key in resD) {
        questionsArray.push(resD[key]);
      }

      let UriForQuestions = "";
      // If first group is not full then upload there the question etc.
      if (questionsArray.length <= 99) {
        UriForQuestions = `https://en-touto-nika.firebaseio.com//questionsForMultiTwo.json?auth=${token}`;
      } else {
        questionsArray = [];
        const res = await fetch(
          "https://en-touto-nika.firebaseio.com///questionsForMultiTwo.100-199.json"
        );
        const resD = await res.json();
        for (const key in resD) {
          questionsArray.push(resD[key]);
        }
        if (99 < questionsArray.length || questionsArray.length <= 199) {
          UriForQuestions = `https://en-touto-nika.firebaseio.com//questionsForMultiTwo.100-199.json?auth=${token}`;
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
          choice_Alpha,
          choice_Beta,
          choice_Gamma,
          choice_Delta,
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

export const updateQuestionForMultiTwo = (
  accepted: boolean,
  title: string,
  categoryIds: string,
  answer: string,
  source: string,
  choice_Alpha: string,
  choice_Beta: string,
  choice_Gamma: string,
  choice_Delta: string,
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
        URI_forPatching = `https://en-touto-nika.firebaseio.com//questionsForMultiTwo/${userId}.json?auth=${token}`;
      } else if (99 < index || index <= 199) {
        URI_forPatching = `https://en-touto-nika.firebaseio.com//questionsForMultiTwo.100-199/${userId}.json?auth=${token}`;
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
          choice_Alpha,
          choice_Beta,
          choice_Gamma,
          choice_Delta,
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

export const fetchQuestionsForMultiTwo = (maxIndex: number) => {
  return async () => {
    try {
      // Use maxIndex (of last answered question) to load questions from according group.
      let URI = "";
      if (maxIndex <= 99) {
        URI = "https://en-touto-nika.firebaseio.com//questionsForMultiTwo.json";
      } else if (99 < maxIndex || maxIndex <= 199) {
        URI =
          "https://en-touto-nika.firebaseio.com//questionsForMultiTwo.100-199.json";
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
            accepted: questResData[key].accepted, // for keeping the choice in cartScreen
            index: questResData[key].index, // for keeping the choice in cartScreen
            id: key,
            categoryIds: questResData[key].categoryIds,
            ownerId: questResData[key].ownerId,
            title: questResData[key].title,
            source: questResData[key].source,
            answer: questResData[key].answer,
            choice_Alpha: questResData[key].choice_Alpha,
            choice_Beta: questResData[key].choice_Beta,
            choice_Gamma: questResData[key].choice_Gamma,
            choice_Delta: questResData[key].choice_Delta,
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

      const localDataBaseMultiTwo = await localStorage.getItem(
        strings.localDataBaseMultiTwo
      );

      if (!localDataBaseMultiTwo) {
        await localStorage.setItem(
          strings.localDataBaseMultiTwo,
          JSON.stringify(acceptedQuestions)
        );
      }

      // set here if user is ther creator of the question
      await localStorage.setItem(
        strings.createdQuestionsMultiTwo,
        JSON.stringify(loadedQuestions)
      );

      const shuffledQuestions = shuffle(acceptedQuestions);

      await localStorage.setItem(
        strings.questionsMultiTwo,
        JSON.stringify(shuffledQuestions)
      );
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const fetchQuestionsForMultiTwoNoTimer = (maxIndex: number) => {
  return async () => {
    try {
      // Use maxIndex (of last answered question) to load questions from according group.
      let URI = "";
      if (maxIndex <= 99) {
        URI = "https://en-touto-nika.firebaseio.com//questionsForMultiTwo.json";
      } else if (99 < maxIndex || maxIndex <= 199) {
        URI =
          "https://en-touto-nika.firebaseio.com//questionsForMultiTwo.100-199.json";
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
            accepted: questResData[key].accepted, // for keeping the choice in cartScreen
            index: questResData[key].index, // for keeping the choice in cartScreen
            id: key,
            categoryIds: questResData[key].categoryIds,
            ownerId: questResData[key].ownerId,
            title: questResData[key].title,
            source: questResData[key].source,
            answer: questResData[key].answer,
            choice_Alpha: questResData[key].choice_Alpha,
            choice_Beta: questResData[key].choice_Beta,
            choice_Gamma: questResData[key].choice_Gamma,
            choice_Delta: questResData[key].choice_Delta,
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

      const localDataBaseMultiTwo = await localStorage.getItem(
        strings.localDataBaseMultiTwo
      );

      if (!localDataBaseMultiTwo) {
        await localStorage.setItem(
          strings.localDataBaseMultiTwo,
          JSON.stringify(acceptedQuestions)
        );
      }

      // set here if user is ther creator of the question
      await localStorage.setItem(
        strings.createdQuestionsMultiTwo,
        JSON.stringify(loadedQuestions)
      );

      const shuffledQuestions = shuffle(acceptedQuestions);

      await localStorage.setItem(
        strings.questionsMultiTwoNoTimer,
        JSON.stringify(shuffledQuestions)
      );
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const fetchQuestionsForMixedTwo = (maxIndex: number) => {
  return async () => {
    try {
      // Use maxIndex (of last answered question) to load questions from according group.
      let URI = "";
      if (maxIndex <= 99) {
        URI = "https://en-touto-nika.firebaseio.com//questionsForMultiTwo.json";
      } else if (99 < maxIndex || maxIndex <= 199) {
        URI =
          "https://en-touto-nika.firebaseio.com//questionsForMultiTwo.100-199.json";
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
            accepted: questResData[key].accepted, // for keeping the choice in cartScreen
            index: questResData[key].index, // for keeping the choice in cartScreen
            id: key,
            categoryIds: questResData[key].categoryIds,
            ownerId: questResData[key].ownerId,
            title: questResData[key].title,
            source: questResData[key].source,
            answer: questResData[key].answer,
            choice_Alpha: questResData[key].choice_Alpha,
            choice_Beta: questResData[key].choice_Beta,
            choice_Gamma: questResData[key].choice_Gamma,
            choice_Delta: questResData[key].choice_Delta,
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

      const alfaTwoDataBaseMixed = await localStorage.getItem(
        strings.localDataBaseMultiMixedTwo
      );
      if (!alfaTwoDataBaseMixed) {
        await localStorage.setItem(
          strings.localDataBaseMultiMixedTwo,
          JSON.stringify(acceptedQuestions)
        );
      }
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteQuestionForMultiTwo = (
  createCategoryId: string,
  questionId: string,
  index: number
) => {
  return async () => {
    const { token } = await cache.get(strings.userData);
    const uri99 = `https://en-touto-nika.firebaseio.com//questionsForMultiTwo/${questionId}.json?auth=${token}`;
    const uri_199 = `https://en-touto-nika.firebaseio.com//questionsForMultiTwo.100-199/${questionId}.json?auth=${token}`;
    await deleteQuestion(createCategoryId, index, uri99, uri_199);
  };
};
