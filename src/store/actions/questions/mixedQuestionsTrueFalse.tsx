import cache from "../../../utils/cache";
import question from "../../../models/question";
import shuffle from "../../../utils/shuffle";
import strings from "../../../constants/strings";

export const fetchQuestionsTrueFalseMixed = () => {
  return async () => {
    try {
      const mixedQuestions = [];
      const trueFalseOneDataBaseMixed = await cache.get(
        strings.localDatabaseTrueFalseMixedOne
      );
      const check_oneTF = await cache.get("check_oneTF");

      const trueFalseTwoDataBaseMixed = await cache.get(
        strings.localDatabaseTrueFalseMixedTwo
      );
      const check_twoTF = await cache.get("check_twoTF");

      const trueFalseThreeDataBaseMixed = await cache.get(
        strings.localDatabaseTrueFalseMixedThree
      );
      const check_threeTF = await cache.get("check_threeTF");

      const trueFalseFourDataBaseMixed = await cache.get(
        strings.localDatabaseTrueFalseMixedFour
      );
      const check_fourTF = await cache.get("check_fourTF");

      ///////////////////////
      if (!!trueFalseOneDataBaseMixed && check_oneTF) {
        const categoryAlfa = await cache.get(
          strings.localDatabaseTrueFalseMixedOne
        );
        for (const key in categoryAlfa) {
          mixedQuestions.push(
            new (question as any)({
              accepted: categoryAlfa[key].accepted,
              index: categoryAlfa[key].index, // for keeping the choice in cartScreen
              id: key,
              categoryIds: categoryAlfa[key].categoryIds,
              ownerId: categoryAlfa[key].ownerId,
              title: categoryAlfa[key].title,
              // imageUrl: categoryAlfa[key].imageUrl,
              difficultyLevel: categoryAlfa[key].difficultyLevel,
              answer: categoryAlfa[key].answer,
              source: categoryAlfa[key].source,
              choice_Alpha: categoryAlfa[key].choice_Alpha,
              choice_Beta: categoryAlfa[key].choice_Beta,
              choice_Gamma: categoryAlfa[key].choice_Gamma,
              choice_Delta: categoryAlfa[key].choice_Delta,
              right_choice: categoryAlfa[key].right_choice,
              hint: categoryAlfa[key].hint,
            })
          );
        }
      }
      if (!!trueFalseTwoDataBaseMixed && check_twoTF) {
        const categoryBeta = await cache.get(
          strings.localDatabaseTrueFalseMixedTwo
        );

        for (const key in categoryBeta) {
          mixedQuestions.push(
            new (question as any)({
              accepted: categoryBeta[key].accepted,
              index: categoryBeta[key].index, // for keeping the choice in cartScreen
              id: key,
              categoryIds: categoryBeta[key].categoryIds,
              ownerId: categoryBeta[key].ownerId,
              title: categoryBeta[key].title,
              // imageUrl: categoryBeta[key].imageUrl,
              difficultyLevel: categoryBeta[key].difficultyLevel,
              answer: categoryBeta[key].answer,
              source: categoryBeta[key].source,
              choice_Alpha: categoryBeta[key].choice_Alpha,
              choice_Beta: categoryBeta[key].choice_Beta,
              choice_Gamma: categoryBeta[key].choice_Gamma,
              choice_Delta: categoryBeta[key].choice_Delta,
              right_choice: categoryBeta[key].right_choice,
              hint: categoryBeta[key].hint,
            })
          );
        }
      }

      if (trueFalseThreeDataBaseMixed && check_threeTF) {
        const categoryGamma = await cache.get(
          strings.localDatabaseTrueFalseMixedThree
        );

        for (const key in categoryGamma) {
          mixedQuestions.push(
            new (question as any)({
              accepted: categoryGamma[key].accepted,
              index: categoryGamma[key].index, // for keeping the choice in cartScreen
              id: key,
              categoryIds: categoryGamma[key].categoryIds,
              ownerId: categoryGamma[key].ownerId,
              title: categoryGamma[key].title,
              // imageUrl: categoryGamma[key].imageUrl,
              difficultyLevel: categoryGamma[key].difficultyLevel,
              answer: categoryGamma[key].answer,
              source: categoryGamma[key].source,
              choice_Alpha: categoryGamma[key].choice_Alpha,
              choice_Beta: categoryGamma[key].choice_Beta,
              choice_Gamma: categoryGamma[key].choice_Gamma,
              choice_Delta: categoryGamma[key].choice_Delta,
              right_choice: categoryGamma[key].right_choice,
              hint: categoryGamma[key].hint,
            })
          );
        }
      }
      if (!!trueFalseFourDataBaseMixed && check_fourTF) {
        const categoryDelta = await cache.get(
          strings.localDatabaseTrueFalseMixedFour
        );

        for (const key in categoryDelta) {
          mixedQuestions.push(
            new (question as any)({
              accepted: categoryDelta[key].accepted,
              index: categoryDelta[key].index, // for keeping the choice in cartScreen
              id: key,
              categoryIds: categoryDelta[key].categoryIds,
              ownerId: categoryDelta[key].ownerId,
              title: categoryDelta[key].title,
              // imageUrl: categoryDelta[key].imageUrl,
              difficultyLevel: categoryDelta[key].difficultyLevel,
              answer: categoryDelta[key].answer,
              source: categoryDelta[key].source,
              choice_Alpha: categoryDelta[key].choice_Alpha,
              choice_Beta: categoryDelta[key].choice_Beta,
              choice_Gamma: categoryDelta[key].choice_Gamma,
              choice_Delta: categoryDelta[key].choice_Delta,
              right_choice: categoryDelta[key].right_choice,
              hint: categoryDelta[key].hint,
            })
          );
        }
      }

      const shuffledQuestions = shuffle(mixedQuestions);
      // const array = shuffledQuestions.splice(0, 1);
      await cache.set(strings.questionsTrueFalseMixed, shuffledQuestions);
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};
