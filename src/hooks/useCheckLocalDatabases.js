import React, { useEffect, useState } from "react";
import asyncNames from "../constants/asyncNames/asyncNames";
import cache from "../utils/cache";

export default useCheckLocalDatabases = () => {
  const [multiOne, setMultiOne] = useState(false);
  const [multiTwo, setMultiTwo] = useState(false);
  const [multiThree, setMultiThree] = useState(false);
  const [multiFour, setMultiFour] = useState(false);

  const [trueFalseOne, setTrueFalseOne] = useState(false);
  const [trueFalseTwo, setTrueFalseTwo] = useState(false);
  const [trueFalseThree, setTrueFalseThree] = useState(false);
  const [trueFalseFour, setTrueFalseFour] = useState(false);

  const [mixedMultiOne, setMultiMixedOne] = useState(false);
  const [mixedMultiTwo, setMultiMixedTwo] = useState(false);
  const [mixedMultiThree, setMultiMixedThree] = useState(false);
  const [mixedMultiFour, setMultiMixedFour] = useState(false);

  const [mixedTrueFalseOne, setMixedTrueFalseOne] = useState(false);
  const [mixedTrueFalseTwo, setMixedTrueFalseTwo] = useState(false);
  const [mixedTrueFalseThree, setMixedTrueFalseThree] = useState(false);
  const [mixedTrueFalseFour, setMixedTrueFalseFour] = useState(false);

  const checkLocalDatabases = async () => {
    const localDataBaseMultiOne = await cache.get(
      asyncNames.localDataBaseMultiOne
    );
    if (!!localDataBaseMultiOne) {
      setMultiOne(true);
    }
    const localDataBaseMultiTwo = await cache.get(
      asyncNames.localDataBaseMultiTwo
    );
    if (!!localDataBaseMultiTwo) {
      setMultiTwo(true);
    }
    const localDataBaseMultiThree = await cache.get(
      asyncNames.localDataBaseMultiThree
    );
    if (!!localDataBaseMultiThree) {
      setMultiThree(true);
    }
    const localDataBaseMultiFour = await cache.get(
      asyncNames.localDataBaseMultiFour
    );
    if (!!localDataBaseMultiFour) {
      setMultiFour(true);
    }

    // For True/false
    const localDatabaseTrueFalseOne = await cache.get(
      asyncNames.localDatabaseTrueFalseOne
    );
    if (!!localDatabaseTrueFalseOne) {
      setTrueFalseOne(true);
    }
    const localDatabaseTrueFalseTwo = await cache.get(
      asyncNames.localDatabaseTrueFalseTwo
    );
    if (!!localDatabaseTrueFalseTwo) {
      setTrueFalseTwo(true);
    }
    const localDatabaseTrueFalseThree = await cache.get(
      asyncNames.localDatabaseTrueFalseThree
    );
    if (!!localDatabaseTrueFalseThree) {
      setTrueFalseThree(true);
    }
    const localDatabaseTrueFalseFour = await cache.get(
      asyncNames.localDatabaseTrueFalseFour
    );
    if (!!localDatabaseTrueFalseFour) {
      setTrueFalseFour(true);
    }
    // For Apanthisma - mixed
    const localDataBaseMultiMixedOne = await cache.get(
      asyncNames.localDataBaseMultiMixedOne
    );

    if (!!localDataBaseMultiMixedOne) {
      setMultiMixedOne(true);
    }
    const localDataBaseMultiMixedTwo = await cache.get(
      asyncNames.localDataBaseMultiMixedTwo
    );
    if (!!localDataBaseMultiMixedTwo) {
      setMultiMixedTwo(true);
    }
    const localDataBaseMultiMixedThree = await cache.get(
      asyncNames.localDataBaseMultiMixedThree
    );
    if (!!localDataBaseMultiMixedThree) {
      setMultiMixedThree(true);
    }

    const localDataBaseMultiMixedFour = await cache.get(
      asyncNames.localDataBaseMultiMixedFour
    );
    if (!!localDataBaseMultiMixedFour) {
      setMultiMixedFour(true);
    }

    // For Apanthisma - true false
    const localDatabaseTrueFalseMixedOne = await cache.get(
      asyncNames.localDatabaseTrueFalseMixedOne
    );

    if (!!localDatabaseTrueFalseMixedOne) {
      setMixedTrueFalseOne(true);
    }
    const localDatabaseTrueFalseMixedTwo = await cache.get(
      asyncNames.localDatabaseTrueFalseMixedTwo
    );
    if (!!localDatabaseTrueFalseMixedTwo) {
      setMixedTrueFalseTwo(true);
    }
    const localDatabaseTrueFalseMixedThree = await cache.get(
      asyncNames.localDatabaseTrueFalseMixedThree
    );
    if (!!localDatabaseTrueFalseMixedThree) {
      setMixedTrueFalseThree(true);
    }

    const localDatabaseTrueFalseMixedFour = await cache.get(
      asyncNames.localDatabaseTrueFalseMixedFour
    );
    if (!!localDatabaseTrueFalseMixedFour) {
      setMixedTrueFalseFour(true);
    }
  };

  return {
    checkLocalDatabases,
    multiOne,
    multiTwo,
    multiThree,
    multiFour,
    setMultiOne,
    setMultiTwo,
    setMultiThree,
    setMultiFour,
    trueFalseOne,
    trueFalseTwo,
    trueFalseThree,
    trueFalseFour,
    setTrueFalseOne,
    setTrueFalseTwo,
    setTrueFalseThree,
    setTrueFalseFour,
    mixedMultiOne,
    mixedMultiTwo,
    mixedMultiThree,
    mixedMultiFour,
    setMultiMixedOne,
    setMultiMixedTwo,
    setMultiMixedThree,
    setMultiMixedFour,
    mixedTrueFalseOne,
    mixedTrueFalseTwo,
    mixedTrueFalseThree,
    mixedTrueFalseFour,
    setMixedTrueFalseOne,
    setMixedTrueFalseTwo,
    setMixedTrueFalseThree,
    setMixedTrueFalseFour,
  };
};
