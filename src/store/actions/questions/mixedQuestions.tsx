import cache from "../../../utils/cache";
import question from "../../../models/question";
import shuffle from "../../../utils/shuffle";
import strings from "../../../constants/strings";

export const fetchQuestionsMultiMixed = () => {
  return async () => {
    try {
      const mixedQuestions = [];
      const localDataBaseMultiMixedOne = await cache.get(
        strings.localDataBaseMultiMixedOne
      );
      const check_one = await cache.get("check_one");

      const localDataBaseMultiMixedTwo = await cache.get(
        strings.localDataBaseMultiMixedTwo
      );
      const check_two = await cache.get("check_two");

      const localDataBaseMultiMixedThree = await cache.get(
        strings.localDataBaseMultiMixedThree
      );
      const check_three = await cache.get("check_three");

      const localDataBaseMultiMixedFour = await cache.get(
        strings.localDataBaseMultiMixedFour
      );
      const check_four = await cache.get("check_four");

      // console.log('in mixedQuestions for alfaOne', alfaOneQuestionsMixedAreON, check_one);

      ///////////////////////
      if (!!localDataBaseMultiMixedOne && check_one) {
        const questions = await cache.get(
          strings.localDataBaseMultiMixedOne
        );

        for (const key in questions) {
          mixedQuestions.push(
            new (question as any)({
              accepted: questions[key].accepted,
              index: questions[key].index, // for keeping the choice in cartScreen
              id: key,
              categoryIds: questions[key].categoryIds,
              ownerId: questions[key].ownerId,
              title: questions[key].title,
              answer: questions[key].answer,
              source: questions[key].source,
              choice_Alpha: questions[key].choice_Alpha,
              choice_Beta: questions[key].choice_Beta,
              choice_Gamma: questions[key].choice_Gamma,
              choice_Delta: questions[key].choice_Delta,
              right_choice: questions[key].right_choice,
              hint: questions[key].hint,
            })
          );
        }
      }
      if (!!localDataBaseMultiMixedTwo && check_two) {
        const questions = await cache.get(
          strings.localDataBaseMultiMixedTwo
        );

        for (const key in questions) {
          mixedQuestions.push(
            new (question as any)({
              accepted: questions[key].accepted,
              index: questions[key].index, // for keeping the choice in cartScreen
              id: key,
              categoryIds: questions[key].categoryIds,
              ownerId: questions[key].ownerId,
              title: questions[key].title,
              answer: questions[key].answer,
              source: questions[key].source,
              choice_Alpha: questions[key].choice_Alpha,
              choice_Beta: questions[key].choice_Beta,
              choice_Gamma: questions[key].choice_Gamma,
              choice_Delta: questions[key].choice_Delta,
              right_choice: questions[key].right_choice,
              hint: questions[key].hint,
            })
          );
        }
      }

      if (localDataBaseMultiMixedThree && check_three) {
        const questions = await cache.get(
          strings.localDataBaseMultiMixedThree
        );

        for (const key in questions) {
          mixedQuestions.push(
            new (question as any)({
              accepted: questions[key].accepted,
              index: questions[key].index, // for keeping the choice in cartScreen
              id: key,
              categoryIds: questions[key].categoryIds,
              ownerId: questions[key].ownerId,
              title: questions[key].title,
              answer: questions[key].answer,
              source: questions[key].source,
              choice_Alpha: questions[key].choice_Alpha,
              choice_Beta: questions[key].choice_Beta,
              choice_Gamma: questions[key].choice_Gamma,
              choice_Delta: questions[key].choice_Delta,
              right_choice: questions[key].right_choice,
              hint: questions[key].hint,
            })
          );
        }
      }
      if (!!localDataBaseMultiMixedFour && check_four) {
        const questions = await cache.get(
          strings.localDataBaseMultiMixedFour
        );

        for (const key in questions) {
          mixedQuestions.push(
            new (question as any)({
              accepted: questions[key].accepted,
              index: questions[key].index, // for keeping the choice in cartScreen
              id: key,
              categoryIds: questions[key].categoryIds,
              ownerId: questions[key].ownerId,
              title: questions[key].title,
              answer: questions[key].answer,
              source: questions[key].source,
              choice_Alpha: questions[key].choice_Alpha,
              choice_Beta: questions[key].choice_Beta,
              choice_Gamma: questions[key].choice_Gamma,
              choice_Delta: questions[key].choice_Delta,
              right_choice: questions[key].right_choice,
              hint: questions[key].hint,
            })
          );
        }
      }

      const shuffledQuestions = shuffle(mixedQuestions);
      // const array = shuffledQuestions.splice(0, 1);
      await cache.set(strings.questionsMultiMixed, shuffledQuestions);
    } catch (err) {
      // send to custom analytics server
      alert(
        "Η λήψει των ερωτήσεων για το Απάνθισμα απέτυχε!"
      );

      throw err;
    }
  };
};
