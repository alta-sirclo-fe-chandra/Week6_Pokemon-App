type payload = string

export function reduxAction (type: string, payload: payload) {
  return { type, payload };
};
