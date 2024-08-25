"use client";

import { useMutation } from "convex/react";
import { useState } from "react";

export const useApiMutation = (mutationFunction: any) => {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFunction); // we first need to initialize the mutation here
  // apiMutation() ==> calling it like this will actually call the mutationFunction

  const mutate = (payload: any) => {
    setPending(true);
    return apiMutation(payload)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => setPending(false)); // as we know finally we run after .then() and .catch()
  };

  return {
    pending,
    mutate,
  };
};
